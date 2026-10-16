import { useState } from "react";
import BinaryTree from "./structures/BinaryTree";
import TreeVisualization from "./components/TreeVisualization";
import "./App.css";

function App() {
  const [tree, setTree] = useState(() => {
    const newTree = new BinaryTree();

    // Datos iniciales para probar el árbol
    [50, 30, 70, 20, 40, 60, 80].forEach((number) => {
      newTree.insert(number);
    });

    return newTree;
  });

  const [number, setNumber] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [message, setMessage] = useState("");
  const [traversal, setTraversal] = useState([]);
  const [traversalName, setTraversalName] = useState("");

  // Agregar un número al árbol
  const handleInsert = () => {
    if (number.trim() === "") {
      setMessage("Debes ingresar un número.");
      return;
    }

    const value = Number(number);

    if (!Number.isFinite(value)) {
      setMessage("Ingresa un número válido.");
      return;
    }

    if (tree.search(value)) {
      setMessage(`El número ${value} ya existe en el árbol.`);
      return;
    }

    const newTree = new BinaryTree();

    // Copiamos los valores existentes al nuevo árbol
    const copyNodes = (node) => {
      if (!node) return;

      newTree.insert(node.value);
      copyNodes(node.left);
      copyNodes(node.right);
    };

    copyNodes(tree.root);

    newTree.insert(value);

    setTree(newTree);
    setNumber("");
    setMessage(`Número ${value} agregado correctamente.`);
    setTraversal([]);
    setTraversalName("");
  };

  // Buscar un número
  const handleSearch = () => {
    if (searchNumber.trim() === "") {
      setMessage("Ingresa un número para buscar.");
      return;
    }

    const value = Number(searchNumber);

    if (!Number.isFinite(value)) {
      setMessage("Ingresa un número válido.");
      return;
    }

    if (tree.search(value)) {
      setMessage(`El número ${value} existe en el árbol.`);
    } else {
      setMessage(`El número ${value} no existe en el árbol.`);
    }
  };

  // Mostrar recorridos
  const handleTraversal = (type) => {
    let result = [];

    if (type === "InOrder") {
      result = tree.inOrder();
    }

    if (type === "PreOrder") {
      result = tree.preOrder();
    }

    if (type === "PostOrder") {
      result = tree.postOrder();
    }

    setTraversal(result);
    setTraversalName(type);
  };

  // Reiniciar árbol
  const handleClear = () => {
    setTree(new BinaryTree());
    setMessage("Árbol reiniciado correctamente.");
    setTraversal([]);
    setTraversalName("");
    setNumber("");
    setSearchNumber("");
  };

  return (
    <div className="app-container">
      <h1>Challenge 08 - Árboles Binarios</h1>

      <p className="subtitle">
        Estructura de datos - Árbol Binario de Búsqueda (BST)
      </p>

      <section className="control-section">
        <h2>Insertar número</h2>

        <div className="input-group">
          <input
            type="number"
            placeholder="Ingresa un número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <button className="btn-green" onClick={handleInsert}>
            Insertar número
          </button>
        </div>

        <h2>Buscar número</h2>

        <div className="input-group">
          <input
            type="number"
            placeholder="Número a buscar"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
          />

          <button className="btn-blue" onClick={handleSearch}>
            Buscar número
          </button>
        </div>

        <button className="btn-red" onClick={handleClear}>
          Reiniciar árbol
        </button>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="tree-section">
        <h2>Visualización del árbol</h2>

        <TreeVisualization root={tree.root} />
      </section>

      <section className="traversal-section">
        <h2>Recorridos del árbol</h2>

        <div className="button-group">
          <button
            className="btn-blue"
            onClick={() => handleTraversal("InOrder")}
          >
            InOrder
          </button>

          <button
            className="btn-blue"
            onClick={() => handleTraversal("PreOrder")}
          >
            PreOrder
          </button>

          <button
            className="btn-blue"
            onClick={() => handleTraversal("PostOrder")}
          >
            PostOrder
          </button>
        </div>

        {traversalName && (
          <div className="result-box">
            <h3>Recorrido {traversalName}</h3>

            <p>
              {traversal.length > 0
                ? traversal.join(" → ")
                : "El árbol está vacío."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;