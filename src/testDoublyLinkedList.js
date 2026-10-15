import DoublyLinkedList from "./structures/DoublyLinkedList.js";

const history = new DoublyLinkedList();

// Visitar páginas
history.visit("Google");
history.visit("YouTube");
history.visit("GitHub");
history.visit("Wikipedia");

console.log("Historial completo:", history.toArray());

console.log("Página actual:", history.getCurrent());

// Retroceder
console.log("Retroceder:", history.back());
console.log("Retroceder:", history.back());

// Avanzar
console.log("Avanzar:", history.forward());

// Visitar una nueva página
history.visit("Stack Overflow");

console.log("Nuevo historial:", history.toArray());

console.log("Cantidad de páginas:", history.size());