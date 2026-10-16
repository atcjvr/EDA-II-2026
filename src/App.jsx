import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import menuComponents from "./components/menuComponents.jsx";
import { menuTree } from "./data/menuData.js";
import "./App.css";

function App() {
  const [selectedNode, setSelectedNode] = useState(
    menuTree.root.children[0]
  );

  const handleSelect = (node) => {
    setSelectedNode(node);
  };

  // Buscar el componente asociado al nodo
  const SelectedComponent =
    menuComponents[selectedNode.component];

  return (
    <div className="app-container">

      <Sidebar
        onSelect={handleSelect}
        selectedLink={selectedNode.link}
      />

      <main className="main-content">

        <header className="content-header">
          <h1>Challenge 09 - Árbol N-ario</h1>

          <p>
            Menú dinámico implementado con React
            y estructuras de datos
          </p>
        </header>

        {/* Mostrar componente seleccionado */}
        {SelectedComponent ? (
          <SelectedComponent />
        ) : (
          <div className="content-card">
            <h2>Componente no encontrado</h2>
          </div>
        )}

        <footer className="app-footer">
          Estructura de Datos y Algoritmos II
          <br />
          Challenge 09 - N-ary Tree
        </footer>

      </main>

    </div>
  );
}

export default App;