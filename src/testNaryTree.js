// Challenge 09 - Pruebas del árbol N-ario

import { menuTree } from "./data/menuData.js";

console.log("=== CHALLENGE 09 ===");

console.log("\n=== RECORRIDO DFS ===");
menuTree.dfs();

console.log("\n=== RECORRIDO BFS ===");
menuTree.bfs();

console.log("\n=== INFORMACIÓN DEL ÁRBOL ===");

console.log(
  "Nodo raíz:",
  menuTree.root.title
);

console.log(
  "Cantidad de menús principales:",
  menuTree.root.children.length
);

console.log(
  "Menús principales:"
);

menuTree.root.children.forEach((node, index) => {
  console.log(`${index + 1}. ${node.title}`);
});