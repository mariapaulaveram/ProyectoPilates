const express = require('express');
const router = express.Router();
const inscripcionesModel = require('../../models/inscripcionesModel');
const clasesModel = require ('../../models/clasesModel');
const alumnosModel = require ('../../models/alumnosModel');

// Middleware para validar sesión
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

router.get('/', secured, async function(req, res, next) {
  const { nombre, apellido, dia, profesor, inscripcion } = req.query;

  try {
    const inscripciones = await inscripcionesModel.getInscripcionesConDetalles({ nombre, apellido, dia, profesor });

    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const inscripcionesPorDia = dias.map(diaSemana => ({
      dia: diaSemana,
      inscripciones: inscripciones.filter(i => i.dia === diaSemana)
    }));

    res.render('admin/verInscriptos', {
      layout: 'admin/layout',
      persona: req.session.nombre,
      inscripcionesPorDia,
      nombre,
      apellido,
      diaSeleccionado: dia,
      profesorSeleccionado: profesor,
      inscripcion
    });

  } catch (error) {
    console.log('Error al obtener inscripciones:', error);
    res.render('admin/verInscriptos', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudieron cargar los inscriptos'
    });
  }
});

router.get('/inscribirAlumno', async (req, res) => {
  try {
    const alumnos = await alumnosModel.getAlumnos();
    const clases = await clasesModel.getClasesDisponibles();
    console.log('Clases con cupo:', clases);

    res.render('admin/inscribirAlumno', {
      layout: 'admin/layout',
      alumnos,
      clases
    });

  } catch (error) {
    console.error('Error al cargar formulario de inscripción:', error);
    res.render('admin/inscribirAlumno', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudo cargar el formulario'
    });
  }
});

router.post('/inscribirAlumno', async (req, res) => {
  const { id_alumno, id_clase } = req.body;
  const fecha_inscripcion = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    // Verificamos si el alumno ya está inscripto
    const yaInscripto = await inscripcionesModel.verificarInscripcionExistente(id_alumno, id_clase);
    console.log(`Verificando inscripción: alumno ${id_alumno}, clase ${id_clase} → ¿Ya inscripto?`, yaInscripto);

    if (yaInscripto) {
      const alumnos = await alumnosModel.getAlumnos();
      const clases = await clasesModel.getClasesDisponibles();

      return res.render('admin/inscribirAlumno', {
        layout: 'admin/layout',
        error: true,
        mensaje: 'Este alumno ya está inscripto en esta clase.',
        alumnos,
        clases
      });
    }

    // Si no está inscripto, lo inscribimos
    await inscripcionesModel.insertInscripcion({
      id_alumno,
      id_clase,
      fecha_inscripcion,
      presente: 0
    });

    res.redirect('/admin/verInscriptos?inscripcion=ok');
  } catch (error) {
  console.error('Error al inscribir alumno:', error);

  const alumnos = await alumnosModel.getAlumnos();
  const clases = await clasesModel.getClasesDisponibles();

  const mensaje =
    error.code === 'ER_DUP_ENTRY'
      ? 'Este alumno ya está inscripto en esta clase.'
      : 'No se pudo inscribir al alumno.';

  res.render('admin/inscribirAlumno', {
    layout: 'admin/layout',
    error: true,
    mensaje,
    alumnos,
    clases
  });
}
});

router.get('/eliminar/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    await inscripcionesModel.eliminarInscripcion(id);
    res.redirect('/admin/verInscriptos?eliminado=true');
  } catch (error) {
    console.log('Error al eliminar inscripción:', error);
    res.status(500).send('Error al eliminar inscripción');
  }
});



module.exports = router;


