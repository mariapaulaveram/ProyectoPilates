import styles from "../styles/ClasesDisponiblesHoy.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ClasesDisponiblesHoy = () => {
  const [loading, setLoading] = useState(true);
  const [clases, setClases] = useState([]);
  const id_alumno = localStorage.getItem("id_alumno"); // guardado en login

  // Detectar el día actual en español
  const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const diaActual = diasSemana[new Date().getDay()]; // ej: "miercoles"

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clases")
      .then((res) => setClases(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const inscribirse = async (idClase) => {
    const id_alumno = localStorage.getItem("id_alumno");
    if (!id_alumno) {
      alert("No se encontró el ID del alumno. Iniciá sesión nuevamente.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/inscribirse", {
        id_alumno: id_alumno,
        id_clase: idClase,
      });
      alert("¡Inscripción exitosa!");

      // Actualizar cupos
      const actualizadas = await axios.get("http://localhost:3000/api/clases");
      setClases(actualizadas.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error al inscribirse");
    }
  };

  // Filtrar clases del día actual
  const clasesDelDia = clases.filter((c) => c.dia === diaActual);

  return (
    <section className={styles.holder}>
      <div className={styles.tituloWrapper}>
        <h2 className={styles.tituloInstitucional}>
          Clases disponibles  {diaActual.charAt(0).toUpperCase() + diaActual.slice(1)}
        </h2>
      </div>

      {loading ? (
        <p className={styles.loading}>Cargando...</p>
      ) : clasesDelDia.length > 0 ? (
        <div className={styles.listaClases}>
          {clasesDelDia.map((clase) => (
            <div key={clase.id} className={styles.claseItem}>
              <strong>{clase.hora}</strong><br />
              <span>{clase.profesor}</span><br />
              <span>Cupos: {clase.cupo_disponible}</span><br />
              <button
                className={styles.botonInscribirse}
                onClick={() => inscribirse(clase.id)}
                disabled={clase.cupo_disponible <= 0}
              >
                {clase.cupo_disponible > 0 ? "Anotarse" : "Sin cupo"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.sinClase}>No hay clases disponibles hoy.</p>
      )}
    </section>
  );
};

export default ClasesDisponiblesHoy;
