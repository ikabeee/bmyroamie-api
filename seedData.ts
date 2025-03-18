const axios = require('axios');

const API_URL = 'http://localhost:3000'; // Cambia a tu URL real de la API

// Función para crear un usuario
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user`, userData);
    console.log('Usuario creado:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error al crear usuario:',
      error.response ? error.response.data : error.message
    );
  }
};

// Función para crear una personalidad
const createPersonality = async (personalityData) => {
  try {
    const response = await axios.post(`${API_URL}/personality`, personalityData);
    console.log('Personalidad creada:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error al crear personalidad:',
      error.response ? error.response.data : error.message
    );
  }
};

// Función para crear un interés
const createInterest = async (interestData) => {
  try {
    const response = await axios.post(`${API_URL}/interest`, interestData);
    console.log('Interés creado:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error al crear interés:',
      error.response ? error.response.data : error.message
    );
  }
};

// Datos de usuarios
const userData = [
  { name: 'Sebastian', lastName: 'Perez', email: 'sebas@gmail.com', password: 'Password.2003', telephone: '123-456-7890', about_me: 'Just a user who loves coding!', status: 1, role: 1 },
  { name: 'Zuri', lastName: 'Delgado', email: 'zuri@gmail.com', password: 'Password.1234', telephone: '123-456-7890', about_me: 'Just a user who loves coding!', status: 1, role: 1 },
  { name: 'Carlos', lastName: 'Gonzalez', email: 'carlos@gmail.com', password: 'Password.1234', telephone: '123-456-7890', about_me: 'Just a user who loves coding!', status: 1, role: 1 },
  { name: 'Bryan', lastName: 'Gamaliel', email: 'bryan@gmail.com', password: 'Password.1234', telephone: '123-456-7890', about_me: 'Just a user who loves coding!', status: 1, role: 1 }
];

// Datos de personalidades
const personalityData = [
  { name: 'Callado/a' }, { name: 'Sociable' }, { name: 'Introvertido/a' }, { name: 'Extrovertido/a' }, { name: 'Estudioso/a' },
  { name: 'Creativo/a' }, { name: 'Organizado/a' }, { name: 'Espontáneo/a' }, { name: 'Tranquilo/a' }, { name: 'Responsable' },
  { name: 'Amigable' }, { name: 'Adicto al trabajo' }, { name: 'Flexible' }
];

// Datos de intereses
const interestData = [
  { name: 'Programación' }, { name: 'Cocina' }, { name: 'Viajes' }, { name: 'Ejercicio' }, { name: 'Lectura' },
  { name: 'Música' }, { name: 'Películas' }, { name: 'Mascotas' }, { name: 'Fotografía' }, { name: 'Senderismo' },
  { name: 'Videojuegos' }, { name: 'Arte' }, { name: 'Deportes' }, { name: 'Actividades al aire libre' }, { name: 'Manualidades' },
  { name: 'Jardinería' }, { name: 'Voluntariado' }
];

// Función principal para crear los datos
const createData = async () => {
  // Crear usuarios
  for (const user of userData) {
    await createUser(user);
  }

  // Crear personalidades
  for (const personality of personalityData) {
    await createPersonality(personality);
  }

  // Crear intereses
  for (const interest of interestData) {
    await createInterest(interest);
  }
};

// Ejecutar el script
createData();
