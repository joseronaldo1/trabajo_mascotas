import { validationResult } from 'express-validator';
import { pool } from "../db/conexion.js";

// Función para registrar un género
export const Registrogenders = async (req, res) => {
    // Comprobar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { genero } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO genders (name_gender) VALUES (?)', [genero]);

        if (result.affectedRows > 0) {
            res.status(200).json('Se registró el género');
        } else {
            res.status(400).json('No se pudo registrar el género');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};

// Función para buscar un género por ID
export const BuscarGenero = async (req, res) => {
    const { id } = req.params;

    try {
        const [genre] = await pool.query('SELECT * FROM genders WHERE id_gender = ?', [id]);

        if (genre.length > 0) {
            res.status(200).json(genre);
        } else {
            res.status(404).json('Género no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};

// Función para actualizar un género
export const ActualizarGenero = async (req, res) => {
    const { id } = req.params;
    const { genero } = req.body;

    try {
        const [existingGenre] = await pool.query('SELECT id_gender FROM genders WHERE id_gender = ?', [id]);

        if (existingGenre.length === 0) {
            return res.status(404).json('El género no existe');
        }

        const [result] = await pool.query('UPDATE genders SET name_gender = ? WHERE id_gender = ?', [genero, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json('Género actualizado correctamente');
        } else {
            return res.status(500).json('Error al actualizar el género');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
};


// Función para eliminar un género
export const EliminarGenero = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el género existe antes de intentar eliminarlo
        const [existingGenre] = await pool.query('SELECT id_gender FROM genders WHERE id_gender = ?', [id]);

        // Si no se encuentra el género, devolver un error 404
        if (existingGenre.length === 0) {
            return res.status(404).json('El género no existe');
        }

        // Desactivar temporalmente la restricción de clave externa para evitar errores al actualizar las referencias de clave externa
        await pool.query('SET FOREIGN_KEY_CHECKS = 0');

        // Actualizar la referencia del género en las tablas relacionadas a NULL o a un valor por defecto según sea necesario

        // Eliminar el género de la tabla genders
        const [result] = await pool.query('DELETE FROM genders WHERE id_gender = ?', [id]);

        // Verificar si se eliminó correctamente el género
        if (result.affectedRows > 0) {
            return res.status(200).json('Género eliminado correctamente');
        } else {
            return res.status(500).json('Error al eliminar el género');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
};

export const ListarGeneros = async (req, res) => {
    try {
        // Realizar una consulta SELECT para obtener todos los géneros
        const [result] = await pool.query('SELECT * FROM genders');

        // Comprobar si se obtuvieron resultados
        if (result.length > 0) {
            // Enviar los resultados como respuesta JSON
            res.status(200).json(result);
        } else {
            // Enviar un mensaje indicando que no se encontraron géneros
            res.status(200).json([]);
        }
    } catch (error) {
        console.error(error);
        // Enviar un mensaje de error interno del servidor
        res.status(500).json('Error interno del servidor');
    }
};
