import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Datos de usuarios
const userData = [
  {
    name: 'Sebastian',
    lastName: 'Perez',
    email: 'sebas@gmail.com',
    password: 'Password.2003',
    telephone: '123-456-7890',
    about_me: 'Just a user who loves coding!',
    status: 1,
    role: 1,
  },
  {
    name: 'Zuri',
    lastName: 'Delgado',
    email: 'zuri@gmail.com',
    password: 'Password.1234',
    telephone: '123-456-7890',
    about_me: 'Just a user who loves coding!',
    status: 1,
    role: 1,
  },
  {
    name: 'Carlos',
    lastName: 'Gonzalez',
    email: 'carlos@gmail.com',
    password: 'Password.1234',
    telephone: '123-456-7890',
    about_me: 'Just a user who loves coding!',
    status: 1,
    role: 1,
  },
  {
    name: 'Bryan',
    lastName: 'Gamaliel',
    email: 'bryan@gmail.com',
    password: 'Password.1234',
    telephone: '123-456-7890',
    about_me: 'Just a user who loves coding!',
    status: 1,
    role: 1,
  },
];

// Datos de personalidades
const personalityData = [
  { name: 'Callado/a' },
  { name: 'Sociable' },
  { name: 'Introvertido/a' },
  { name: 'Extrovertido/a' },
  { name: 'Estudioso/a' },
  { name: 'Creativo/a' },
  { name: 'Organizado/a' },
  { name: 'Espontáneo/a' },
  { name: 'Tranquilo/a' },
  { name: 'Responsable' },
  { name: 'Amigable' },
  { name: 'Adicto al trabajo' },
  { name: 'Flexible' },
];

// Datos de intereses
const interestData = [
  { name: 'Programación' },
  { name: 'Cocina' },
  { name: 'Viajes' },
  { name: 'Ejercicio' },
  { name: 'Lectura' },
  { name: 'Música' },
  { name: 'Películas' },
  { name: 'Mascotas' },
  { name: 'Fotografía' },
  { name: 'Senderismo' },
  { name: 'Videojuegos' },
  { name: 'Arte' },
  { name: 'Deportes' },
  { name: 'Actividades al aire libre' },
  { name: 'Manualidades' },
  { name: 'Jardinería' },
  { name: 'Voluntariado' },
];

// Datos de los estados de México
const statesData = [
  { name: 'Aguascalientes' },
  { name: 'Baja California' },
  { name: 'Baja California Sur' },
  { name: 'Campeche' },
  { name: 'Ciudad de México' },
  { name: 'Chihuahua' },
  { name: 'Coahuila' },
  { name: 'Colima' },
  { name: 'Durango' },
  { name: 'Estado de México' },
  { name: 'Guanajuato' },
  { name: 'Guerrero' },
  { name: 'Hidalgo' },
  { name: 'Jalisco' },
  { name: 'Mexico' },
  { name: 'Michoacán' },
  { name: 'Morelos' },
  { name: 'Nayarit' },
  { name: 'Nuevo León' },
  { name: 'Oaxaca' },
  { name: 'Puebla' },
  { name: 'Querétaro' },
  { name: 'Quintana Roo' },
  { name: 'San Luis Potosí' },
  { name: 'Sinaloa' },
  { name: 'Sonora' },
  { name: 'Tabasco' },
  { name: 'Tamaulipas' },
  { name: 'Tlaxcala' },
  { name: 'Veracruz' },
  { name: 'Yucatán' },
  { name: 'Zacatecas' },
];

// Función para insertar usuarios
const createUser = async (user) => {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log('Usuario creado:', newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

// Función para insertar personalidades
const createPersonality = async (personality) => {
  try {
    const newPersonality = await prisma.personality.create({
      data: personality,
    });
    console.log('Personalidad creada:', newPersonality);
  } catch (error) {
    console.error('Error al crear personalidad:', error);
  }
};

// Función para insertar intereses
const createInterest = async (interest) => {
  try {
    const newInterest = await prisma.interest.create({
      data: interest,
    });
    console.log('Interés creado:', newInterest);
  } catch (error) {
    console.error('Error al crear interés:', error);
  }
};

// Función para insertar estados
const createState = async (state) => {
  try {
    const newState = await prisma.state.create({
      data: state,
    });
    console.log('Estado creado:', newState);
  } catch (error) {
    console.error('Error al crear estado:', error);
  }
};

// Función principal para insertar todos los datos
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

  // Crear estados de México
  for (const state of statesData) {
    await createState(state);
  }

  // Cerrar la conexión con Prisma
  await prisma.$disconnect();
};

// Ejecutar el script
createData();
