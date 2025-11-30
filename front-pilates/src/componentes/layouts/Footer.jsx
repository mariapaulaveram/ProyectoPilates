import styles from "../../styles/Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>

                <div className={styles.contactInfo}>
                    <h5>Contacto</h5>
                    <p>
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        Lorem Ipsum 110
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i>{' '}
                        consultas@pilates.com
                    </p>
                    <p>
                        <i className="fas fa-phone"></i>{' '}
                        +54 11 4695 8390
                    </p>
                </div>


                <div className={styles.social}>
                    <h5>Seguinos</h5>
                    <ul className={styles.socialIcons}>
                        <li>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i> Facebook
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className={styles.footerBottom}>
                <p>Pilates Front – © 2025 María Paula Vera Morandini — Licencia MIT</p>
            </div>
        </footer>
    );
};

export default Footer;

