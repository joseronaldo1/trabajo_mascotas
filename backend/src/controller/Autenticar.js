import { pool } from "../db/conexion.js";
import jwt from "jsonwebtoken"; // Cambio aquí: importa como 'jwt' en lugar de 'Jwt'
import bcrypt from 'bcrypt';

export const validar = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Falta el correo electrónico o la contraseña');
    }

    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).send('Correo electrónico no registrado');
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Generar un token JWT
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token en la respuesta
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};




export const validarToken = async (req, res, next) => {
    try {
        const tokenClient = req.headers['token'];
        if (!tokenClient) {
            return res.status(403).json({ message: 'Token es requerido' });
        } else {
            jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(403).json({ message: 'Token inválido: ' + error.message });
                } else {
                    next();
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Error del servidor: ' + error.message });
    }
};