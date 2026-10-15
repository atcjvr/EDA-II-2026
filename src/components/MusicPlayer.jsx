import { useState } from "react";
import LinkedList from "../structures/LinkedList";
import { songs } from "../data/mockData";

// Crear la lista simplemente enlazada
const playlist = new LinkedList();

// Agregar las canciones a la lista
songs.forEach((song) => {
  playlist.append(song);
});

function MusicPlayer() {
  // Nodo que contiene la canción actual
  const [currentNode, setCurrentNode] = useState(playlist.head);

  // Mensaje informativo
  const [message, setMessage] = useState("");

  // Avanzar a la siguiente canción
  const nextSong = () => {
    if (currentNode === null) {
      setMessage("No hay canciones disponibles.");
      return;
    }

    const nextNode = playlist.getNext(currentNode);

    if (nextNode !== null) {
      setCurrentNode(nextNode);
      setMessage("");
    } else {
      setMessage("Has llegado al final de la lista.");
    }
  };

  // Reiniciar la reproducción
  const restartPlaylist = () => {
    setCurrentNode(playlist.head);
    setMessage("Lista reiniciada.");
  };

  return (
    <div className="music-player">
      <h1>Challenge 03 - Listas Enlazadas</h1>

      <h2>Reproductor de Música</h2>

      <p>Lista simplemente enlazada</p>

      <div className="current-song">
        <h3>🎵 Canción actual</h3>

        {currentNode ? (
          <>
            <h2>{currentNode.data.title}</h2>

            <p>
              Artista: {currentNode.data.artist}
            </p>

            <p>
              Duración: {currentNode.data.duration}
            </p>
          </>
        ) : (
          <p>No hay canciones disponibles.</p>
        )}
      </div>

      <div className="player-buttons">
        <button onClick={nextSong}>
          Siguiente canción →
        </button>

        <button onClick={restartPlaylist}>
          Reiniciar lista
        </button>
      </div>

      <p>{message}</p>

      <h3>Lista de reproducción</h3>

      <div className="playlist">
        {playlist.toArray().map((song) => (
          <div
            key={song.id}
            className={
              currentNode?.data.id === song.id
                ? "song active"
                : "song"
            }
          >
            <strong>{song.title}</strong>

            <span>{song.artist}</span>

            <span>{song.duration}</span>
          </div>
        ))}
      </div>

      <p>
        Total de canciones: {playlist.size()}
      </p>
    </div>
  );
}

export default MusicPlayer;