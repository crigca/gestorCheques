📌 Gestor de Cheques

Gestor de Cheques es una aplicación web diseñada para administrar cheques de manera sencilla y eficiente. Permite registrar, editar, eliminar y visualizar cheques en bandejas de entrada y salida con un límite máximo de 30 cheques.

🚀 Tecnologías Utilizadas

Next.js (Framework de React para aplicaciones web)

TypeScript (Para tipado seguro y mejor mantenibilidad)

Prisma (ORM para manejar la base de datos SQLite)

Tailwind CSS (Para un diseño limpio y estilizado)

React Hooks (useState, useEffect para manejo de estado y efectos)

🛠️ Instalación y Configuración

1️⃣ Clonar el repositorio

  git clone https://github.com/tu-usuario/gestor-cheques.git
  cd gestor-cheques

2️⃣ Instalar dependencias

  npm install

3️⃣ Configurar la base de datos con Prisma

Crear un archivo .env en la raíz del proyecto y agregar la configuración de SQLite:

DATABASE_URL="file:./prisma/dev.db"

Ejecutar las migraciones para generar la base de datos:

  npx prisma migrate dev --name init

(Opcional) Abrir Prisma Studio para ver la base de datos:

  npx prisma studio

4️⃣ Iniciar el servidor

  npm run dev

La aplicación estará disponible en: http://localhost:3000

📌 Uso de la Aplicación

🏠 Inicio

La pantalla principal muestra un resumen del sistema y su propósito.

📥 Bandeja de Entrada

Agregar un cheque a la bandeja de entrada.

Ver la lista de cheques recibidos.

Editar o eliminar cheques.

Límite: 30 cheques en total (entrada + salida).

📤 Bandeja de Salida

Agregar un cheque a la bandeja de salida.

Ver la lista de cheques enviados.

Editar o eliminar cheques.

📑 Panel General

Visualizar todos los cheques en un solo lugar.

Editar o eliminar cheques fácilmente.

⚠️ Límite de Cheques

Se muestra un modal de advertencia cuando se alcanzan los 30 cheques.

No se pueden agregar más cheques hasta eliminar alguno.

📡 API - Endpoints Disponibles

Método

Endpoint

Descripción

GET

/api/cheques

Obtener todos los cheques.

POST

/api/cheques

Agregar un nuevo cheque.

GET

/api/cheques/:id

Obtener un cheque por su ID.

PUT

/api/cheques/:id

Editar un cheque existente.

DELETE

/api/cheques/:id

Eliminar un cheque por su ID.


