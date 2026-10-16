import SmartSearch from "./structures/SmartSearch.js";

// ======================================
// CREAR BUSCADOR
// ======================================

const searchEngine = new SmartSearch();

// ======================================
// REGISTRAR PRODUCTOS
// ======================================

searchEngine.insert("air max", 90);
searchEngine.insert("air force", 95);
searchEngine.insert("air jordan", 85);
searchEngine.insert("adidas boost", 80);
searchEngine.insert("adidas superstar", 92);
searchEngine.insert("nike revolution", 75);
searchEngine.insert("nike pegasus", 88);
searchEngine.insert("nike invincible", 97);

// ======================================
// MOSTRAR PRODUCTOS
// ======================================

console.log("\n=== PRODUCTOS REGISTRADOS ===");

console.log(searchEngine.getAllProducts());

// ======================================
// PRUEBA 1 - TOP 2 AIR
// ======================================

console.log("\n=== TOP 2 - AIR ===");

console.log(searchEngine.searchTopK("air", 2));

// ======================================
// PRUEBA 2 - TOP 2 ADIDAS
// ======================================

console.log("\n=== TOP 2 - ADIDAS ===");

console.log(searchEngine.searchTopK("adidas", 2));

// ======================================
// PRUEBA 3 - TOP 3 NIKE
// ======================================

console.log("\n=== TOP 3 - NIKE ===");

console.log(searchEngine.searchTopK("nike", 3));

// ======================================
// PRUEBA 4 - PREFIJO INEXISTENTE
// ======================================

console.log("\n=== TOP 3 - PUMA ===");

console.log(searchEngine.searchTopK("puma", 3));

// ======================================
// PRUEBA 5 - K MAYOR A RESULTADOS
// ======================================

console.log("\n=== TOP 10 - AIR ===");

console.log(searchEngine.searchTopK("air", 10));

// ======================================
// PRUEBA 6 - K INVÁLIDO
// ======================================

console.log("\n=== K INVÁLIDO ===");

console.log(searchEngine.searchTopK("air", 0));

// ======================================
// TOTAL
// ======================================

console.log("\n=== TOTAL PRODUCTOS ===");

console.log(searchEngine.size());