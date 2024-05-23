import { validationResult } from 'express-validator';
import { pool } from "../db/conexion.js";

export const RegistroCategories = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { categoria } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO categories (name_category) VALUE (?)', [categoria]);

        if (result.affectedRows > 0) {
            res.status(200).json('Se registró la categoría');
        } else {
            res.status(400).json('No se pudo registrar la categoría');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};

export const ActualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { categoria } = req.body;

    try {
        // Verificar si el ID de la categoría existe en la base de datos
        const [existingCategory] = await pool.query('SELECT id_category FROM categories WHERE id_category = ?', [id]);

        // Si no se encontró la categoría, devolver un error 404
        if (existingCategory.length === 0) {
            return res.status(404).json('La categoría no existe');
        }

        // Actualizar la categoría en la base de datos
        const [result] = await pool.query('UPDATE categories SET name_category = ? WHERE id_category = ?', [categoria, id]);

        // Verificar si se actualizó correctamente la categoría
        if (result.affectedRows > 0) {
            return res.status(200).json('Categoría actualizada correctamente');
        } else {
            return res.status(500).json('Error al actualizar la categoría');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
};


// Función para eliminar una categoría
export const EliminarCategoria = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría de los parámetros de la solicitud

    try {
        // Verificar si el ID de la categoría existe en la base de datos
        const [category] = await pool.query('SELECT id_category FROM categories WHERE id_category = ?', [id]);

        // Si no se encontró la categoría, devolver un error 404
        if (category.length === 0) {
            return res.status(404).json('La categoría no existe');
        }

        // Desactivar temporalmente la restricción de clave externa para evitar errores al actualizar las referencias de clave externa
        await pool.query('SET FOREIGN_KEY_CHECKS = 0');

        // Actualizar la referencia de la categoría en la tabla pets a NULL
        await pool.query('UPDATE pets SET fk_categories = NULL WHERE fk_categories = ?', [id]);

        // Eliminar la categoría de la tabla categories
        const [result] = await pool.query('DELETE FROM categories WHERE id_category = ?', [id]);

        // Verificar si se eliminó correctamente la categoría
        if (result.affectedRows > 0) {
            res.status(200).json('Categoría eliminada correctamente'); // Devolver un mensaje de éxito si se eliminó correctamente
        } else {
            res.status(500).json('Error al eliminar la categoría'); // Devolver un mensaje de error si no se pudo eliminar la categoría
        }
    } catch (error) {
        console.error(error); // Imprimir el error en la consola en caso de fallo
        res.status(500).json('Error interno del servidor'); // Devolver un mensaje de error interno del servidor
    }
};




export const BuscarCategoriaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('SELECT * FROM categories WHERE 	id_category = ?', [id]);

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json('Categoría no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};


export const ListarCategorias = async (req, res) => {
    try {
        // Realizar una consulta SELECT para obtener todas las categorías
        const [result] = await pool.query('SELECT * FROM categories');

        // Comprobar si se obtuvieron resultados
        if (result.length > 0) {
            // Enviar los resultados como respuesta JSON
            res.status(200).json(result);
        } else {
            // Enviar un mensaje indicando que no se encontraron categorías
            res.status(200).json([]);
        }
    } catch (error) {
        console.error(error);
        // Enviar un mensaje de error interno del servidor
        res.status(500).json('Error interno del servidor');
    }
};
