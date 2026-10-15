// Representa un nodo de la lista doblemente enlazada
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// Lista doblemente enlazada
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
  }

  // Visitar una nueva página
  visit(data) {
    const newNode = new Node(data);

    // Si la lista está vacía
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
      this.length++;
      return;
    }

    // Si regresamos a una página anterior,
    // eliminamos el historial hacia adelante
    if (this.current !== this.tail) {
      this.current.next = null;
      this.tail = this.current;

      // Recalcular la cantidad de nodos
      let count = 0;
      let temp = this.head;

      while (temp !== null) {
        count++;
        temp = temp.next;
      }

      this.length = count;
    }

    // Agregar la nueva página al final
    newNode.prev = this.tail;
    this.tail.next = newNode;

    this.tail = newNode;
    this.current = newNode;
    this.length++;
  }

  // Retroceder una página
  back() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }

    return this.current ? this.current.data : null;
  }

  // Avanzar una página
  forward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }

    return this.current ? this.current.data : null;
  }

  // Consultar la página actual
  getCurrent() {
    return this.current ? this.current.data : null;
  }

  // Obtener el historial completo
  toArray() {
    const pages = [];
    let temp = this.head;

    while (temp !== null) {
      pages.push(temp.data);
      temp = temp.next;
    }

    return pages;
  }

  // Cantidad de páginas
  size() {
    return this.length;
  }
}

export default DoublyLinkedList;