import Stack from "./structures/Stack.js";
const pilaLibros = new Stack();
const libro1 = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  anio: 1967
};
const libro2 = {
  titulo: "Don Quijote de la Mancha",
  autor: "Miguel de Cervantes",
  anio: 1605
};

const libro3 = {
  titulo: "El principito",
  autor: "Antoine de Saint-Exupéry",
  anio: 1943
};
pilaLibros.push(libro1);
pilaLibros.push(libro2);
pilaLibros.push(libro3);

console.log("Pila completa:", pilaLibros.print());

console.log("Cantidad de libros:", pilaLibros.size());

console.log("Libro en la cima:", pilaLibros.peek());

console.log("Libro retirado:", pilaLibros.pop());

console.log("Pila después de retirar:", pilaLibros.print());