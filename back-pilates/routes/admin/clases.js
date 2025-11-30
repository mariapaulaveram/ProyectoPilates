const express = require('express');
const router = express.Router();
const clasesModel = require('../../models/clasesModel');

/* Listar todas las clases */

/*router.get('/', async function (req, res, next) {
  try {
    const clases = await clasesModel.getClases();

    const success = req.session.success;
    req.session.success = null;

    res.render('admin/clases', {
      layout: 'admin/layout',
      persona: req.session.nombre,
      clases,
      success
    });
  } catch (error) {
    console.log(error);
    res.render('admin/clases', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudieron cargar las clases'
    });
  }
});*/

router.get('/', async (req, res) => {
  const clases = await clasesModel.getClases();

  // Agrupar por día
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  const clasesPorDia = dias.map(dia => ({
    dia,
    clases: clases.filter(c => c.dia === dia)
  }));
  console.log(JSON.stringify(clasesPorDia, null, 2));

  res.render('admin/clases', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    clasesPorDia
  });
});


/* Mostrar formulario para agregar clase */
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregarClase', {
    layout: 'admin/layout'
  });
});
/*verifico que el dia y la hora no esten ocupados */
router.post('/agregar', async (req, res, next) => {
  try {
    const dia = req.body.dia?.trim();
    const cupo = parseInt(req.body.cupo);
    const cupo_disponible = parseInt(req.body.cupo_disponible);
    const hora = req.body.hora?.trim(); // viene como "HH:MM"
    const profesor = req.body.profesor?.trim();

    if (dia && hora && !isNaN(cupo) && profesor) {
      const claseExistente = await clasesModel.getClaseByDiaHora(dia, hora);
      if (claseExistente) {
        return res.render('admin/agregarClase', {
          layout: 'admin/layout',
          error: true,
          mensaje: `Ya existe una clase el ${dia} a las ${hora}`
        });
      }

      await clasesModel.insertClases({ dia, hora, cupo, cupo_disponible,profesor });
      res.redirect('/admin/clases');
    } else {
      res.render('admin/agregarClase', {
        layout: 'admin/layout',
        error: true,
        mensaje: 'Todos los campos son requeridos y deben tener formato válido'
      });
    }
  } catch (error) {
    console.error('Error en POST /agregar:', error);
    res.render('admin/agregarClase', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudo cargar la clase'
    });
  }
});


/* Mostrar formulario para modificar clase */
router.get('/modificar/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const clase = await clasesModel.getClaseById(id);
    res.render('admin/modificarClase', {
      layout: 'admin/layout',
      clase
    });
  } catch (error) {
    console.log(error);
    res.redirect('/admin/clases');
  }
});

/* Modificar clase */
/*verifico que el dia y la hora no esten ocupados */
router.post('/modificar', async (req, res, next) => {
  try {
    const { id, dia, hora, profesor } = req.body;
    const cupo = parseInt(req.body.cupo);
    const cupo_disponible = parseInt(req.body.cupo_disponible);

    if (id && dia && hora && !isNaN(cupo) && !isNaN(cupo_disponible) && profesor) {
      // Validar que no exista otra clase con el mismo día y hora
      const claseExistente = await clasesModel.getClaseByDiaHora(dia, hora, id);

      if (claseExistente) {
        return res.render('admin/modificarClase', {
          layout: 'admin/layout',
          error: true,
          clase: { id, dia, hora, cupo, cupo_disponible,profesor },
          mensaje: `Ya existe una clase el ${dia} a las ${hora}`
        });
      }

      // Si no hay conflicto, modificar la clase
      await clasesModel.modificarClasesById({ dia, hora, cupo, cupo_disponible ,profesor }, id);
      res.redirect('/admin/clases');
    } else {
      res.render('admin/modificarClase', {
        layout: 'admin/layout',
        error: true,
        clase: { id, dia, hora, cupo, cupo_disponible ,profesor },
        mensaje: 'Todos los campos son requeridos y deben tener formato válido'
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/modificarClase', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudo modificar la clase'
    });
  }
});


/* Eliminar clase */
router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log("ID recibido para eliminar:", id); // Verifica que el ID no sea undefined

  try {
    const result = await clasesModel.deleteClasesById(id);
    console.log("Resultado:", result); // Verifica el resultado del DELETE
    res.redirect('/admin/clases');
  } catch (error) {
    console.log("Error al eliminar clase:", error);
    res.redirect('/admin/clases');
  }
});




module.exports = router;