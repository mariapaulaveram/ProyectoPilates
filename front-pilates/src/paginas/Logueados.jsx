import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClasesDisponiblesHoy from '../componentes/ClasesDisponiblesHoy';
import PerfilAlumno from '../componentes/PerfilAlumno';
import ClasesReservadas from '../componentes/ClasesReservadas';
import styles from '../styles/Logueados.module.css';
import { FaUserCircle } from 'react-icons/fa';

function Logueados() {
  const location = useLocation();
  const navigate = useNavigate();
  const nombre = location.state?.nombre || 'usuario desconocido';
  const [menuVisible, setMenuVisible] = useState(false);
  const [vista, setVista] = useState('clases'); // 👈 controla qué se muestra

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const handleLogout = () => navigate('/');
  const handleVerPerfil = () => {
    setVista('perfil');
    setMenuVisible(false);
  };
  const handleVerClases = () => {
    setVista('clases');
    setMenuVisible(false);
  };

  const handleVerReservadas = () => {
  setVista('reservadas');
  setMenuVisible(false);
};


  return (
    <div className={styles.wrapperSaludo}>
      <div className={styles.saludoContainer}>
        <span className={styles.saludo}>
          ¡Hola, {nombre}!
          <FaUserCircle className={styles.userIcon} onClick={toggleMenu} />
        </span>

        {menuVisible && (
                    <div className={styles.dropdownMenu}>
                        <button onClick={handleVerPerfil}>Mi perfil</button>
                        <button onClick={handleVerReservadas}>Clases reservadas</button>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                )}
            </div>

            <section className={styles.presentacion}>
                {vista === 'perfil' && <PerfilAlumno onClose={handleVerClases} />}
                {vista === 'clases' && <ClasesDisponiblesHoy />}
                {vista === 'reservadas' && <ClasesReservadas onClose={handleVerClases} />}
            </section>

        </div>
    );
}

export default Logueados;




