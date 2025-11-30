const pool = require('../models/bd');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const enviarCorreo = require('../services/enviarCorreo');
const clasesModel = require('../models/clasesModel');
const alumnosModel = require('../models/alumnosModel');
const inscripcionesModel = require('../models/inscripcionesModel');


router.get('/clases', async function (req, res, next) {
  try {
    const clases = await clasesModel.getClases();
    res.json(clases); // Enviamos los datos al frontend
  } catch (error) {
    console.error('Error al obtener clases:', error);
    res.status(500).json({ error: 'Error al obtener clases' });
  }
});

// Ruta para login de alumnos
router.post('/alumnos', async (req, res) => {
  const { email, password } = req.body;
  console.log('Datos recibidos:', req.body);


  try {
    const result = await alumnosModel.getAlumno(email, password);

    if (result.length > 0) {
      console.log("Alumno encontrado:", result[0]); // 👈 Verificás que tenga el campo 'id'
      res.status(200).json({ message: 'Login successful', alumno: result[0] });
    }
    else {
      res.status(401).json({ message: 'Login failed. Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

/*mostrar las clases disponibles */
router.get('/clases', async (req, res) => {
  try {
    const clases = await clasesModel.getClasesDisponibles();
    res.json(clases);
  } catch (error) {
    console.error('Error al obtener clases:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


/*alumno por id */
router.get('/alumnos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [alumno] = await pool.query('SELECT nombre, apellido, email FROM alumnos WHERE id = ?', [id]);
    res.json(alumno);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
});




/* inscribirse a una clase */
router.post('/inscribirse', async (req, res) => {
  const { id_alumno, id_clase } = req.body;

  console.log('Datos recibidos:', { id_alumno, id_clase });

  try {
    const [clase] = await pool.query('SELECT cupo_disponible FROM clases WHERE id = ?', [id_clase]);

    if (!clase) {
      console.warn('Clase no encontrada');
      return res.status(404).json({ message: 'Clase no encontrada' });
    }


    if (clase.cupo_disponible <= 0) {
      console.warn('Sin cupos disponibles');
      return res.status(400).json({ message: 'No hay cupos disponibles' });
    }


    await pool.query('INSERT INTO inscripciones (id_alumno, id_clase) VALUES (?, ?)', [id_alumno, id_clase]);
    console.log('Inscripción registrada');

    await pool.query('UPDATE clases SET cupo_disponible = cupo_disponible - 1 WHERE id = ?', [id_clase]);
    console.log('Cupo actualizado');

    res.status(200).json({ message: 'Inscripción exitosa' });
  } catch (error) {
    console.error('Error al inscribirse:', error); // 👈 Este te muestra el error real
    res.status(500).json({ message: 'El socio ya reservo para la misma fecha y hora!' });
  }
});


router.post('/registro', async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  console.log('Datos de registro recibidos:', req.body);

  try {
    const nuevoAlumno = await alumnosModel.registrarAlumno(nombre, apellido, email, password);
    console.log('Alumno registrado:', nuevoAlumno);
    res.status(201).json({ message: 'Registro exitoso', alumno: nuevoAlumno });
  } catch (error) {
    if (error.message === 'El email ya está registrado') {
      res.status(409).json({ message: error.message }); // 409 = conflicto
    } else {
      console.error('Error al registrar alumno:', error);
      res.status(500).json({ message: 'Error en el servidor al registrar alumno' });
    }
  }
});

// recuperar contraseña
router.post('/recuperar', async (req, res) => {
  const { email } = req.body;
  const usuario = await pool.query('SELECT * FROM alumnos WHERE email = ?', [email]);

  if (usuario.length === 0) return res.status(404).send('Email no registrado');

  const token = crypto.randomBytes(20).toString('hex');
  const expiracion = Date.now() + 3600000; // 1 hora

  await pool.query('UPDATE alumnos SET reset_token = ?, reset_expiracion = ? WHERE email = ?', [token, expiracion, email]);

  const enlace = `http://localhost:5173/restablecer/${token}`;
  const mensajeHTML = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #007bff;">Restablecer tu contraseña</h2>
    <p>Hola,</p>
    <p>Recibimos una solicitud para restablecer tu contraseña en <strong>Pilates Studio</strong>.</p>
    <p>Hacé clic en el siguiente botón para establecer una nueva contraseña:</p>
    <p style="margin: 20px 0;">
      <a href="${enlace}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Restablecer contraseña
      </a>
    </p>
    <p>Este enlace expirará en 1 hora por seguridad.</p>
    <p>Si no solicitaste este cambio, ignorá este mensaje.</p>
    <br>
    <p>Gracias,<br>El equipo de Pilates Studio</p>
  </div>
`;

  await enviarCorreo(email, 'Restablecer contraseña - Pilates Studio', mensajeHTML);


  res.send('Correo enviado');
});

//restablecer contraseña
const md5 = require('md5');

router.post('/restablecer/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuarios = await pool.query('SELECT * FROM alumnos WHERE reset_token = ?', [token]);
  const usuario = usuarios[0];

  if (!usuario || Date.now() > usuario.reset_expiracion) {
    return res.status(400).send('Token inválido o expirado');
  }

  const hashedPassword = md5(password);
  await pool.query(
    'UPDATE alumnos SET password = ?, reset_token = NULL, reset_expiracion = NULL WHERE id = ?',
    [hashedPassword, usuario.id]
  );

  res.send('Contraseña actualizada correctamente');
});

/* clases reservadas */
router.get('/reservas/:id_alumno', async (req, res) => {
  try {
    const idAlumno = parseInt(req.params.id_alumno, 10);
    console.log('🔍 ID recibido:', idAlumno);

    const clases = await inscripcionesModel.getClasesPorAlumno(idAlumno);
    console.log('📦 Clases encontradas:', clases);

    res.json(clases);
  } catch (error) {
    console.error('❌ Error en /reservas/:id_alumno:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


/*eliminar reserva */
router.delete('/reservas/:id_inscripcion', async (req, res) => {
  const { id_inscripcion } = req.params;

  try {
    // Obtener el id_clase para devolver el cupo
    const result = await pool.query('SELECT id_clase FROM inscripciones WHERE id = ?', [id_inscripcion]);
    if (result.length === 0) return res.status(404).json({ message: 'Inscripción no encontrada' });

    const id_clase = result[0].id_clase;


    // Eliminar inscripción
    await pool.query('DELETE FROM inscripciones WHERE id = ?', [id_inscripcion]);

    // Devolver cupo
    await pool.query('UPDATE clases SET cupo_disponible = cupo_disponible + 1 WHERE id = ?', [id_clase]);

    res.json({ message: 'Inscripción cancelada correctamente' });
  } catch (error) {
    console.error('❌ Error al cancelar inscripción:', error.message);
    res.status(500).json({ message: 'Error al cancelar inscripción' });
  }
});


/*editar sus datos el alumno */
router.put('/alumnos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email } = req.body;

  try {
    await pool.query(
      'UPDATE alumnos SET nombre = ?, apellido = ?, email = ? WHERE id = ?',
      [nombre, apellido, email, id]
    );

    // Opcional: devolver los datos actualizados
    const [actualizado] = await pool.query('SELECT nombre, apellido, email FROM alumnos WHERE id = ?', [id]);
    res.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar alumno:', error.message);
    res.status(500).json({ message: 'Error al actualizar datos del alumno' });
  }
});



module.exports = router;