
const express = require('express');
const router = express.Router();
const { getAlumno } = require('../models/alumnosModel');

router.post('/alumnos', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await getAlumno(email, password);

    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful', alumno: result[0] });
    } else {
      res.status(401).json({ message: 'Login failed. Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});


module.exports = router;
