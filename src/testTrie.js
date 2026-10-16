import Trie from "./structures/Trie.js";

// Crear Trie
const trie = new Trie();

// Registrar productos
trie.insert("air max", 90);
trie.insert("air force", 95);
trie.insert("air jordan", 85);
trie.insert("adidas boost", 80);

// Mostrar productos
console.log("=== PRODUCTOS REGISTRADOS ===");

console.log(trie.getAllProducts());

// Buscar producto exacto
console.log("=== BÚSQUEDA EXACTA ===");

console.log(trie.search("air max"));

// Buscar por prefijo
console.log("=== BÚSQUEDA POR PREFIJO ===");

console.log(trie.searchByPrefix("air"));

// Buscar prefijo inexistente
console.log("=== PREFIJO INEXISTENTE ===");

console.log(trie.searchByPrefix("nike"));

// Cantidad de productos
console.log("=== TOTAL PRODUCTOS ===");

console.log(trie.size());