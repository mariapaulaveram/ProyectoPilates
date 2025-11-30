import { useState } from 'react';
import axios from 'axios';
import styles from "../styles/Contraseña.module.css";

function RecuperarContraseña() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica del email
    if (!email || !email.includes('@')) {
      setError('Ingresá un correo válido');
      setMensaje('');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/recuperar', { email });
      setMensaje('Revisá tu correo para restablecer la contraseña');
      setError('');
    } catch (err) {
      setError('No se pudo enviar el correo. Verificá el email.');
      setMensaje('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contraseñaContainer}>
      <div className={styles.contraseñaCard}>
        <h2 className={styles.contraseñaTitle}>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Ingresá tu correo"
              disabled={loading}
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar enlace'}
          </button>
          {mensaje && <div className={styles.successMessage}>{mensaje}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default RecuperarContraseña;
