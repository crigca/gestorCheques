
📌 Gestor de Cheques

Gestor de Cheques es una aplicación web diseñada para administrar cheques de manera sencilla y eficiente. Permite registrar, editar, eliminar y visualizar cheques en bandejas de entrada y salida con un límite máximo de 30 cheques.

🚀 Tecnologías Utilizadas

Next.js – Framework de React para aplicaciones web

TypeScript – Tipado seguro y mantenible

Prisma ORM – Acceso a base de datos (SQLite para desarrollo, MySQL/Aurora en producción)

Tailwind CSS – Diseño moderno y responsivo

React Hooks – useState, useEffect para manejar el estado

🛠️ Instalación y Configuración

1⃣ Clonar el repositorio

git clone https://github.com/tu-usuario/gestor-cheques.git
cd gestor-cheques

2⃣ Instalar dependencias

npm install

⚙️ Modos de ejecución (local vs producción)

Esta app puede conectarse a dos bases de datos distintas según el entorno:

Entorno

Base de Datos

Prisma Schema

Archivo .env

Local

SQLite (desarrollo)

schema.local.prisma

.env.local

Producción

Aurora MySQL (AWS)

schema.prisma

Configurada en Vercel env

▶️ Desarrollo local (modo seguro)

Asegurate de tener un archivo .env.local con esta línea:

DATABASE_URL="file:./prisma/dev.db"

Ejecutá la migración para generar la base local:

npm run migrate:local

Generá el cliente Prisma:

npm run generate:local

Levantá el servidor en modo dev:

npm run dev

(Prisma Studio también está disponible con npm run studio:local)

💻 Producción (Vercel + Aurora MySQL)

En producción, la app está desplegada en Vercel, usando una base de datos Aurora MySQL en AWS RDS.

Vercel tiene configurada una variable de entorno: DATABASE_URL

Prisma utiliza schema.prisma como esquema base.

La migración a producción se hace manualmente desde consola:

npx prisma migrate deploy

📦 Scripts disponibles

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "postinstall": "prisma generate",
  "migrate:local": "DATABASE_URL='file:./prisma/dev.db' npx prisma migrate dev --schema=prisma/schema.local.prisma",
  "generate:local": "DATABASE_URL='file:./prisma/dev.db' npx prisma generate --schema=prisma/schema.local.prisma",
  "studio:local": "npx prisma studio --schema=prisma/schema.local.prisma"
}

📌 Uso de la Aplicación

🏠 Inicio

Pantalla principal con información general.

📥 Bandeja de Entrada

Agregar / ver / editar / eliminar cheques recibidos.

📤 Bandeja de Salida

Agregar / ver / editar / eliminar cheques emitidos.

📁 Panel General

Visualización total de los cheques.

⚠️ Límite: 30 cheques máximo entre entrada y salida. Se bloquea el agregado con un modal de advertencia.

📡 API - Endpoints Disponibles

Método

Endpoint

Descripción

GET

/api/cheques

Obtener todos los cheques

POST

/api/cheques

Agregar un nuevo cheque

GET

/api/cheques/:id

Obtener un cheque por ID

PUT

/api/cheques/:id

Editar un cheque existente

DELETE

/api/cheques/:id

Eliminar un cheque por ID




