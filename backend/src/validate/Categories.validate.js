import { body } from 'express-validator';

// Validación para el registro de categorías
const validarRegistroCategories = [
    body('categoria')
        .notEmpty().withMessage('El campo categoría es requerido')
        .trim()
        .isString().withMessage('El campo categoría debe ser una cadena de texto')
        .isLength({ min: 1, max: 100 }).withMessage('El campo categoría debe tener entre 1 y 100 caracteres')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo categoría solo puede contener letras y espacios')
];

// Validación para la actualización de categorías
const validarActualizacionCategoria = [
    body('categoria')
        .notEmpty().withMessage('El campo categoría es requerido')
        .trim()
        .isString().withMessage('El campo categoría debe ser una cadena de texto')
        .isLength({ min: 1, max: 100 }).withMessage('El campo categoría debe tener entre 1 y 100 caracteres')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo categoría solo puede contener letras y espacios')
];

export { validarRegistroCategories, validarActualizacionCategoria };
