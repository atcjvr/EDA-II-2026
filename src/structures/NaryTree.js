// Challenge 09 - Árbol N-ario

// Clase que representa cada nodo del árbol
export class NaryNode {
  constructor(title, link, component) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  // Agregar un nodo hijo
  addChild(node) {
    this.children.push(node);
  }
}

// Clase que representa el árbol N-ario
export class NaryTree {
  constructor(root) {
    this.root = root;
  }

  // Recorrido en profundidad (DFS)
  dfs(node = this.root) {
    if (!node) return;

    console.log(node.title);

    for (const child of node.children) {
      this.dfs(child);
    }
  }

  // Recorrido por niveles (BFS)
  bfs() {
    if (!this.root) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      console.log(current.title);

      for (const child of current.children) {
        queue.push(child);
      }
    }
  }
}