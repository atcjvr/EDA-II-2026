// Datos ficticios para el Challenge 05

const names = [
  "María Rodríguez",
  "Carlos Pérez",
  "Laura Martínez",
  "Andrés Gómez",
  "Sofía Ramírez",
];

// Generar una fecha aleatoria de llegada
function randomArrivalDate() {
  const now = new Date();

  // Llegadas durante los últimos 60 minutos
  const minutesAgo = Math.floor(Math.random() * 60) + 1;

  return new Date(
    now.getTime() - minutesAgo * 60000
  ).toISOString();
}

// Crear personas ficticias
export const mockPeople = names.map((name, index) => ({
  id: index + 1,
  name,
  withdrawalAmount:
    (Math.floor(Math.random() * 20) + 1) * 50000,
  arrivalDate: randomArrivalDate(),
}));