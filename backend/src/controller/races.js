import { validationResult } from 'express-validator';
import { pool } from "../db/conexion.js";

// Registro de una nueva raza
export const RegistroRace = async (req, res) => {
    // Comprobar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Raza } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO races (name_race) VALUES (?)', [Raza]);

        if (result.affectedRows > 0) {
            res.status(200).json('Se registró la raza');
        } else {
            res.status(400).json('No se pudo registrar la raza');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};

// Búsqueda de una raza por ID
export const BuscarRaza = async (req, res) => {
    const { id } = req.params;

    try {
        const [raza] = await pool.query('SELECT * FROM races WHERE id_race = ?', [id]);

        if (raza.length > 0) {
            res.status(200).json(raza[0]);
        } else {
            res.status(404).json('Raza no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};

// Actualización de una raza por ID
export const ActualizarRaza = async (req, res) => {
    const { id } = req.params;
    const { Raza } = req.body;

    try {
        const [result] = await pool.query('UPDATE races SET name_race = ? WHERE id_race = ?', [Raza, id]);

        if (result.affectedRows > 0) {
            res.status(200).json('Raza actualizada correctamente');
        } else {
            res.status(404).json('Raza no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};

// Eliminación de una raza por ID
export const EliminarRaza = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM races WHERE id_race = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json('Raza eliminada correctamente');
        } else {
            res.status(404).json('Raza no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};

export const ListarRazas = async (req, res) => {
    try {
        const razas = await pool.query('SELECT * FROM races');
        res.status(200).json(razas);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
};
