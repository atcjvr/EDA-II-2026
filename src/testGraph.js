import Graph from "./structures/Graph.js";

// Crear un nuevo grafo
const graph = new Graph();

// =====================================
// 1. AGREGAR CIUDADES
// =====================================

graph.addNode({
  id: "city-1",
  name: "Cali",
  type: "city"
});

graph.addNode({
  id: "city-2",
  name: "Bogotá",
  type: "city"
});

graph.addNode({
  id: "city-3",
  name: "Medellín",
  type: "city"
});

// =====================================
// 2. AGREGAR PERSONAS
// =====================================

graph.addNode({
  id: "person-1",
  name: "Carlos Pérez",
  age: 35,
  type: "person"
});

graph.addNode({
  id: "person-2",
  name: "María Rodríguez",
  age: 28,
  type: "person"
});

graph.addNode({
  id: "person-3",
  name: "Andrés Gómez",
  age: 42,
  type: "person"
});

graph.addNode({
  id: "person-4",
  name: "Laura Martínez",
  age: 31,
  type: "person"
});

// =====================================
// 3. RELACIONAR PERSONAS CON CIUDADES
// =====================================

graph.addEdge("person-1", "city-1");
graph.addEdge("person-2", "city-1");
graph.addEdge("person-3", "city-2");
graph.addEdge("person-4", "city-3");

// =====================================
// 4. CREAR RELACIONES DE AMISTAD
// =====================================

graph.addEdge("person-1", "person-2");
graph.addEdge("person-1", "person-3");
graph.addEdge("person-2", "person-4");

// =====================================
// 5. MOSTRAR EL GRAFO
// =====================================

console.log("\n=== CHALLENGE 10 - GRAFOS ===");

graph.printGraph();

// =====================================
// 6. BUSCAR UNA PERSONA
// =====================================

console.log("\n=== BUSCAR PERSONA ===");

console.log(
  "Persona encontrada:",
  graph.searchNode("person-1")
);

// =====================================
// 7. CONSULTAR PERSONAS POR CIUDAD
// =====================================

console.log("\n=== PERSONAS QUE VIVEN EN CALI ===");

console.table(
  graph.getPeopleByCity("city-1")
);

// =====================================
// 8. CONSULTAR CONEXIONES
// =====================================

console.log("\n=== CONEXIONES DE CARLOS ===");

console.log(
  graph.getAdjacency("person-1")
);