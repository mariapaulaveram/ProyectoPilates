import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../styles/LoginForm.module.css";

function LoginAlumnos() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/alumnos', { email, password });

            if (response.status === 200) {
                const alumno = response.data.alumno;
                const id_alumno = alumno.id;
                localStorage.setItem("id_alumno", id_alumno);

                navigate("/logueados", {
                    state: {
                        email: alumno.email,
                        nombre: alumno.nombre
                    }
                });
            } else {
                setErrorMessage(response.data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en login:', error);
            setErrorMessage('Error al conectar con el servidor');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Ingreso Alumnos</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Usuario</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="Ingresá tu usuario"
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
                        />
                    </div>
                    <button type="submit" className={styles.button}>Iniciar sesión</button>

                    <div className={styles.forgotPassword}>
                        <a href="/recuperar">¿Olvidaste tu contraseña?</a>
                    </div>

                    {errorMessage && (
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginAlumnos;

