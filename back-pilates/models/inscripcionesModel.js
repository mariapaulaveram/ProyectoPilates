const pool = require('./bd');

// Filtrados
async function getInscripcionesConDetalles({ nombre, apellido, dia, profesor }) {
  let query = `
    SELECT 
      inscripciones.id,
      alumnos.nombre AS nombre_alumno,
      alumnos.apellido AS apellido_alumno,
      alumnos.email,
      clases.dia,
      clases.hora,
      clases.profesor
    FROM inscripciones
    JOIN alumnos ON inscripciones.id_alumno = alumnos.id
    JOIN clases ON inscripciones.id_clase = clases.id
    WHERE 1=1
  `;
  const params = [];

  if (nombre && nombre.trim() !== '') {
    query += ` AND alumnos.nombre LIKE ?`;
    params.push(`%${nombre}%`);
  }
  if (apellido && apellido.trim() !== '') {
    query += ` AND alumnos.apellido LIKE ?`;
    params.push(`%${apellido}%`);
  }
  if (dia && dia.trim() !== '') {
    query += ` AND clases.dia = ?`;
    params.push(dia);
  }
  if (profesor && profesor.trim() !== '') {
    query += ` AND clases.profesor LIKE ?`;
    params.push(`%${profesor}%`);
  }

  query += ` ORDER BY clases.dia, clases.hora`;

  const rows = await pool.query(query, params); // ✅ sin destructuring
  console.log('Inscripciones encontradas:', rows.length);
  return rows;
}

// Todos
async function getAlumnosInscriptos() {
  const query = 'SELECT * FROM inscripciones';
  const [rows] = await pool.query(query); // destructuring correcto
  return rows;
}


/*ver inscripciones del alumno */
async function getClasesPorAlumno(idAlumno) {
  console.log('🧪 Ejecutando getClasesPorAlumno para ID:', idAlumno);

  const query = `
    SELECT 
      inscripciones.id AS id_inscripcion,
      clases.dia,
      clases.hora,
      clases.profesor
    FROM inscripciones
    JOIN clases ON inscripciones.id_clase = clases.id
    WHERE inscripciones.id_alumno = ?
    ORDER BY clases.dia, clases.hora
  `;

  const rows = await pool.query(query, [idAlumno]);

  console.log('📦 Resultado SQL:', rows); // ✅ ahora sí, después de la consulta

  return rows;
}

/*inscribir alumno a una clase por sistema */
async function insertInscripcion({ id_alumno, id_clase, fecha_inscripcion, presente }) {
  const query = `
    INSERT INTO inscripciones (id_alumno, id_clase, fecha_inscripcion, presente)
    VALUES (?, ?, ?, ?)
  `;
  const params = [id_alumno, id_clase, fecha_inscripcion, presente];
  const result = await pool.query(query, params);
  return result;
}


async function verificarInscripcionExistente(id_alumno, id_clase) {
  try {
    const [rows] = await pool.query(
      'SELECT id FROM inscripciones WHERE id_alumno = ? AND id_clase = ? LIMIT 1',
      [id_alumno, id_clase]
    );
    return rows.length > 0;
  } catch (error) {
    console.error('Error al verificar inscripción existente:', error);
    return false;
  }
}

async function eliminarInscripcion(id) {
  try {
    const query = 'DELETE FROM inscripciones WHERE id = ?';
    await pool.query(query, [id]);
  } catch (error) {
    throw error;
  }
}

  



module.exports = { getInscripcionesConDetalles, getAlumnosInscriptos, getClasesPorAlumno, insertInscripcion, verificarInscripcionExistente, eliminarInscripcion };

