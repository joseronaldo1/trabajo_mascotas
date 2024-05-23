import { validationResult } from 'express-validator';
import { pool } from "../db/conexion.js";
import upload from "./Cargar.Img.js"; // Importa la instancia de Multer configurada

// Controlador para registrar una mascota
export const registrarMascota = async (req, res) => {
  try {
    // Comprobar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Manejar la carga de archivos con Multer
    upload(req, res, async function (err) {
      if (err) {
        // Manejar errores de carga de archivos
        console.error('Error al cargar la imagen:', err);
        return res.status(500).json({ message: 'Error al cargar la imagen' });
      }

      // Obtener datos del cuerpo de la solicitud y la ruta del archivo cargado
      const { nombre, race_id, fk_categories, gender_id, user_id } = req.body;
      const photo = req.file ? req.file.path : null;

      // Insertar mascota en la base de datos
      const [result] = await pool.query('INSERT INTO pets (nombre_pets, race_id, fk_categories, photo, gender_id, user_id) VALUES (?, ?, ?, ?, ?, ?)', [nombre, race_id, fk_categories, photo, gender_id, user_id]);

      if (result.affectedRows > 0) {
        // Mascota registrada correctamente
        return res.status(200).json({ message: 'Mascota registrada correctamente' });
      } else {
        // Error al registrar la mascota en la base de datos
        throw new Error('No se pudo registrar la mascota');
      }
    });
  } catch (error) {
    // Manejar errores generales
    console.error('Error al registrar la mascota:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};









// Eliminar mascota
export const eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM pets WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Mascota eliminada correctamente' });
    } else {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Editar mascota
export const editarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { race_id, category_id, gender_id,  } = req.body;

    // Comprueba si se cargó una nueva foto
    let photo = null;
    if (req.file) {
      photo = req.file.path;
    }

    // Construye la consulta SQL dinámicamente en función de si se actualizó la foto
    let sql = '';
    let params = [race_id, category_id, gender_id, , id];
    if (photo) {
      sql = 'UPDATE pets SET race_id = ?, category_id = ?, gender_id = ?,  = ?, photo = ? WHERE id = ?';
      params = [race_id, category_id, gender_id, , photo, id];
    } else {
      sql = 'UPDATE pets SET race_id = ?, category_id = ?, gender_id = ?,  = ? WHERE id = ?';
    }

    const [result] = await pool.query(sql, params);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Mascota actualizada correctamente' });
    } else {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la mascota:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Buscar mascota
export const buscarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT p.nombre_pets AS nombre, r.name_race AS raza, g.name_gender AS genero, c.name_category AS categoria
      FROM pets p
      LEFT JOIN races r ON p.race_id = r.id_race
      LEFT JOIN genders g ON p.gender_id = g.id_gender
      LEFT JOIN categories c ON p.fk_categories = c.id_category
      WHERE p.id_pets = ?
    `;
    const [mascota] = await pool.query(query, [id]);

    if (mascota.length > 0) {
      return res.status(200).json(mascota[0]);
    } else {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
  } catch (error) {
    console.error('Error al buscar la mascota:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};



// Controlador para buscar y listar todas las mascotas
export const listarMascotas = async (req, res) => {
  try {
    // Realiza la consulta para seleccionar el nombre, la raza y la foto de las mascotas de la tabla 'pets'
    const query = `
      SELECT p.nombre_pets AS nombre, r.name_race AS raza, p.photo
      FROM pets p
      LEFT JOIN races r ON p.race_id = r.id_race
    `;
    const [mascotas] = await pool.query(query);

    // Si se encuentran mascotas, actualiza la ruta de la foto para que sea accesible desde el cliente
    if (mascotas.length > 0) {
      mascotas.forEach(mascota => {
        // La ruta de la imagen es relativa a la carpeta raíz del servidor
        mascota.photo = '/' + mascota.photo;
      });
      
      return res.status(200).json(mascotas);
    } else {
      // Si no se encuentran mascotas, indica que no hay resultados
      return res.status(200).json([]);
    }
  } catch (error) {
    // En caso de error, se captura y se envía una respuesta con el mensaje de error
    console.error('Error al listar las mascotas:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};




