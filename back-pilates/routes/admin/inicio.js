const express = require('express');
const router = express.Router();

const usuariosModel = require('../../models/usuariosModel');

// Middleware para validar sesión
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta de inicio 
router.get('/', secured, function(req, res, next) {
  res.render('admin/inicio', {
    layout: 'admin/layout',
    persona: req.session.nombre
  });
});

module.exports = router;
