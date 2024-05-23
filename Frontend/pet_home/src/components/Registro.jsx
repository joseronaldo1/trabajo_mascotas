import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import close from "../assets/imgs/btn-close.svg";
import fondo from "../assets/imgs/bg.svg";
import iconFoto from "../assets/imgs/icon-camera.svg";
import Aumentar from "../assets/imgs/arrows.svg";
import Agregar from '../assets/imgs/btn-save.svg';
import Foto from "../assets/imgs/photo-lg-0.svg";

function RegistroPets() {
  
  const [formData, setFormData] = useState({
    nombre: '',
    nombre_race: '',
    category_id: '',
    gender_id: '',
    user_id: '', // Asigna el user_id si es necesario
  });

  const [isLoading, setIsLoading] = useState(false);
  const [razas, setRazas] = useState([]);

  useEffect(() => {
    const fetchRazas = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3500/Listarrace');
        console.log("Datos recibidos:", response.data);
        // Asegúrate de que esto sea un array plano
        setRazas(response.data);
      } catch (error) {
        console.error('Error al cargar las razas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRazas();
  }, []);

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('nombre_race', formData.nombre_race);
    data.append('category_id', formData.category_id);
    data.append('gender_id', formData.gender_id);
    data.append('user_id', formData.user_id);
    if (file) {
      data.append('photo', file);
    }
  
    try {
      const response = await axios.post('http://localhost:3500/RegistroPets', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
    }
  };
  
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 min-h-screen">
      <div className="relative w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg p-6 h-screen justify-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}></div>

        <div className="flex justify-between items-center mb-16 relative z-10 w-full h-10 mt-9">
          <h1 className="text-white text-lg pl-10">Registrar Mascota</h1>
          <button className="flex rounded-full w-8 h-8 justify-center items-center">
            <img src={close} alt="Cerrar" className="w-full h-full rounded-full" />
          </button>
        </div>

        <div className="flex justify-center items-center mb-24 mt-24">
          <img src={Foto} alt="Perro1" className="rounded-full w-32 h-32 absolute" />
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="bg-gray-400 w-full rounded-full flex items-center relative">
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="bg-transparent text-black placeholder-white rounded-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ placeholderColor: 'white' }}
            />
          </div>

          <div className="bg-gray-400 w-full rounded-full flex items-center relative mt-5 h-10">
        <select
          name="nombre_race"
          value={formData.nombre_race}
          onChange={handleInputChange}
          className="bg-transparent text-black placeholder-white rounded-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Seleccione una raza</option>
          {razas.length > 0 && razas.map((raza) => (
            <option key={raza.id_race} value={raza.name_race}>
              {raza.name_race}
            </option>
          ))}
        </select>
      </div>

          <div className="bg-gray-400 w-full h-10 rounded-full flex items-center relative z-10 mt-4">
            <input
              type="text"
              placeholder="Seleccione categoría"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="bg-transparent text-black placeholder-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ placeholderColor: 'white' }}
            />
            <div className="ml-auto flex space-x-2">
              <button type="button">
                <img src={Aumentar} alt="Mostrar" className="w-14 h-5 rounded-r-xl" />
              </button>
            </div>
          </div>

          <div className="bg-gray-400 w-full h-10 rounded-full flex items-center relative z-10 mt-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <input
              type="text"
              placeholder="Cambiar Foto"
              className="bg-transparent text-black placeholder-white rounded-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ placeholderColor: 'white' }}
              readOnly
            />
            <div className="ml-auto flex space-x-2">
              <button type="button" onClick={handleButtonClick}>
                <img src={iconFoto} alt="Mostrar" className="w-14 h-5 rounded-r-full bg-gray-400 flex items-center px-2" />
              </button>
            </div>
          </div>

          <div className="bg-gray-400 w-full rounded-full flex items-center relative z-10 mt-4">
            <input
              type="text"
              placeholder="Seleccione género"
              name="gender_id"
              value={formData.gender_id}
              onChange={handleInputChange}
              className="bg-transparent text-black placeholder-white rounded-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ placeholderColor: 'white' }}
            />
            <div className="ml-auto flex space-x-2">
              <button type="button">
                <img src={Aumentar} alt="Mostrar" className="w-14 h-5 rounded-r-xl" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button type="submit" className="bg-gray-400 w-30 h-10 rounded-full flex items-center relative z-10">
              <img src={Agregar} alt="Agregar" className="w-full h-full rounded-r-full bg-gray-400 flex items-center px-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroPets;
