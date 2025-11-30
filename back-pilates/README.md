# Pilates Studio — Backend (Express.js)

## Descripción del proyecto

Este backend desarrollado con **Node.js** y **Express** gestiona la lógica del sistema de clases de Pilates. Proporciona una **API REST** que permite:

- **A los alumnos:** registrarse, iniciar sesión, recuperar la contraseña, inscribirse a clases, cancelar reservas y modificar su perfil.
- **A los administradores:** gestionar clases y alumnos, visualizar inscripciones, y realizar acciones administrativas.
- **Al gimnasio:** registrar el ingreso de alumnos mediante un sistema de check-in.

Se conecta a una base de datos **MySQL** mediante un pool de conexiones.


## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- Crypto (tokens de recuperación)
- Nodemailer (envío de correos)
- dotenv (variables de entorno)


## Instalación y ejecución
### Requisitos previos

- Node.js (versión recomendada: 18 o superior)
- MySQL corriendo localmente o en servidor


## Pasos para correr el servidor
### Clonar el repositorio
git clone https://github.com/mariapaulaveram/ProyectoPilates/tree/main/back-pilates
cd back-pilates

### Instalar dependencias
npm install

### Ejecutar el servidor
npm start


## Funcionalidades por rol
### Alumno

- Registro y login
- Recuperación de contraseña por email
- Visualización de clases disponibles
- Inscripción a clases (con validación de duplicados y cupo)
- Cancelación de reservas
- Modificación de perfil
- Visualización de clases reservadas

### Administrador

- Ver listado de clases (día, hora, cupo, cupo disponible, profesor)
- Agregar, editar o eliminar clases
- Ver listado de alumnos
- Agregar, editar o eliminar alumnos
- Ver inscriptos por clase, filtrar por día o profesor
- Inscribir alumnos manualmente (con validación de duplicados)

### Check-in en el gimnasio

- Ruta especial: `http://localhost:3000/checkin`
- Permite al alumno registrar su ingreso al gimnasio para la clase del día


## Recuperación de contraseña

- Se genera un token único con `crypto`.
- Se guarda en la base de datos con expiración de 1 hora.
- Se envía un correo con un enlace para restablecer la contraseña.
- El alumno accede al frontend en `/restablecer/:token` para completar el proceso.


## Rutas del backend 
### Rutas de la API REST (/api)

| Método | Ruta                           | Descripción                                         |
|--------|------------------------------- |-----------------------------------------------------|
| GET    | `/api/clases`                  | Obtener todas las clases disponibles                |
| POST   | `/api/alumnos`                 | Login de alumno con email y contraseña              |
| GET    | `/api/alumnos/:id`             | Obtener perfil del alumno por ID                    |
| POST   | `/api/registro`                | Registrar nuevo alumno                              |
| POST   | `/api/recuperar`               | Enviar email para restablecer contraseña            |
| POST   | `/api/restablecer/:token`      | Restablecer contraseña con token                    |
| POST   | `/api/inscribirse`             | Inscribirse a una clase                             |
| GET    | `/api/reservas/:id_alumno`     | Ver clases reservadas por el alumno                 |
| DELETE | `/api/reservas/:id_inscripcion`| Cancelar una reserva y devolver el cupo             |
| PUT    | `/api/alumnos/:id`             | Editar datos del alumno                             |


### Rutas administrativas (vistas protegidas por sesión)

| Método | Ruta                          | Descripción                                         |
|--------|-------------------------------|-----------------------------------------------------|
| GET    | `/admin/login`                | Login del administrador                             |
| GET    | `/admin/inicio`               | Panel principal del administrador                   |
| GET    | `/admin/clases`               | Ver todas las clases con detalles                   |
| GET    | `/admin/verAlumnos`           | Ver listado de alumnos                              |
| GET    | `/admin/verInscriptos`        | Ver inscriptos por clase, día o profesor            |


### Ruta de check-in

| Método | Ruta           | Descripción                                  |
|--------|----------------|----------------------------------------------|
| GET    | `/checkin`     | Interfaz para registrar ingreso del alumno   |


## Licencia

Este proyecto está bajo la Licencia MIT. Podés usarlo, modificarlo y distribuirlo libremente, siempre que mantengas los créditos originales.  
Ver el archivo [LICENSE](./LICENSE) para más detalles.


## Futuras mejoras


