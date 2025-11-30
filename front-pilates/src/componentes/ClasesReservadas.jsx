import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/ClasesReservadas.module.css";

const ClasesReservadas = () => {
  const [loading, setLoading] = useState(true);
  const [clases, setClases] = useState([]);
  const [error, setError] = useState("");

  const id_alumno = parseInt(localStorage.getItem("id_alumno"), 10);
  console.log("🎓 ID leído desde localStorage:", id_alumno);

  useEffect(() => {
    if (!id_alumno) {
      setError("No se encontró el alumno. Iniciá sesión nuevamente.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:3000/api/reservas/${id_alumno}`)
      .then((res) => {
        console.log("📥 Datos recibidos:", res.data);
        setClases(Array.isArray(res.data) ? res.data : [res.data]);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Error al obtener las clases");
      })
      .finally(() => setLoading(false));
  }, [id_alumno]);

  const cancelarInscripcion = (id_inscripcion) => {
    if (!window.confirm("¿Estás seguro de cancelar esta clase?")) return;

    axios
      .delete(`http://localhost:3000/api/reservas/${id_inscripcion}`)
      .then(() => {
        setClases((prev) => prev.filter((c) => c.id_inscripcion !== id_inscripcion));
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cancelar la inscripción");
      });
  };

  const diasOrdenados = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  const clasesAgrupadas = diasOrdenados.map((dia) => ({
    dia,
    clases: clases.filter((c) => c.dia.toLowerCase() === dia)
  }));

  console.log("📦 Clases en el estado:", clases);

  return (
    <section className={styles.holder}>
      {loading ? (
        <p className={styles.mensaje}>Cargando clases...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : clases.length === 0 ? (
        <p className={styles.mensaje}>No tenés clases reservadas.</p>
      ) : (
        clasesAgrupadas.map(({ dia, clases }) =>
          clases.length > 0 ? (
            <div key={dia} className={styles.bloqueDia}>
              <h3 className={styles.tituloDia}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </h3>
              <ul className={styles.listaClases}>
                {clases.map((clase) => (
                  <li key={clase.id_inscripcion} className={styles.cardClase}>
                    <div className={styles.infoClase}>
                      <p><span className={styles.label}>Hora:</span> {clase.hora}</p>
                      <p><span className={styles.label}>Profesor:</span> {clase.profesor}</p>
                    </div>
                    <div className={styles.acciones}>
                      <button
                        className={styles.btnCancelar}
                        onClick={() => cancelarInscripcion(clase.id_inscripcion)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )
      )}
    </section>



  );
};

export default ClasesReservadas;



