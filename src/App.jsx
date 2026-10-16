import { useState } from "react";
import Graph from "./structures/Graph";
import GraphView from "./components/GraphView";
import "./App.css";

// ======================================
// DATOS INICIALES
// ======================================

function createInitialGraph() {
  const graph = new Graph();

  // Ciudades
  graph.addNode({
    id: "city-1",
    name: "Cali",
    type: "city",
  });

  graph.addNode({
    id: "city-2",
    name: "Bogotá",
    type: "city",
  });

  graph.addNode({
    id: "city-3",
    name: "Medellín",
    type: "city",
  });

  // Personas
  graph.addNode({
    id: "person-1",
    name: "Carlos Pérez",
    age: 35,
    type: "person",
  });

  graph.addNode({
    id: "person-2",
    name: "María Rodríguez",
    age: 28,
    type: "person",
  });

  graph.addNode({
    id: "person-3",
    name: "Andrés Gómez",
    age: 42,
    type: "person",
  });

  // Relaciones de residencia
  graph.addEdge("person-1", "city-1");
  graph.addEdge("person-2", "city-1");
  graph.addEdge("person-3", "city-2");

  // Relaciones de amistad
  graph.addEdge("person-1", "person-2");
  graph.addEdge("person-1", "person-3");

  return graph;
}

// ======================================
// COMPONENTE PRINCIPAL
// ======================================

function App() {
  const [graph, setGraph] = useState(createInitialGraph);

  // Registrar ciudad
  const [cityName, setCityName] = useState("");

  // Registrar persona
  const [personName, setPersonName] = useState("");
  const [personAge, setPersonAge] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Crear amistad
  const [friend1, setFriend1] = useState("");
  const [friend2, setFriend2] = useState("");

  // Consultar ciudad
  const [searchCity, setSearchCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mensajes
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // ======================================
  // OBTENER CIUDADES Y PERSONAS
  // ======================================

  const cities = graph.nodes.filter(
    (node) => node.type === "city"
  );

  const people = graph.nodes.filter(
    (node) => node.type === "person"
  );

  // ======================================
  // ESTADÍSTICAS
  // ======================================

  const connections = new Set();

  Object.entries(graph.adjList).forEach(
    ([source, targets]) => {
      targets.forEach((target) => {
        const key = JSON.stringify(
          [source, target].sort()
        );

        connections.add(key);
      });
    }
  );

  const nodeById = new Map(
    graph.nodes.map((node) => [node.id, node])
  );

  let residenceCount = 0;
  let friendshipCount = 0;

  connections.forEach((key) => {
    const [source, target] = JSON.parse(key);

    const node1 = nodeById.get(source);
    const node2 = nodeById.get(target);

    if (!node1 || !node2) return;

    if (
      node1.type === "person" &&
      node2.type === "person"
    ) {
      friendshipCount++;
    }

    if (
      (node1.type === "city" &&
        node2.type === "person") ||
      (node1.type === "person" &&
        node2.type === "city")
    ) {
      residenceCount++;
    }
  });

  // ======================================
  // MOSTRAR MENSAJES
  // ======================================

  const showMessage = (
    text,
    type = "success"
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  // ======================================
  // ACTUALIZAR GRAFO
  // ======================================

  const updateGraph = (callback) => {
    setGraph((currentGraph) => {
      const newGraph = new Graph();

      newGraph.nodes = currentGraph.nodes.map(
        (node) => ({ ...node })
      );

      newGraph.adjList = Object.fromEntries(
        Object.entries(currentGraph.adjList).map(
          ([key, value]) => [key, [...value]]
        )
      );

      callback(newGraph);

      return newGraph;
    });
  };

  // ======================================
  // AGREGAR CIUDAD
  // ======================================

  const addCity = (e) => {
    e.preventDefault();

    const name = cityName.trim();

    if (!name) {
      showMessage(
        "Debes ingresar el nombre de la ciudad.",
        "error"
      );
      return;
    }

    const exists = cities.some(
      (city) =>
        city.name.toLowerCase() ===
        name.toLowerCase()
    );

    if (exists) {
      showMessage(
        "Esta ciudad ya está registrada.",
        "error"
      );
      return;
    }

    const id = `city-${crypto.randomUUID()}`;

    updateGraph((newGraph) => {
      newGraph.addNode({
        id,
        name,
        type: "city",
      });
    });

    setCityName("");

    showMessage(
      `La ciudad ${name} fue registrada correctamente.`
    );
  };

  // ======================================
  // AGREGAR PERSONA
  // ======================================

  const addPerson = (e) => {
    e.preventDefault();

    if (
      !personName.trim() ||
      !personAge ||
      !selectedCity
    ) {
      showMessage(
        "Completa todos los datos de la persona.",
        "error"
      );
      return;
    }

    const age = Number(personAge);

    if (
      !Number.isInteger(age) ||
      age <= 0 ||
      age > 120
    ) {
      showMessage(
        "Ingresa una edad válida.",
        "error"
      );
      return;
    }

    const name = personName.trim();
    const cityId = selectedCity;

    const id = `person-${crypto.randomUUID()}`;

    updateGraph((newGraph) => {
      newGraph.addNode({
        id,
        name,
        age,
        type: "person",
      });

      newGraph.addEdge(id, cityId);
    });

    setPersonName("");
    setPersonAge("");
    setSelectedCity("");

    setHasSearched(false);
    setSearchResults([]);

    showMessage(
      `${name} fue registrado correctamente.`
    );
  };

  // ======================================
  // CREAR AMISTAD
  // ======================================

  const addFriendship = (e) => {
    e.preventDefault();

    if (!friend1 || !friend2) {
      showMessage(
        "Selecciona las dos personas.",
        "error"
      );
      return;
    }

    if (friend1 === friend2) {
      showMessage(
        "Una persona no puede ser amiga de sí misma.",
        "error"
      );
      return;
    }

    const alreadyFriends =
      graph.adjList[friend1]?.includes(friend2);

    if (alreadyFriends) {
      showMessage(
        "Estas personas ya tienen una relación de amistad.",
        "error"
      );
      return;
    }

    const person1 = people.find(
      (person) => person.id === friend1
    );

    const person2 = people.find(
      (person) => person.id === friend2
    );

    updateGraph((newGraph) => {
      newGraph.addEdge(friend1, friend2);
    });

    setFriend1("");
    setFriend2("");

    showMessage(
      `Amistad creada entre ${person1.name} y ${person2.name}.`
    );
  };

  // ======================================
  // CONSULTAR PERSONAS POR CIUDAD
  // ======================================

  const searchPeople = (e) => {
    e.preventDefault();

    if (!searchCity) {
      showMessage(
        "Selecciona una ciudad para consultar.",
        "error"
      );
      return;
    }

    const results =
      graph.getPeopleByCity(searchCity);

    setSearchResults(results);
    setHasSearched(true);

    showMessage(
      `Consulta realizada: ${results.length} persona(s) encontrada(s).`
    );
  };

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

        <h1>Challenge 10 - Grafos</h1>

        <p className="subtitle">
          Representación de ciudades, personas
          y relaciones mediante grafos
        </p>
      </header>

      {/* ESTADÍSTICAS */}

      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-icon">🏙️</span>
          <span className="stat-number">
            {cities.length}
          </span>
          <span className="stat-label">
            Ciudades
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <span className="stat-number">
            {people.length}
          </span>
          <span className="stat-label">
            Personas
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏠</span>
          <span className="stat-number">
            {residenceCount}
          </span>
          <span className="stat-label">
            Residencias
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🤝</span>
          <span className="stat-number">
            {friendshipCount}
          </span>
          <span className="stat-label">
            Amistades
          </span>
        </div>

      </div>

      {/* FORMULARIOS */}

      <div className="forms-grid">

        {/* REGISTRAR CIUDAD */}

        <section className="form-card">

          <div className="card-heading">
            <span className="card-icon">🏙️</span>
            <h2>Registrar ciudad</h2>
          </div>

          <p className="card-description">
            Agrega una nueva ciudad al grafo.
          </p>

          <form
            onSubmit={addCity}
            className="card-form"
          >

            <label htmlFor="cityName">
              Nombre de la ciudad
            </label>

            <input
              id="cityName"
              type="text"
              placeholder="Ej. Barranquilla"
              value={cityName}
              onChange={(e) =>
                setCityName(e.target.value)
              }
            />

            <button
              type="submit"
              className="btn-green"
            >
              + Agregar ciudad
            </button>

          </form>

        </section>

        {/* REGISTRAR PERSONA */}

        <section className="form-card">

          <div className="card-heading">
            <span className="card-icon">👤</span>
            <h2>Registrar persona</h2>
          </div>

          <p className="card-description">
            Registra una persona y su ciudad
            de residencia.
          </p>

          <form
            onSubmit={addPerson}
            className="card-form"
          >

            <label htmlFor="personName">
              Nombre completo
            </label>

            <input
              id="personName"
              type="text"
              placeholder="Ej. Juan Martínez"
              value={personName}
              onChange={(e) =>
                setPersonName(e.target.value)
              }
            />

            <div className="form-two-columns">

              <div className="field-group">

                <label htmlFor="personAge">
                  Edad
                </label>

                <input
                  id="personAge"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Edad"
                  value={personAge}
                  onChange={(e) =>
                    setPersonAge(e.target.value)
                  }
                />

              </div>

              <div className="field-group">

                <label htmlFor="selectedCity">
                  Ciudad
                </label>

                <select
                  id="selectedCity"
                  value={selectedCity}
                  onChange={(e) =>
                    setSelectedCity(e.target.value)
                  }
                >

                  <option value="">
                    Seleccionar ciudad
                  </option>

                  {cities.map((city) => (
                    <option
                      key={city.id}
                      value={city.id}
                    >
                      {city.name}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <button
              type="submit"
              className="btn-green"
            >
              + Agregar persona
            </button>

          </form>

        </section>

        {/* CREAR AMISTAD */}

        <section className="form-card">

          <div className="card-heading">
            <span className="card-icon">🤝</span>
            <h2>Crear relación de amistad</h2>
          </div>

          <p className="card-description">
            Conecta dos personas mediante
            una relación de amistad.
          </p>

          <form
            onSubmit={addFriendship}
            className="card-form"
          >

            <label htmlFor="friend1">
              Primera persona
            </label>

            <select
              id="friend1"
              value={friend1}
              onChange={(e) =>
                setFriend1(e.target.value)
              }
            >

              <option value="">
                Seleccionar persona
              </option>

              {people.map((person) => (
                <option
                  key={person.id}
                  value={person.id}
                >
                  {person.name}
                </option>
              ))}

            </select>

            <label htmlFor="friend2">
              Segunda persona
            </label>

            <select
              id="friend2"
              value={friend2}
              onChange={(e) =>
                setFriend2(e.target.value)
              }
            >

              <option value="">
                Seleccionar persona
              </option>

              {people.map((person) => (
                <option
                  key={person.id}
                  value={person.id}
                >
                  {person.name}
                </option>
              ))}

            </select>

            <button
              type="submit"
              className="btn-yellow"
            >
              🤝 Crear amistad
            </button>

          </form>

        </section>

        {/* CONSULTAR PERSONAS */}

        <section className="form-card">

          <div className="card-heading">
            <span className="card-icon">🔎</span>
            <h2>Consultar personas por ciudad</h2>
          </div>

          <p className="card-description">
            Consulta las personas que residen
            en una ciudad determinada.
          </p>

          <form
            onSubmit={searchPeople}
            className="card-form"
          >

            <label htmlFor="searchCity">
              Ciudad a consultar
            </label>

            <select
              id="searchCity"
              value={searchCity}
              onChange={(e) => {
                setSearchCity(e.target.value);
                setHasSearched(false);
                setSearchResults([]);
              }}
            >

              <option value="">
                Seleccionar ciudad
              </option>

              {cities.map((city) => (
                <option
                  key={city.id}
                  value={city.id}
                >
                  {city.name}
                </option>
              ))}

            </select>

            <button
              type="submit"
              className="btn-blue"
            >
              🔎 Consultar personas
            </button>

          </form>

          {/* RESULTADOS */}

          {hasSearched && (
            <div className="search-results">

              <h3>
                Resultados de la consulta
              </h3>

              {searchResults.length === 0 ? (

                <p className="empty-results">
                  No se encontraron personas
                  en esta ciudad.
                </p>

              ) : (

                <div className="results-list">

                  {searchResults.map((person) => (

                    <div
                      className="result-person"
                      key={person.id}
                    >

                      <span>👤</span>

                      <div>
                        <strong>
                          {person.name}
                        </strong>

                        <small>
                          {person.age} años
                        </small>
                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>
          )}

        </section>

      </div>

      {/* MENSAJES */}

      {message && (

        <div
          className={`status-message ${messageType}`}
          role="status"
        >

          <span>
            {messageType === "success"
              ? "✓"
              : "⚠"}
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

      {/* VISUALIZACIÓN DEL GRAFO */}

      <section className="graph-section">

        <div className="graph-header">

          <h2>Visualización del grafo</h2>

          <p>
            Representación interactiva de
            ciudades, personas y conexiones.
          </p>

        </div>

        {/* LEYENDA */}

        <div className="graph-legend">

          <div className="legend-item">
            <span className="legend-dot city-dot" />
            <span>Ciudades</span>
          </div>

          <div className="legend-item">
            <span className="legend-dot person-dot" />
            <span>Personas</span>
          </div>

          <div className="legend-item">
            <span className="legend-line residence-line" />
            <span>Residencia</span>
          </div>

          <div className="legend-item">
            <span className="legend-line friendship-line" />
            <span>Amistad</span>
          </div>

        </div>

        {/* ESTADO DEL GRAFO */}

        <div className="graph-summary">

          <span>
            Nodos: <strong>{graph.nodes.length}</strong>
          </span>

          <span>
            Conexiones: <strong>{connections.size}</strong>
          </span>

        </div>

        {/* GRAFO ORIGINAL */}

        <GraphView graph={graph} />

      </section>

      {/* PIE DE PÁGINA */}

      <footer className="app-footer">
        Challenge 10 · Grafos ·
        Estructura de Datos y Algoritmos II
      </footer>

    </div>
  );
}

export default App;