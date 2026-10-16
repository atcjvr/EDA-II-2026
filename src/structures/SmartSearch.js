// ==========================================
// CHALLENGE 11 - SMART SEARCH
// Estructura de Datos y Algoritmos II
// ==========================================

import Trie from "./Trie.js";
import MinHeap from "./MinHeap.js";

class SmartSearch {
  constructor() {
    // Estructura para almacenar productos
    this.trie = new Trie();
  }

  // ========================================
  // REGISTRAR PRODUCTO
  // ========================================

  insert(name, popularity) {
    return this.trie.insert(name, popularity);
  }

  // ========================================
  // BUSCAR PRODUCTO EXACTO
  // ========================================

  search(name) {
    return this.trie.search(name);
  }

  // ========================================
  // BUSCAR TOP K POR PREFIJO
  // ========================================

  searchTopK(prefix, k) {

    // Validar cantidad solicitada
    if (!Number.isInteger(k) || k <= 0) {
      return [];
    }

    // Buscar productos utilizando Trie
    const products =
      this.trie.searchByPrefix(prefix);

    // Crear Min Heap vacío
    const heap = new MinHeap();

    // Recorrer productos encontrados
    for (const product of products) {

      // Si todavía hay espacio,
      // agregar el producto
      if (heap.size() < k) {

        heap.push(product);

      } else {

        // Comparar con el menos popular
        const minimum = heap.peek();

        // Si el producto actual es más popular,
        // reemplazar el mínimo
        if (
          product.popularity >
          minimum.popularity
        ) {

          heap.pop();
          heap.push(product);

        }
      }
    }

    // Obtener los productos seleccionados
    const results = heap.toArray();

    // Ordenar únicamente los K resultados
    // de mayor a menor popularidad
    results.sort(
      (a, b) => b.popularity - a.popularity
    );

    return results;
  }

  // ========================================
  // OBTENER TODOS LOS PRODUCTOS
  // ========================================

  getAllProducts() {
    return this.trie.getAllProducts();
  }

  // ========================================
  // CANTIDAD DE PRODUCTOS
  // ========================================

  size() {
    return this.trie.size();
  }
}

export default SmartSearch;