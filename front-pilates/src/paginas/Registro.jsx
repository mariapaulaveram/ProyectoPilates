import styles from "../styles/Registro.module.css";
import RegistroForm from "../componentes/RegistroForm";

const Registro = () => {
  return (
    <main id="registro">
      {/* Hero Section */}
      <div id="pilates-home" className={styles.login}>
      <section className={styles.hero}>
        <RegistroForm/>
      </section>

    
      </div>
    </main>
  );
};

export default Registro;