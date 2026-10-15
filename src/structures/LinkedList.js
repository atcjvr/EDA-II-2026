// Nodo de una lista simplemente enlazada
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Lista simplemente enlazada
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Agregar un elemento al final
  append(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  // Obtener el primer elemento
  getFirst() {
    return this.head ? this.head.data : null;
  }

  // Obtener el siguiente nodo
  getNext(node) {
    return node ? node.next : null;
  }

  // Convertir la lista en un arreglo
  toArray() {
    const elements = [];
    let current = this.head;

    while (current !== null) {
      elements.push(current.data);
      current = current.next;
    }

    return elements;
  }

  // Consultar cantidad de elementos
  size() {
    return this.length;
  }

  // Verificar si está vacía
  isEmpty() {
    return this.length === 0;
  }
}

export default LinkedList;