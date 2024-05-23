import { Router } from 'express';
import { validar } from '../controller/Autenticar.js';

const validacionLogin = Router();

validacionLogin.post('/login', validar);

export default validacionLogin;
