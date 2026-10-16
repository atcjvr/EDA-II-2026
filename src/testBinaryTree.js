import BinaryTree from "./structures/BinaryTree.js";

// Crear un árbol binario
const tree = new BinaryTree();

// Insertar números de prueba
const numbers = [50, 30, 70, 20, 40, 60, 80];

numbers.forEach((number) => {
  tree.insert(number);
});

// Mostrar resultados
console.log("=== CHALLENGE 08 - ÁRBOL BINARIO ===");

console.log("\nNúmeros insertados:");
console.log(numbers);

console.log("\nRecorrido InOrder:");
console.log(tree.inOrder());

console.log("\nRecorrido PreOrder:");
console.log(tree.preOrder());

console.log("\nRecorrido PostOrder:");
console.log(tree.postOrder());

// Probar búsqueda
console.log("\n=== BÚSQUEDA DE NÚMEROS ===");

console.log("¿Existe el número 40?", tree.search(40));
console.log("¿Existe el número 90?", tree.search(90));