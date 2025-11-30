import styles from "../styles/ClasesDisponibles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ClasesDisponibles = () => {
  const [loading, setLoading] = useState(true);
  const [clases, setClases] = useState([]);
  const id_alumno = localStorage.getItem("id_alumno"); // guardado en login


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

  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  return (
    <section className={styles.holder}>
      <div className={styles.tituloWrapper}>
        <h2 className={styles.tituloInstitucional}>Horarios de Clases</h2>
      </div>

      {loading ? (
        <p className={styles.loading}>Cargando...</p>
      ) : (
        <table className={styles.tablaHorizontal}>
          <thead>
            <tr>
              {dias.map((dia) => (
                <th key={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {dias.map((dia) => {
                const clasesDelDia = clases.filter((c) => c.dia === dia);
                return (
                  <td key={dia}>
                    {clasesDelDia.length > 0 ? (
                      clasesDelDia.map((clase) => (
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
                      ))
                    ) : (
                      <span className={styles.sinClase}>—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ClasesDisponibles;

