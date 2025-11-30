import styles from "../styles/Clases.module.css";
import { useState, useEffect } from "react";
import axios from "axios";


const Clases = () => {
    const [loading, setLoading] = useState(false);
    const [clases, setClases] = useState([]);

    useEffect(() => {
        const cargarClases = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/clases");
                setClases(response.data);
            } catch (error) {
                console.error("Error al cargar clases:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarClases();
    }, []);
     
   const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

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
                        <span>{clase.profesor}</span>
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

export default Clases;
