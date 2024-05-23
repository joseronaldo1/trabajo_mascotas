import { body } from 'express-validator';


const validarGeneroRegistro = [

    body('genero')
        .notEmpty().withMessage('El campo género es requerido')
        .isString().withMessage('El campo género debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El campo género no puede tener más de 100 caracteres')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo género solo puede contener letras y espacios')
];


const validarGeneroActualizar = [
    
    // Validar el campo 'genero'
    body('genero')
        .notEmpty().withMessage('El campo género es requerido')
        .isString().withMessage('El campo género debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El campo género no puede tener más de 100 caracteres')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo género solo puede contener letras y espacios')
];

export { validarGeneroRegistro, validarGeneroActualizar };
