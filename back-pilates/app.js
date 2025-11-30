// 📦 Dependencias base
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var hbs = require('hbs');
require('dotenv').config();

// 🧠 Inicialización de la app
var app = express();

// 🔒 Configuración de sesión institucional
var session = require('express-session');
app.use(session({
  secret: 'azzertotaucrot',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 10 } // 10 minutos
}));

// 🧭 Middleware de seguridad para rutas protegidas
const secured = async (req, res, next) => {
  try {
    console.log('ID de sesión:', req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log('Error en middleware secured:', error);
  }
};

// 🧩 Helpers institucionales para Handlebars
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

// 🖼️ Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// ⚙️ Middlewares base
app.use(cors()); // habilita CORS
app.use(logger('dev')); // logs HTTP
app.use(express.json()); // parsea JSON
app.use(express.urlencoded({ extended: false })); // parsea formularios
app.use(cookieParser()); // parsea cookies
app.use(express.static(path.join(__dirname, 'public'))); // archivos estáticos
app.use(express.json());


// 🚦 Rutas principales
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var clasesRouter = require('./routes/admin/clases');
var inicioRouter = require('./routes/admin/inicio');
var verAlumnosRouter = require('./routes/admin/verAlumnos');
var verInscriptosRouter = require('./routes/admin/verInscriptos');
var apiRouter = require('./routes/api');
var alumnosRouter = require('./routes/alumnos');
var checkinRouter = require('./routes/checkin');



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/clases',secured, clasesRouter); 
app.use('/admin/inicio', secured, inicioRouter); // protegida por sesión
app.use('/admin/verAlumnos', secured, verAlumnosRouter); // protegida por sesión
app.use('/admin/verInscriptos', secured, verInscriptosRouter); // protegida por sesión
app.use('/api', apiRouter);               // sigue igual
app.use('/api/alumnos', alumnosRouter);   // se separa
app.use('/checkin', checkinRouter);



// 🧯 Manejo de errores 404
app.use(function (req, res, next) {
  next(createError(404));
});

// 🛠️ Manejo de errores generales
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
