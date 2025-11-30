const express = require('express');
const router = express.Router();
const alumnosModel = require('../../models/alumnosModel');

// Middleware para validar sesión
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta para ver los alumnos
router.get('/', secured, async function(req, res, next) {
  try {
    const alumnos = await alumnosModel.getAlumnos(); 

    res.render('admin/verAlumnos', {
      layout: 'admin/layout',
      persona: req.session.nombre,
      alumnos
    });
  } catch (error) {
    console.log('Error al obtener alumnos:', error);
    res.render('admin/verAlumnos', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudieron cargar los alumnos'
    });
  }
});

/* Mostrar formulario para agregar-registrar alumno */
// Mostrar el formulario
// ✅ Ruta relativa al prefijo
router.get('/agregar', (req, res) => {
  res.render('admin/agregarAlumno', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (req, res) => {
  const { nombre, apellido, email } = req.body;
  const password = 'temporal123';

  try {
    const nuevoAlumno = await alumnosModel.registrarAlumno(nombre, apellido, email, password);

    res.render('admin/agregarAlumno', {
      layout: 'admin/layout',
      mensajeExito: 'Alumno registrado con éxito'
    });
    
  } catch (error) {
    res.render('admin/agregarAlumno', {
      layout: 'admin/layout',
      error: true,
      mensaje: error.message
    });
  }
});

/* Eliminar alumno*/
router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log("ID recibido para eliminar:", id); // Verifica que el ID no sea undefined


  
  try {
    const result = await alumnosModel.deleteAlumnoById(id);
    console.log("Resultado:", result); // Verifica el resultado del DELETE
    res.redirect('/admin/verAlumnos');
  } catch (error) {
    console.log("Error al eliminar clase:", error);
    res.redirect('/admin/verAlumnos');
  }
});

/*Modificar alumno */
router.get('/modificar/:id', secured, async (req, res) => {
  const id = req.params.id;

  try {
    const [alumno] = await alumnosModel.getAlumnoById(id); 
    if (!alumno) {
      return res.redirect('/admin/verAlumnos');
    }

    res.render('admin/modificarAlumno', {
      layout: 'admin/layout',
      alumno
    });
  } catch (error) {
    console.log('Error al cargar alumno:', error);
    res.redirect('/admin/verAlumnos');
  }
});

router.post('/modificar', secured, async (req, res) => {
  const { id, nombre, apellido, email } = req.body;
   
  try {
    console.log("Datos recibidos para modificar:", { id, nombre, apellido, email});

    await alumnosModel.modificarAlumno(id, nombre, apellido, email);

    res.redirect('/admin/verAlumnos');
  } catch (error) {
    console.log('Error al modificar alumno:', error);
    res.render('admin/modificarAlumno', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudo modificar el alumno',
      alumno: { id, nombre, apellido, email }
    });
  }
});



module.exports = router;







 


