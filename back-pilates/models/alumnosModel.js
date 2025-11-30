const pool = require('./bd');
const md5 = require('md5');

function getAlumno(email, password) {
  return new Promise((resolve, reject) => {
    const hashedPassword = md5(password); // 👈 Convertís la contraseña a MD5
    const query = 'SELECT id, email, nombre, apellido FROM alumnos WHERE email = ? AND password = ?';
    pool.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


//ver alumnos
async function getAlumnos() {
    const query = 'SELECT * FROM alumnos';
    const rows = await pool.query(query);
  return rows;
      }

async function getAlumnoById(id) {
  const query = 'SELECT * FROM alumnos WHERE id = ?';
  const rows = await pool.query(query, [parseInt(id)]);
  return rows;
}


//inscribir alumno a una clase
async function inscribirAlumno(id_alumno, id_clase) {
  // Verificar clase y cupo
  const [clase] = await pool.query('SELECT cupo_disponible FROM clases WHERE id = ?', [id_clase]);
  if (!clase || clase.length === 0) {
    throw new Error('Clase no encontrada');
  }
  if (clase[0].cupo_disponible <= 0) {
    throw new Error('No hay cupos disponibles');
  }

  // Registrar inscripción
  await pool.query('INSERT INTO inscripciones (id_alumno, id_clase) VALUES (?, ?)', [id_alumno, id_clase]);

  // Actualizar cupo
  await pool.query('UPDATE clases SET cupo_disponible = cupo_disponible - 1 WHERE id = ?', [id_clase]);

  return 'Inscripción exitosa';
}



function registrarAlumno(nombre, apellido, email, password) {
  return new Promise((resolve, reject) => {
    const checkQuery = 'SELECT id FROM alumnos WHERE email = ?';
    pool.query(checkQuery, [email], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length > 0) {
        return reject(new Error('El email ya está registrado'));
      }

      const insertQuery = 'INSERT INTO alumnos (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
      pool.query(insertQuery, [nombre, apellido, email, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: result.insertId, nombre, apellido, email });
        }
      });
    });
  });
}

async function deleteAlumnoById(id) {
    const query = 'DELETE FROM alumnos WHERE id = ?';
    const [result] = await pool.query(query, [parseInt(id)]);
    console.log("Filas afectadas:", result.affectedRows); // ✅ Esto sí mostrará algo
    return result;
}

async function modificarAlumno(id, nombre, apellido, email) {
  const query = `
    UPDATE alumnos
    SET nombre = ?, apellido = ?, email = ?
    WHERE id = ?
  `;
  const result = await pool.query(query, [nombre, apellido, email, parseInt(id)]);
  return result;
}








module.exports = { getAlumno, getAlumnos, getAlumnoById ,inscribirAlumno, registrarAlumno, deleteAlumnoById, modificarAlumno};