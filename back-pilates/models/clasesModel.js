var pool = require('./bd');


async function getClases() {
  const query = `
    SELECT * FROM clases
    ORDER BY
      CASE dia
        WHEN 'lunes' THEN 1
        WHEN 'martes' THEN 2
        WHEN 'miercoles' THEN 3
        WHEN 'jueves' THEN 4
        WHEN 'viernes' THEN 5
        WHEN 'sabado' THEN 6
      END,
      hora ASC
  `;
  const rows = await pool.query(query);
  return rows;
}

async function getClaseByDiaHora(dia, hora) {
  try {
    const query = 'SELECT * FROM clases WHERE dia = ? AND hora = ?';
    const rows = await pool.query(query, [dia, hora]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error al verificar clase existente:', error.message);
    throw error;
  }
}



async function getClaseById(id) {
    var query = 'select * from clases where id=?';
    var rows = await pool.query(query, [parseInt(id)]); 
    return rows[0];
}


async function insertClases(obj) {
  try {
    const query = "INSERT INTO clases SET ?";
    const result = await pool.query(query, [obj]); 
    return result;
  } catch (error) {
    console.log('Error al insertar clase:', error.sqlMessage || error.message);
    throw error;
  }
}

async function deleteClasesById(id) {
    const query = 'DELETE FROM clases WHERE id = ?';
    const [result] = await pool.query(query, [parseInt(id)]);
    console.log("Filas afectadas:", result.affectedRows); // ✅ Esto sí mostrará algo
    return result;
}


async function modificarClasesById(obj, id){
    try {
        const query = 'update clases set ? where id=?';
        const result = await pool.query(query, [obj, id]);
        return result;
    } catch (error){
        throw error;
    }
    
}

async function getClasesDisponibles() {
  const query = `
    SELECT * FROM clases
    WHERE cupo_disponible > 0
    ORDER BY
      CASE dia
        WHEN 'lunes' THEN 1
        WHEN 'martes' THEN 2
        WHEN 'miercoles' THEN 3
        WHEN 'jueves' THEN 4
        WHEN 'viernes' THEN 5
        WHEN 'sabado' THEN 6
      END,
      hora ASC
  `;
  const rows = await pool.query(query);
  return rows;
}




module.exports = {getClases, getClaseByDiaHora,insertClases, deleteClasesById, getClaseById, modificarClasesById, getClasesDisponibles}