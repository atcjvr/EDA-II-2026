import { useState } from "react";
import DoublyLinkedList from "../structures/DoublyLinkedList";

function BrowserHistory() {
  const [history] = useState(() => {
    const list = new DoublyLinkedList();
    list.visit("Google");
    return list;
  });

  const [url, setUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(history.getCurrent());
  const [pages, setPages] = useState(history.toArray());

  const visitPage = () => {
    const newUrl = url.trim();

    if (!newUrl) return;

    history.visit(newUrl);
    setCurrentPage(history.getCurrent());
    setPages(history.toArray());
    setUrl("");
  };

  const goBack = () => {
    setCurrentPage(history.back());
  };

  const goForward = () => {
    setCurrentPage(history.forward());
  };

  return (
    <div className="browser-history">
      <h2>Historial de navegación</h2>
      <p>Lista doblemente enlazada</p>

      <div className="browser-controls">
        <button
          onClick={goBack}
          disabled={!history.current?.prev}
        >
          ← Atrás
        </button>

        <button
          onClick={goForward}
          disabled={!history.current?.next}
        >
          Adelante →
        </button>
      </div>

      <div className="browser-address">
        <input
          type="text"
          placeholder="Escribe una página web"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") visitPage();
          }}
        />

        <button onClick={visitPage}>Visitar</button>
      </div>

      <div className="current-song">
        <h3>🌐 Página actual</h3>
        <h2>{currentPage || "Sin páginas visitadas"}</h2>
      </div>

      <h3>Historial de páginas</h3>

      <div className="playlist">
        {pages.map((page, index) => (
          <div
            key={index}
            className={
              currentPage === page ? "song active" : "song"
            }
          >
            <strong>{page}</strong>
            {currentPage === page && <span>← ACTUAL</span>}
          </div>
        ))}
      </div>

      <p>Total de páginas: {history.size()}</p>
    </div>
  );
}

export default BrowserHistory;