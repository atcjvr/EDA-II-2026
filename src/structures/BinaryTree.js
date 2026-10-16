// Clase que representa un nodo del árbol
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Clase que representa el árbol binario de búsqueda
class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Insertar un número en el árbol
  insert(value) {
    if (!Number.isFinite(value)) {
      return false;
    }

    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return true;
    }

    let current = this.root;

    while (true) {
      // Evitar números duplicados
      if (value === current.value) {
        return false;
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return true;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return true;
        }

        current = current.right;
      }
    }
  }

  // Buscar un número dentro del árbol
  search(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  // Recorrido InOrder: izquierda - raíz - derecha
  inOrder(node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }

    return result;
  }

  // Recorrido PreOrder: raíz - izquierda - derecha
  preOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }

    return result;
  }

  // Recorrido PostOrder: izquierda - derecha - raíz
  postOrder(node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }

    return result;
  }
}

export default BinaryTree;