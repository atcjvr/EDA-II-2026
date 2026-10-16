import MinHeap from "./structures/MinHeap.js";

// ======================================
// CREAR MIN HEAP
// ======================================

const heap = new MinHeap();

// ======================================
// INSERTAR PRODUCTOS
// ======================================

heap.push({
  name: "air max",
  popularity: 90
});

heap.push({
  name: "air force",
  popularity: 95
});

heap.push({
  name: "air jordan",
  popularity: 85
});

heap.push({
  name: "adidas boost",
  popularity: 80
});

// ======================================
// MOSTRAR HEAP
// ======================================

console.log("=== HEAP ACTUAL ===");

console.log(heap.toArray());

// ======================================
// CONSULTAR EL MÍNIMO
// ======================================

console.log("=== PRODUCTO MENOS POPULAR ===");

console.log(heap.peek());

// ======================================
// EXTRAER ELEMENTOS
// ======================================

console.log("=== EXTRAER PRODUCTOS ===");

console.log(heap.pop());

console.log(heap.pop());

// ======================================
// MOSTRAR HEAP ACTUALIZADO
// ======================================

console.log("=== HEAP RESTANTE ===");

console.log(heap.toArray());

// ======================================
// TAMAÑO
// ======================================

console.log("=== TOTAL ELEMENTOS ===");

console.log(heap.size());