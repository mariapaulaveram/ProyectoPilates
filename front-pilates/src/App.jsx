import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Layout from './componentes/layouts/Layout';
import Logueados from './paginas/Logueados';
import Login from './paginas/Login';
import Registro from './paginas/Registro';
import Home from './paginas/Home';
import PerfilAlumno from './componentes/PerfilAlumno';
import RecuperarContraseña from './componentes/RecuperarContraseña';
import RestablecerContraseña from './componentes/RestablecerContraseña';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="logueados" element={<Logueados />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />}/>
          <Route path='recuperar' element={<RecuperarContraseña/>} />
          <Route path="/restablecer/:token" element={<RestablecerContraseña />} />
          <Route path="/perfil" element={<PerfilAlumno />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
