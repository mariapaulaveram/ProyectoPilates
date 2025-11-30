import useScrollToHash from "../hooks/useScrollToHash";
import styles from "../styles/Home.module.css";
import HomeCarousel from '../componentes/HomeCarousel';
import Clases from "../componentes/Clases";

const Home = () => {
  useScrollToHash();
  return (
    <main id="home">
      {/* Hero Section */}
      <div id="pilates-home" className={styles.home}>
      <section className={styles.hero}>
        <HomeCarousel />
        <h1>Bienvenidos a Pilates Studio</h1>
        <p>Consultá los horarios disponibles. Para reservar, iniciá sesión.</p>
      </section>

      {/* Presentación de Clases */}
      <section id="horarios" className={styles.presentacion}>
        <Clases />
      </section>

      </div>
    </main>
  );
};

export default Home;
