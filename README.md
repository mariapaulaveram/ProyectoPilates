# Proyecto: Pilates Studio — Sistema de Gestión de Clases

## Descripción general
Pilates Studio es una aplicación web completa para la gestión de clases de Pilates en un gimnasio. El sistema está dividido en dos partes: backend y frontend, que trabajan en conjunto para ofrecer una experiencia fluida tanto a alumnos como administradores.

*** Backend (Node.js + Express + MySQL):** gestiona la lógica del sistema, autenticación, inscripciones y administración de clases.

***Frontend (React + Vite):** interfaz web para alumnos y administradores, con funcionalidades de registro, login, gestión de perfil y consulta de horarios.

## Funcionalidades principales

### Alumnos:

- Registro, inicio de sesión y recuperación de contraseña.

- Inscripción y cancelación de clases.

- Modificación de perfil.

### Administradores:

- Gestión de clases y alumnos.

- Visualización de inscripciones.

- Acciones administrativas sobre el sistema.

### Gimnasio:

- Registro de ingreso mediante sistema de check-in.


## Estructura del proyecto

/backend  -> API REST con Node.js, Express y MySQL
/frontend  -> Interfaz web con React + Vite
Cada carpeta incluye su propio README con instrucciones específicas de instalación y uso.

##   Tecnologías utilizadas
### Backend
Node.js
Express.js
MySQL (pool de conexiones)
JWT (autenticación por roles)

### Frontend
React
Vite
React Router DOM

## Instalación general
Clonar el repositorio:

bash
git clone https://github.com/mariapaulaveram/ProyectoPilates

Backend: npm start

Frontend: npm run dev

## Objetivos del proyecto
- Digitalizar la gestión de clases de Pilates.

- Facilitar la inscripción y administración de alumnos.

- Ofrecer una interfaz moderna y accesible.

- Integrar seguridad y autenticación por roles.

## Próximos pasos
- Integración de pasarela de pagos.

- Dashboard de métricas para administradores.

- Optimización para dispositivos móviles.