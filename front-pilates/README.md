# Pilates Studio — Frontend (React + Vite)
## Descripción del proyecto
Este proyecto es la interfaz web del sistema de gestión de clases de Pilates. Desarrollado con React y Vite, permite a los alumnos visualizar información general, consultar horarios disponibles y acceder a funcionalidades como registro, login y gestión de perfil.


## Tecnologías utilizadas

- React
- Vite
- React Router DOM

## Instalación y ejecución

### Requisitos previos

- Node.js (versión recomendada: 18 o superior)
- npm (v9 o superior)



## Pasos para correr el proyecto en modo desarrollo
### Clonar el repositorio
git clone https://github.com/mariapaulaveram/front-pilates
cd front-pilates

### Instalar dependencias
npm install

### Ejecutar el servidor de desarrollo
npm run dev


## Estructura del proyecto

├── public/
│   ├── images/Home/         # Imágenes utilizadas en el carousel y otras secciones
│   ├── favicon-32x32.png    # Ícono del sitio
│   └── logo.jpg             # Logo del estudio
│
├── src/
│   ├── componentes/         # Componentes reutilizables
│   │   ├── layouts/         # Componentes de layout general
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Nav.jsx
│   │   ├── Clases.jsx
│   │   ├── ClasesDisponibles.jsx
│   │   ├── ClasesDisponiblesHoy.jsx
│   │   ├── ClasesReservadas.jsx
│   │   ├── HomeCarousel.jsx
│   │   ├── LoginForm.jsx
│   │   ├── PerfilAlumno.jsx
│   │   ├── RecuperarContraseña.jsx
│   │   ├── RegistroForm.jsx
│   │   └── RestablecerContraseña.jsx
│   │
│   ├── hooks/               # Hooks personalizados
│   │   └── useScrollToHash.js
│   │
│   ├── paginas/             # Páginas principales del sitio
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Logueados.jsx
│   │   └── Registro.jsx
│   │
│   ├── styles/              # Archivos CSS con módulos por componente
│   │   ├── Clases.module.css
│   │   ├── ClasesDisponibles.module.css
│   │   ├── ClasesDisponiblesHoy.module.css
│   │   ├── ClasesReservadas.module.css
│   │   ├── Contraseña.module.css
│   │   ├── Footer.module.css
│   │   ├── Home.module.css
│   │   ├── HomeCarousel.module.css
│   │   ├── Login.module.css
│   │   ├── LoginForm.module.css
│   │   ├── Logueados.module.css
│   │   ├── Nav.module.css
│   │   ├── PerfilAlumno.module.css
│   │   └── Registro.module.css
│   │
│   ├── App.jsx              # Configuración de rutas
│   ├── App.css              # Estilos globales
│   ├── index.css            # Estilos base
│   └── main.jsx             # Punto de entrada de la app
│
├── .gitignore
├── README.md
├── eslint.config.js
└── index.html


## Funcionalidades para el alumno
La aplicación permite al alumno realizar las siguientes acciones:

### Registro y autenticación

- Crear una cuenta desde la página de registro.
- Iniciar sesión con credenciales válidas.
- Recuperar la contraseña mediante un enlace enviado por correo electrónico.
- Restablecer la contraseña desde el enlace recibido.


### Inicio personalizado

Al ingresar, el alumno es recibido con un saludo personalizado: “Hola, [nombre]”.

Junto al saludo, hay un botón que despliega un menú con opciones de perfil y sesión.

### Gestión de clases

- Ver las clases disponibles para el día actual.
- Inscribirse a una clase (con validación para evitar inscripciones duplicadas).
- Consultar las clases en las que está inscripto.
- Cancelar una reserva si lo desea.

### Perfil del alumno

- Acceder a su perfil desde el menú desplegable.
- Modificar sus datos personales.
- Cerrar sesión desde el mismo menú.


## Rutas de la aplicación
La navegación está gestionada con react-router-dom. Estas son las rutas principales y los componentes que se renderizan:


| Ruta                   | Componente              | Función principal                          |
|------------------------|-------------------------|--------------------------------------------|
| `/`                    | `Home`                  | Página principal con carousel y horarios   |
| `/login`               | `Login`                 | Inicio de sesión del alumno                |
| `/registro`            | `Registro`              | Registro de nuevos alumnos                 |
| `/recuperar`           | `RecuperarContraseña`   | Solicitud de recuperación por email        |
| `/restablecer/:token`  | `RestablecerContraseña` | Restablecer contraseña con token           |
| `/logueados`           | `Logueados`             | Vista protegida para usuarios logueados    |
| `/perfil`              | `PerfilAlumno`          | Ver/modificar perfil y clases reservadas   |



## Página principal

Al ingresar al sitio, el alumno ve:

- Un carousel de fotos destacadas del estudio.
- Un mensaje de bienvenida.
- Los horarios disponibles de las clases (sin mostrar cupos).
- Un navbar con las siguientes opciones:
  - Inicio
  - Registro
  - Login
  - Ver horarios


## Futuras mejoras

- Validación de campos más robusta en formularios
- Visualización de cupos disponibles en cada clase


## Licencia

Este proyecto está bajo la Licencia MIT. Podés usarlo, modificarlo y distribuirlo libremente, siempre que mantengas los créditos originales.  
Ver el archivo [LICENSE](./LICENSE) para más detalles.