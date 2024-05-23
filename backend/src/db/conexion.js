import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './src/env/.env' }); // Especificar la ruta al archivo .env
 // Cargar las variables de entorno desde el archivo .env en el directorio actual

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
