import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../styles/LoginForm.module.css"; // reutilizamos estilos

function RegistroAlumnos() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/alumnos/registro', {
                nombre,
                apellido,
                email,
                password
            });

            if (response.status === 201) {
                setSuccessMessage('Registro exitoso. Ahora podés iniciar sesión.');
                setTimeout(() => {
                    navigate('/');
                }, 2000); // redirige después de 2 segundos
        } else {
          setErrorMessage(response.data.message || 'No se pudo registrar el alumno');
        }
      } catch (error) {
        console.error('Error en registro:', error);
        if (error.response && error.response.status === 409) {
          setErrorMessage('Este email ya está registrado. Probá iniciar sesión.');
        } else {
          setErrorMessage('Error al conectar con el servidor');
        }
      }}


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Registro de Alumno</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nombre" className={styles.label}>Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className={styles.input}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="apellido" className={styles.label}>Apellido</label>
                        <input
                            type="text"
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            className={styles.input}
                            placeholder="Tu apellido"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Registrarse</button>
                    {errorMessage && (
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className={styles.successMessage}>
                            {successMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default RegistroAlumnos;
