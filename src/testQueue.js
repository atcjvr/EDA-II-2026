import Queue from "./structures/Queue.js";

// Crear una nueva cola
const atmQueue = new Queue();

// Personas ficticias para probar el cajero
const people = [
  {
    name: "Carlos Pérez",
    withdrawalAmount: 200000,
    arrivalDate: "2026-10-14T09:15:00",
  },
  {
    name: "María Rodríguez",
    withdrawalAmount: 350000,
    arrivalDate: "2026-10-14T09:05:00",
  },
  {
    name: "Andrés Gómez",
    withdrawalAmount: 150000,
    arrivalDate: "2026-10-14T09:25:00",
  },
  {
    name: "Laura Martínez",
    withdrawalAmount: 500000,
    arrivalDate: "2026-10-14T09:10:00",
  },
];

// Agregar personas a la cola
people.forEach((person) => {
  atmQueue.enqueue(person);
});

// Mostrar la cola completa
console.log("=== COLA DEL CAJERO AUTOMÁTICO ===");

console.log("Personas en espera:");

console.table(atmQueue.print());

// Consultar cantidad de personas
console.log("Cantidad de personas:", atmQueue.size());

// Consultar primera persona
console.log("Primera persona en la cola:", atmQueue.front());

// Atender a la primera persona
const attendedPerson = atmQueue.dequeue();

console.log("Persona atendida:", attendedPerson);

// Mostrar la cola después de atender
console.log("=== COLA ACTUALIZADA ===");

console.table(atmQueue.print());

console.log("Personas restantes:", atmQueue.size());