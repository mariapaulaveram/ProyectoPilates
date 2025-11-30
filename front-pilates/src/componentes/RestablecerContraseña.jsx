import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../styles/Contraseña.module.css";

function RestablecerContraseña() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/restablecer/${token}`, { password });
      setMensaje('Contraseña actualizada correctamente');
      setError('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('Token inválido o expirado');
      setMensaje('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contraseñaContainer}>
      <div className={styles.cpntraseñaCard}>
        <h2 className={styles.contraseñaTitle}>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Nueva contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmar" className={styles.label}>Confirmar contraseña</label>
            <input
              type="password"
              id="confirmar"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar contraseña'}
          </button>
          {mensaje && <div className={styles.successMessage}>{mensaje}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default RestablecerContraseña;

