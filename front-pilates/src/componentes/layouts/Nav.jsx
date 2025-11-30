import { Link } from "react-router-dom";
import styles from "../../styles/Nav.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logoGroup}>
          <Link to="/" className={styles.logo}>
            <img src="../../public/logo.jpg" alt="Pilates" />
          </Link>
          <h2 className={styles.logoTitle}>Pilates Studio</h2>
        </div>
        <ul className={styles.links}>
          <li><Link to="/#pilates-home">Inicio</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registro">Registrarse</Link></li>
          <li><Link to="/#horarios">Horarios</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;






