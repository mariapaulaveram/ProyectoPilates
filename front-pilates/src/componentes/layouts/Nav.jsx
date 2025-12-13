import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Nav.module.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logoGroup}>
          <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
            <img src="/logo.jpg" alt="Pilates" />
          </Link>
          <h2 className={styles.logoTitle}>Pilates Studio</h2>
        </div>

        {/* Botón hamburguesa */}
        <button
          className={styles.menuToggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Abrir menú de navegación"
        >
          ☰
        </button>

        {/* Links */}
        <ul className={`${styles.links} ${open ? styles.show : ""}`}>
          <li><Link to="/#pilates-home" onClick={() => setOpen(false)}>Inicio</Link></li>
          <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
          <li><Link to="/registro" onClick={() => setOpen(false)}>Registrarse</Link></li>
          <li><Link to="/#horarios" onClick={() => setOpen(false)}>Horarios</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;



