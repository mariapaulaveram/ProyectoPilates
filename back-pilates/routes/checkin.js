const express = require('express');
const router = express.Router();
const pool = require('../models/bd');

// GET: mostrar la vista
router.get('/', (req, res) => {
  res.render('checkin');
});

// POST: procesar el documento
router.post('/', async (req, res) => {
  const id_alumno = req.body.id_alumno?.trim();

  if (!id_alumno || isNaN(id_alumno)) {
    return res.render('checkin', {
      mensaje: 'Documento inválido',
      color: 'red'
    });
  }

  const hoy = new Date().toLocaleDateString('es-AR', { weekday: 'long' }).toLowerCase();
  const ahora = new Date();

  try {
    // Verificar que el alumno exista
    const resultado = await pool.query('SELECT nombre FROM alumnos WHERE id = ?', [id_alumno]);
    const alumnos = Array.isArray(resultado[0]) ? resultado[0] : resultado;

    if (!alumnos || alumnos.length === 0) {
      console.log("⚠️ Alumno no encontrado:", alumnos);
      return res.render('checkin', {
        mensaje: 'Documento no registrado',
        color: 'red'
      });
    }

    const nombre_alumno = alumnos[0].nombre;

    // Buscar todas las clases reservadas para hoy
    const resultadoClases = await pool.query(`
      SELECT i.id AS id_inscripcion, i.presente, c.hora, c.profesor
      FROM inscripciones i
      JOIN clases c ON i.id_clase = c.id
      WHERE i.id_alumno = ? AND c.dia = ?
    `, [id_alumno, hoy]);

    const clases = Array.isArray(resultadoClases[0]) ? resultadoClases[0] : resultadoClases;

    if (!clases || clases.length === 0) {
      return res.render('checkin', {
        mensaje: 'No tenés clases reservadas para hoy',
        color: 'orange'
      });
    }

    // Buscar la clase más cercana a la hora actual
    const claseMasCercana = clases.reduce((masCercana, actual) => {
      const [horaStr, minutoStr] = actual.hora.split(':');
      const claseHora = new Date();
      claseHora.setHours(parseInt(horaStr), parseInt(minutoStr || '0'), 0, 0);

      const diferencia = Math.abs(claseHora - ahora);

      return (!masCercana || diferencia < masCercana.diferencia)
        ? { ...actual, diferencia }
        : masCercana;
    }, null);

    if (!claseMasCercana) {
      return res.render('checkin', {
        mensaje: 'No se pudo determinar la clase más cercana',
        color: 'red'
      });
    }

    if (claseMasCercana.presente === 1) {
      return res.render('checkin', {
        mensaje: `⚠️ ${nombre_alumno}, ya registraste tu asistencia para la clase con ${claseMasCercana.profesor}`,
        color: 'blue'
      });
    }

    // Registrar asistencia
    await pool.query('UPDATE inscripciones SET presente = 1 WHERE id = ?', [claseMasCercana.id_inscripcion]);

    res.render('checkin', {
      mensaje: `✅ ${nombre_alumno}, asistencia registrada para la clase con ${claseMasCercana.profesor} a las ${claseMasCercana.hora}`,
      color: 'green'
    });
  } catch (error) {
    console.error('❌ Error en checkin:', error.message);
    res.render('checkin', {
      mensaje: 'Error al registrar asistencia',
      color: 'red'
    });
  }
});

module.exports = router;
