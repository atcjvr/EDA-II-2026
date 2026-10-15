class Queue {
  constructor() {
    this.items = [];
  }

  // Agregar una persona a la cola
  enqueue(person) {
    this.items.push(person);

    // Ordenar por fecha de llegada
    this.items.sort(
      (a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate)
    );
  }

  // Atender a la primera persona
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items.shift();
  }

  // Consultar la primera persona
  front() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[0];
  }

  // Verificar si la cola está vacía
  isEmpty() {
    return this.items.length === 0;
  }

  // Obtener cantidad de personas
  size() {
    return this.items.length;
  }

  // Mostrar todas las personas
  print() {
    return [...this.items];
  }
}

export default Queue;