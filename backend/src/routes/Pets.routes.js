import { Router } from "express";

import { validarRegistroMascota, validarActualizacionMascota } from "../validate/pets.validate.js";
import { buscarMascota, editarMascota, eliminarMascota, registrarMascota, listarMascotas } from "../controller/Pets.js"; // Asegúrate de importar listarMascotas

const Pets = Router();

Pets.post('/RegustroPets', registrarMascota);
Pets.put('/ActualizarPets/:id', validarActualizacionMascota, editarMascota);
Pets.delete('/EliminarPets/:id', eliminarMascota);
Pets.get('/BuscarPets/:id', buscarMascota);
Pets.get('/ListarTodosPets', listarMascotas); // Ruta para listar todas las mascotas

export default Pets;
