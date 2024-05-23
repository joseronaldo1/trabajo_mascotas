import { Router } from "express";
import { RegistroRace, BuscarRaza, ActualizarRaza, EliminarRaza, ListarRazas } from "../controller/races.js";
import { validarRegistroRace, validarActualizacionRace } from "../validate/races.validate.js";

const razas = Router();

razas.post('/RegistroRaza', validarRegistroRace, RegistroRace);
razas.get('/BuscarRaza/:id', BuscarRaza);
razas.put('/ActualizarRaza/:id', validarActualizacionRace, ActualizarRaza);
razas.delete('/EliminarRaza/:id', EliminarRaza);
razas.get('/listarRace',ListarRazas)

export default razas;
