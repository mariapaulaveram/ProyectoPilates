import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/PerfilAlumno.module.css';

function PerfilAlumno({ onClose }) {
  const [alumno, setAlumno] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({});
  const id_alumno = localStorage.getItem('id_alumno');
  const [mensajeExito, setMensajeExito] = useState("");


  useEffect(() => {
    async function fetchPerfil() {
      try {
        const response = await axios.get(`/api/alumnos/${id_alumno}`);
        setAlumno(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    }

    fetchPerfil();
  
  }, [id_alumno]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
  try {
    await axios.put(`/api/alumnos/${id_alumno}`, formData);
    setAlumno(formData);
    setEditando(false);
    setMensajeExito("Datos actualizados correctamente");

    setTimeout(() => {
      setMensajeExito("");
    }, 3000); // desaparece a los 3 segundos
  } catch (error) {
    console.error('Error al guardar cambios:', error);
  }
};


  if (!alumno) return <p>Cargando perfil...</p>;

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.header}>
        <h2>Mi perfil</h2>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
      </div>
      {mensajeExito && <p className={styles.mensajeExito}>{mensajeExito}</p>}

      <div className={styles.datos}>
        {editando ? (
          <>
            <input name="nombre" value={formData.nombre} onChange={handleChange} />
            <input name="apellido" value={formData.apellido} onChange={handleChange} />
            <input name="email" value={formData.email} onChange={handleChange} />
            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={() => setEditando(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {alumno.nombre}</p>
            <p><strong>Apellido:</strong> {alumno.apellido}</p>
            <p><strong>Email:</strong> {alumno.email}</p>
            <button onClick={() => setEditando(true)}>Editar datos</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PerfilAlumno;
