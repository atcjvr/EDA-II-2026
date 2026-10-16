import { useState } from "react";
import SmartSearch from "./structures/SmartSearch";
import "./App.css";

// ======================================
// DATOS INICIALES
// ======================================

function createInitialSearchEngine() {
  const engine = new SmartSearch();

  engine.insert("air max", 90);
  engine.insert("air force", 95);
  engine.insert("air jordan", 85);
  engine.insert("adidas boost", 80);
  engine.insert("adidas superstar", 92);
  engine.insert("nike revolution", 75);
  engine.insert("nike pegasus", 88);
  engine.insert("nike invincible", 97);

  return engine;
}

// ======================================
// COMPONENTE PRINCIPAL
// ======================================

function App() {
  const [engine, setEngine] = useState(
    createInitialSearchEngine
  );

  const [productName, setProductName] = useState("");
  const [popularity, setPopularity] = useState("");

  const [prefix, setPrefix] = useState("");
  const [topK, setTopK] = useState(3);

  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedPrefix, setSearchedPrefix] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const products = engine.getAllProducts();

  // ======================================
  // MENSAJES
  // ======================================

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  // ======================================
  // REGISTRAR PRODUCTO
  // ======================================

  const addProduct = (event) => {
    event.preventDefault();

    const name = productName.trim();
    const score = Number(popularity);

    if (!name || popularity === "") {
      showMessage(
        "Debes ingresar el nombre y la popularidad.",
        "error"
      );
      return;
    }

    if (
      !Number.isFinite(score) ||
      score < 0 ||
      score > 100
    ) {
      showMessage(
        "La popularidad debe estar entre 0 y 100.",
        "error"
      );
      return;
    }

    const exists = engine.search(name);

    // Crear una nueva instancia para actualizar React
    const newEngine = new SmartSearch();

    products.forEach((product) => {
      newEngine.insert(
        product.name,
        product.popularity
      );
    });

    newEngine.insert(name, score);

    setEngine(newEngine);

    setProductName("");
    setPopularity("");

    // Limpiar resultados anteriores
    setResults([]);
    setHasSearched(false);

    showMessage(
      exists
        ? `La popularidad de "${name}" fue actualizada.`
        : `El producto "${name}" fue registrado correctamente.`
    );
  };

  // ======================================
  // BUSCAR TOP K
  // ======================================

  const searchProducts = (event) => {
    event.preventDefault();

    const k = Number(topK);

    if (
      !Number.isInteger(k) ||
      k <= 0
    ) {
      showMessage(
        "Debes ingresar una cantidad válida de resultados.",
        "error"
      );
      return;
    }

    const found = engine.searchTopK(prefix, k);

    setResults(found);
    setHasSearched(true);
    setSearchedPrefix(prefix.trim());

    showMessage(
      `Búsqueda realizada: ${found.length} producto(s) encontrado(s).`
    );
  };

  // ======================================
  // ESTADÍSTICAS
  // ======================================

  const totalProducts = engine.size();

  const averagePopularity =
    totalProducts > 0
      ? (
          products.reduce(
            (sum, product) =>
              sum + product.popularity,
            0
          ) / totalProducts
        ).toFixed(1)
      : 0;

  const mostPopular =
    products.length > 0
      ? products.reduce((best, product) =>
          product.popularity > best.popularity
            ? product
            : best
        )
      : null;

  // ======================================
  // INTERFAZ
  // ======================================

  return (
    <div className="app-container">

      {/* ENCABEZADO */}

      <header className="app-header">
        <span className="challenge-label">
          ESTRUCTURA DE DATOS Y ALGORITMOS II
        </span>

        <h1>Challenge 11 - Tries & Heaps</h1>

        <p className="subtitle">
          Buscador inteligente de productos
          con resultados ordenados por popularidad.
        </p>
      </header>

      {/* ESTADÍSTICAS */}

      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <span className="stat-number">
            {totalProducts}
          </span>
          <span className="stat-label">
            Productos registrados
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <span className="stat-number">
            {averagePopularity}
          </span>
          <span className="stat-label">
            Popularidad promedio
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <span className="stat-number">
            {mostPopular?.popularity ?? 0}
          </span>
          <span className="stat-label">
            Mayor popularidad
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🔎</span>
          <span className="stat-number">
            {results.length}
          </span>
          <span className="stat-label">
            Resultados de búsqueda
          </span>
        </div>

      </div>

      {/* FORMULARIOS */}

      <div className="forms-grid">

        {/* REGISTRAR PRODUCTO */}

        <section className="form-card">

          <div className="card-heading">
            <span className="card-icon">📦</span>
            <h2>Registrar producto</h2>
          </div>

          <p className="card-description">
            Agrega un producto al Trie indicando
            su nombre y popularidad.
          </p>

          <form
            onSubmit={addProduct}
            className="card-form"
          >

            <label htmlFor="productName">
              Nombre del producto
            </label>

            <input
              id="productName"
              type="text"
              placeholder="Ej. Puma running"
              value={productName}
              onChange={(event) =>
                setProductName(event.target.value)
              }
            />

            <label htmlFor="popularity">
              Popularidad (0 a 100)
            </label>

            <input
              id="popularity"
              type="number"
              min="0"
              max="100"
              placeholder="Ej. 89"
              value={popularity}
              onChange={(event) =>
                setPopularity(event.target.value)
              }
            />

            <button
              type="submit"
              className="btn-green"
            >
              + Registrar producto
            </button>

          </form>

        </section>

        {/* BUSCADOR */}

        <section className="form-card">

          <div className="card-heading">
            <span className="card-icon">🔎</span>
            <h2>Buscador inteligente</h2>
          </div>

          <p className="card-description">
            Busca productos por prefijo y selecciona
            cuántos resultados populares deseas obtener.
          </p>

          <form
            onSubmit={searchProducts}
            className="card-form"
          >

            <label htmlFor="prefix">
              Prefijo de búsqueda
            </label>

            <input
              id="prefix"
              type="text"
              placeholder="Ej. air, adidas, nike"
              value={prefix}
              onChange={(event) =>
                setPrefix(event.target.value)
              }
            />

            <label htmlFor="topK">
              Cantidad de resultados (Top K)
            </label>

            <input
              id="topK"
              type="number"
              min="1"
              step="1"
              value={topK}
              onChange={(event) =>
                setTopK(event.target.value)
              }
            />

            <button
              type="submit"
              className="btn-blue"
            >
              🔎 Buscar Top K
            </button>

          </form>

        </section>

      </div>

      {/* MENSAJES */}

      {message && (
        <div
          className={`status-message ${messageType}`}
          role="status"
        >
          <span>
            {messageType === "success" ? "✓" : "⚠"}
          </span>

          <span>{message}</span>

          <button
            type="button"
            className="close-message"
            onClick={() => setMessage("")}
            aria-label="Cerrar mensaje"
          >
            ×
          </button>
        </div>
      )}

      {/* RESULTADOS */}

      <section className="results-section">

        <div className="section-heading">
          <h2>Resultados de búsqueda</h2>

          <p>
            Productos seleccionados mediante Trie
            y Min Heap.
          </p>
        </div>

        {!hasSearched ? (
          <div className="empty-state">
            <span>🔎</span>
            <h3>Realiza una búsqueda</h3>
            <p>
              Escribe un prefijo y selecciona
              cuántos productos deseas consultar.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="empty-state">
            <span>📭</span>
            <h3>Sin resultados</h3>
            <p>
              No encontramos productos con el prefijo
              {" "}
              <strong>
                {searchedPrefix || "(vacío)"}
              </strong>.
            </p>
          </div>
        ) : (
          <div className="results-list">

            {results.map((product, index) => (
              <div
                className="result-card"
                key={product.name}
              >

                <div className="result-position">
                  #{index + 1}
                </div>

                <div className="result-content">

                  <div className="result-header">
                    <h3>{product.name}</h3>

                    <span className="popularity-value">
                      {product.popularity}/100
                    </span>
                  </div>

                  <div className="popularity-track">
                    <div
                      className="popularity-fill"
                      style={{
                        width: `${Math.min(
                          product.popularity,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* PRODUCTOS REGISTRADOS */}

      <section className="products-section">

        <div className="section-heading">
          <h2>Productos registrados en el Trie</h2>

          <p>
            Catálogo completo de productos almacenados.
          </p>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">

            <thead>
              <tr>
                <th>Producto</th>
                <th>Popularidad</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.name}>
                  <td>{product.name}</td>
                  <td>
                    <span className="table-popularity">
                      {product.popularity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </section>

      {/* PIE DE PÁGINA */}

      <footer className="app-footer">
        Challenge 11 · Tries & Heaps ·
        Estructura de Datos y Algoritmos II
      </footer>

    </div>
  );
}

export default App;