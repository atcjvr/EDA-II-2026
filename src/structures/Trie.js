// ==========================================
// CHALLENGE 11 - TRIE
// Estructura de Datos y Algoritmos II
// ==========================================

// CLASE NODO

class TrieNode {
  constructor(value = null) {
    this.value = value;

    // Almacena los nodos hijos
    this.children = {};

    // Indica si termina una palabra
    this.isEndOfWord = false;

    // Información del producto
    this.product = null;
  }
}

// ==========================================
// CLASE TRIE
// ==========================================

class Trie {
  constructor() {
    // Nodo raíz vacío
    this.root = new TrieNode();

    // Cantidad de productos registrados
    this.count = 0;
  }

  // ========================================
  // INSERTAR PRODUCTO
  // ========================================

  insert(name, popularity) {
    if (typeof name !== "string") {
      return false;
    }

    const word = name.trim().toLowerCase();

    if (!word) {
      return false;
    }

    if (
      !Number.isFinite(popularity) ||
      popularity < 0
    ) {
      return false;
    }

    let current = this.root;

    // Recorrer cada letra del producto
    for (const character of word) {

      // Si la letra no existe, crear nodo
      if (!current.children[character]) {
        current.children[character] =
          new TrieNode(character);
      }

      // Avanzar al siguiente nodo
      current = current.children[character];
    }

    // Si es un producto nuevo,
    // aumentar el contador
    if (!current.isEndOfWord) {
      this.count++;
    }

    // Marcar el final de la palabra
    current.isEndOfWord = true;

    // Guardar el producto
    current.product = {
      name: word,
      popularity,
    };

    return true;
  }

  // ========================================
  // BUSCAR PRODUCTO EXACTO
  // ========================================

  search(name) {
    if (typeof name !== "string") {
      return null;
    }

    const word = name.trim().toLowerCase();

    let current = this.root;

    for (const character of word) {

      if (!current.children[character]) {
        return null;
      }

      current = current.children[character];
    }

    return current.isEndOfWord
      ? current.product
      : null;
  }

  // ========================================
  // BUSCAR POR PREFIJO
  // ========================================

  searchByPrefix(prefix) {
    if (typeof prefix !== "string") {
      return [];
    }

    const word = prefix.trim().toLowerCase();

    let current = this.root;

    // Localizar el nodo del prefijo
    for (const character of word) {

      if (!current.children[character]) {
        return [];
      }

      current = current.children[character];
    }

    const results = [];

    // Recuperar productos descendientes
    this.collectProducts(current, results);

    return results;
  }

  // ========================================
  // RECOLECTAR PRODUCTOS
  // ========================================

  collectProducts(node, results) {

    // Si termina una palabra,
    // agregar el producto
    if (node.isEndOfWord && node.product) {
      results.push(node.product);
    }

    // Recorrer los hijos
    for (const character in node.children) {
      this.collectProducts(
        node.children[character],
        results
      );
    }
  }

  // ========================================
  // OBTENER TODOS LOS PRODUCTOS
  // ========================================

  getAllProducts() {
    const results = [];

    this.collectProducts(
      this.root,
      results
    );

    return results;
  }

  // ========================================
  // CANTIDAD DE PRODUCTOS
  // ========================================

  size() {
    return this.count;
  }
}

export default Trie;