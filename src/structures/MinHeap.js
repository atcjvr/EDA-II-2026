// ==========================================
// CHALLENGE 11 - MIN HEAP
// Estructura de Datos y Algoritmos II
// ==========================================

class MinHeap {

  constructor(initial = []) {
    this.heap = [...initial];

    if (this.heap.length > 0) {
      this.heapify();
    }
  }

  // ========================================
  // COMPARAR PRODUCTOS
  // ========================================

  compare(a, b) {
    return a.popularity - b.popularity;
  }

  // ========================================
  // INSERTAR ELEMENTO
  // ========================================

  push(value) {
    this.heap.push(value);

    this.percolateUp();

    return this.heap.length;
  }

  // ========================================
  // OBTENER EL MÍNIMO SIN ELIMINARLO
  // ========================================

  peek() {
    return this.heap.length > 0
      ? this.heap[0]
      : undefined;
  }

  // ========================================
  // ELIMINAR EL MÍNIMO
  // ========================================

  pop() {
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];

    // Llevar el último elemento a la raíz
    this.heap[0] = this.heap.pop();

    // Restaurar la propiedad del Heap
    this.percolateDown(0);

    return min;
  }

  // ========================================
  // CONVERTIR ARREGLO EN MIN HEAP
  // ========================================

  heapify() {
    const start = Math.floor(
      (this.heap.length - 2) / 2
    );

    for (let i = start; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  // ========================================
  // REORDENAR HACIA ARRIBA
  // ========================================

  percolateUp() {
    let current = this.heap.length - 1;

    while (current > 0) {
      const parent = Math.floor(
        (current - 1) / 2
      );

      if (
        this.compare(
          this.heap[current],
          this.heap[parent]
        ) < 0
      ) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  // ========================================
  // REORDENAR HACIA ABAJO
  // ========================================

  percolateDown(index) {
    let current = index;

    while (2 * current + 1 < this.heap.length) {

      const left = 2 * current + 1;
      const right = 2 * current + 2;

      let minChild = left;

      // Seleccionar el hijo con menor popularidad
      if (
        right < this.heap.length &&
        this.compare(
          this.heap[right],
          this.heap[left]
        ) < 0
      ) {
        minChild = right;
      }

      if (
        this.compare(
          this.heap[minChild],
          this.heap[current]
        ) < 0
      ) {
        this.swap(current, minChild);
        current = minChild;
      } else {
        break;
      }
    }
  }

  // ========================================
  // INTERCAMBIAR ELEMENTOS
  // ========================================

  swap(i, j) {
    [
      this.heap[i],
      this.heap[j]
    ] = [
      this.heap[j],
      this.heap[i]
    ];
  }

  // ========================================
  // CANTIDAD DE ELEMENTOS
  // ========================================

  size() {
    return this.heap.length;
  }

  // ========================================
  // OBTENER ARREGLO
  // ========================================

  toArray() {
    return [...this.heap];
  }
}

export default MinHeap;