import styles from "../styles/Login.module.css";
import LoginForm from "../componentes/LoginForm";

const Login = () => {
  return (
    <main id="login">
      {/* Hero Section */}
      <div id="pilates-home" className={styles.login}>
      <section className={styles.hero}>
        <h1>Bienvenidos a Pilates Studio</h1>
        <LoginForm/>
      </section>

      {/* Presentación de Clases */}
      

      </div>
    </main>
  );
};

export default Login;