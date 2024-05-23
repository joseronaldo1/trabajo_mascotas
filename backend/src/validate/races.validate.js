import { body } from 'express-validator';

// Definir las reglas de validación para el registro de una raza
const validarRegistroRace = [
    body('Raza')
        .notEmpty().withMessage('El campo Raza es requerido')
        .isString().withMessage('El campo Raza debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El campo Raza no puede tener más de 100 caracteres')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo Raza solo puede contener letras y espacios')
];

// Definir las reglas de validación para la actualización de una raza
const validarActualizacionRace = [
    body('Raza')
        .notEmpty().withMessage('El campo Raza es requerido')
        .isString().withMessage('El campo Raza debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El campo Raza no puede tener más de 100 caracteres')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo Raza solo puede contener letras y espacios')
];

export { validarRegistroRace, validarActualizacionRace };
