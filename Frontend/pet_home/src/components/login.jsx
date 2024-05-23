// src/components/Login.js
import React, { useState } from "react";
import LogoFondo from '../assets/imgs/bg-login.svg';
import axios from 'axios';
import { setToken } from '../middleware/localStore'; // Importa la función de almacenamiento de token

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3500/login', formData);
      console.log(response.data);
      
      if (response.status === 200) {
        const token = response.data.token;
        // Almacenar el token en el localStorage usando la función importada
        setToken(token);
        onLogin(); // Llama a la función de inicio de sesión proporcionada por el padre
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative overflow-hidden rounded-3xl shadow-lg bg-white">
        <div className="bg-cover bg-center" style={{ backgroundImage: `url(${LogoFondo})`, height: "850px", width: "500px" }}></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          <form onSubmit={handleSubmit} className="mt-60 space-y-8 px-2 py-8 text-center sm:mt-40 sm:px-4 sm:py-6">
            <div className="group relative">
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange} 
                required 
                aria-label="Correo Electrónico"
                className="peer h-10 w-full md:w-96 rounded-3xl bg-gray-100 opacity-70 px-4 text-sm outline-none sm:h-9 sm:px-3 focus:outline-none focus:bg-white focus:ring focus:border-blue-500" 
              />
              <label htmlFor="email" className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white">Correo Electrónico</label>
            </div>

            <div className="group relative">
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange} 
                required 
                aria-label="Contraseña"
                className="peer h-10 w-full md:w-96 rounded-3xl bg-gray-100 opacity-70 px-4 text-sm outline-none sm:h-9 sm:px-3 focus:outline-none focus:bg-white focus:ring focus:border-blue-500" 
              />
              <label htmlFor="password" className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white">Contraseña</label>
            </div>

            {error && <p className="text-red-500">{error}</p>} 

            <button type="submit" className="h-12 w-full rounded-3xl bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 sm:h-11 sm:px-5">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
