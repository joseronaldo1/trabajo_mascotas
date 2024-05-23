import { pool } from "../db/conexion.js";
import bcrypt from 'bcrypt';

export const registroUsuario = async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ejecutar la consulta SQL con la contraseña encriptada
    const [result] = await pool.execute('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)', [nombre, correo, hashedPassword]);

    // Verificar si se insertaron filas
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Registro exitoso' });
    } else {
      return res.status(500).json({ message: 'Error al registrar usuario' });
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
};
