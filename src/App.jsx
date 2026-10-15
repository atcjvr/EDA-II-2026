import { useState } from "react";
import Queue from "./structures/Queue";
import { mockPeople } from "./data/mockPeople";
import "./App.css";

// Crear la cola inicial con datos ficticios
function createInitialQueue() {
  const queue = new Queue();

  mockPeople.forEach((person) => {
    queue.enqueue(person);
  });

  return queue;
}

// Formatear valores en pesos colombianos
function formatMoney(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Formatear fecha de llegada
function formatDate(date) {
  return new Date(date).toLocaleString("es-CO", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

function App() {
  // Estado de la cola
  const [queue, setQueue] = useState(createInitialQueue);

  // Datos del formulario
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Mensajes de la aplicación
  const [message, setMessage] = useState("");

  // Obtener personas de la cola
  const people = queue.print();

  // Agregar persona
  const handleAddPerson = (event) => {
    event.preventDefault();

    if (!name.trim() || !amount || Number(amount) <= 0) {
      setMessage("Ingrese un nombre y un monto válido.");
      return;
    }

    const newPerson = {
      id: crypto.randomUUID(),
      name: name.trim(),
      withdrawalAmount: Number(amount),
      arrivalDate: new Date().toISOString(),
    };

    const newQueue = new Queue();

    queue.print().forEach((person) => {
      newQueue.enqueue(person);
    });

    newQueue.enqueue(newPerson);

    setQueue(newQueue);

    setName("");
    setAmount("");

    setMessage(`${newPerson.name} fue agregado a la fila.`);
  };

  // Atender primera persona
  const handleAttend = () => {
    if (queue.isEmpty()) {
      setMessage("No hay personas esperando.");
      return;
    }

    const newQueue = new Queue();

    queue.print().forEach((person) => {
      newQueue.enqueue(person);
    });

    const attended = newQueue.dequeue();

    setQueue(newQueue);

    setMessage(
      `Persona atendida: ${attended.name} - Retiro: ${formatMoney(
        attended.withdrawalAmount
      )}`
    );
  };

  // Consultar siguiente persona
  const handleNext = () => {
    const next = queue.front();

    if (!next) {
      setMessage("La fila está vacía.");
      return;
    }

    setMessage(`Siguiente turno: ${next.name}`);
  };

  return (
    <main className="app-container">
      <h1>Challenge 05 - Colas</h1>

      <p className="subtitle">
        Simulación de cajero automático - FIFO
      </p>

      <section className="form-section">
        <h2>Registrar persona</h2>

        <form onSubmit={handleAddPerson}>
          <div className="form-fields">
            <input
              type="text"
              placeholder="Nombre de la persona"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Monto de retiro ($)"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              min="1"
              step="1"
              required
            />
          </div>

          <div className="buttons">
            <button type="submit" className="btn-add">
              Agregar a la fila
            </button>

            <button
              type="button"
              className="btn-remove"
              onClick={handleAttend}
            >
              Atender siguiente
            </button>

            <button
              type="button"
              className="btn-next"
              onClick={handleNext}
            >
              Consultar siguiente
            </button>
          </div>
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="queue-section">
        <h2>Estado del cajero</h2>

        <p className="counter">
          Personas esperando: <strong>{queue.size()}</strong>
        </p>

        {queue.front() && (
          <p className="next-person">
            Siguiente persona: <strong>{queue.front().name}</strong>
          </p>
        )}

        <h2>Fila de espera</h2>

        {people.length === 0 ? (
          <p className="empty-message">
            No hay personas esperando en el cajero.
          </p>
        ) : (
          <div className="queue-list">
            {people.map((person, index) => (
              <div
                key={person.id}
                className={`queue-item ${
                  index === 0 ? "first-person" : ""
                }`}
              >
                <span className="position">
                  Turno {index + 1}
                </span>

                <div className="person-info">
                  <strong>{person.name}</strong>

                  <span>
                    Retiro: {formatMoney(person.withdrawalAmount)}
                  </span>

                  <span>
                    Llegada: {formatDate(person.arrivalDate)}
                  </span>
                </div>

                {index === 0 && (
                  <span className="badge">
                    SIGUIENTE TURNO
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;