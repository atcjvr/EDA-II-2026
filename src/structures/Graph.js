class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  // Agregar un nodo al grafo
  addNode(node) {
    if (this.nodes.some((n) => n.id === node.id)) {
      return false;
    }

    this.nodes.push(node);
    this.adjList[node.id] = [];

    return true;
  }

  // Crear una conexión entre dos nodos
  addEdge(node1, node2) {
    if (!this.adjList[node1] || !this.adjList[node2]) {
      return false;
    }

    if (!this.adjList[node1].includes(node2)) {
      this.adjList[node1].push(node2);
    }

    if (!this.adjList[node2].includes(node1)) {
      this.adjList[node2].push(node1);
    }

    return true;
  }

  // Buscar un nodo por su identificador
  searchNode(id) {
    return this.nodes.find((node) => node.id === id);
  }

  // Consultar las conexiones de un nodo
  getAdjacency(id) {
    return this.adjList[id] || [];
  }

  // Obtener las personas que viven en una ciudad
  getPeopleByCity(cityId) {
    const connections = this.getAdjacency(cityId);

    return connections
      .map((id) => this.searchNode(id))
      .filter((node) => node && node.type === "person");
  }

  // Mostrar el grafo completo
  printGraph() {
    console.log("=== NODOS DEL GRAFO ===");
    console.table(this.nodes);

    console.log("=== LISTA DE ADYACENCIA ===");
    console.log(this.adjList);
  }
}

export default Graph;