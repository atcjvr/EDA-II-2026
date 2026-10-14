import { useState } from "react";
import Stack from "./structures/Stack";
import "./App.css";

// ========================================
// CHALLENGE 04 - PILAS
// Estructura de Datos y Algoritmos II
// ========================================

// Datos ficticios para probar la pila
const librosPrueba = [
  {
    nombre: "El misterio del océano",
    isbn: "9780000000001",
    autor: "Carlos Ramírez",
    editorial: "Editorial Horizonte",
  },
  {
    nombre: "Viaje a las estrellas",
    isbn: "9780000000002",
    autor: "Laura Martínez",
    editorial: "Ediciones Universo",
  },
  {
    nombre: "El último algoritmo",
    isbn: "9780000000003",
    autor: "Andrés Gómez",
    editorial: "Editorial Tecnológica",
  },
  {
    nombre: "Secretos de la montaña",
    isbn: "9780000000004",
    autor: "Patricia Torres",
    editorial: "Ediciones Andinas",
  },
  {
    nombre: "Inteligencia del futuro",
    isbn: "9780000000005",
    autor: "Daniel Herrera",
    editorial: "Editorial Innovación",
  },
];

// Crear una pila con libros de prueba
function crearPilaInicial() {
  const nuevaPila = new Stack();

  librosPrueba.forEach((libro) => {
    nuevaPila.push({ ...libro });
  });

  return nuevaPila;
}

function App() {
  // ========================================
  // ESTADOS DE REACT
  // ========================================

  // Mantener una única pila durante la vida del componente
  const [pila] = useState(crearPilaInicial);

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");

  // Libros que se muestran en pantalla
  const [libros, setLibros] = useState(() => pila.print());

  // Mensajes de las operaciones
  const [mensaje, setMensaje] = useState(
    "Pila inicializada con 5 libros de prueba."
  );

  // ========================================
  // ACTUALIZAR LA VISTA
  // ========================================

  function actualizarVista() {
    setLibros(pila.print());
  }

  // ========================================
  // PUSH - AGREGAR LIBRO
  // ========================================

  function agregarLibro() {
    // Verificar que todos los campos estén completos
    if (
      nombre.trim() === "" ||
      isbn.trim() === "" ||
      autor.trim() === "" ||
      editorial.trim() === ""
    ) {
      setMensaje("Debes completar todos los campos.");
      return;
    }

    // Crear objeto libro
    const nuevoLibro = {
      nombre: nombre.trim(),
      isbn: isbn.trim(),
      autor: autor.trim(),
      editorial: editorial.trim(),
    };

    // Agregar libro a la pila
    pila.push(nuevoLibro);

    // Actualizar pantalla
    actualizarVista();

    // Limpiar formulario
    setNombre("");
    setIsbn("");
    setAutor("");
    setEditorial("");

    setMensaje(`Libro agregado: ${nuevoLibro.nombre}`);
  }

  // ========================================
  // POP - RETIRAR LIBRO
  // ========================================

  function retirarLibro() {
    if (pila.isEmpty()) {
      setMensaje("No se puede retirar. La pila está vacía.");
      return;
    }

    const libroRetirado = pila.pop();

    actualizarVista();

    setMensaje(`Libro retirado: ${libroRetirado.nombre}`);
  }

  // ========================================
  // PEEK - CONSULTAR CIMA
  // ========================================

  function consultarCima() {
    if (pila.isEmpty()) {
      setMensaje("La pila está vacía.");
      return;
    }

    const libroCima = pila.peek();

    setMensaje(`Libro en la cima: ${libroCima.nombre}`);
  }

  // ========================================
  // ISEMPTY - VERIFICAR PILA
  // ========================================

  function verificarVacia() {
    if (pila.isEmpty()) {
      setMensaje("La pila está vacía.");
    } else {
      setMensaje(`La pila contiene ${pila.size()} libros.`);
    }
  }

  // ========================================
  // VACIAR PILA
  // ========================================

  function vaciarPila() {
    if (pila.isEmpty()) {
      setMensaje("La pila ya está vacía.");
      return;
    }

    while (!pila.isEmpty()) {
      pila.pop();
    }

    actualizarVista();

    setMensaje("Se retiraron todos los libros de la pila.");
  }

  // ========================================
  // INTERFAZ GRÁFICA
  // ========================================

  return (
    <div className="contenedor">

      {/* ENCABEZADO */}

      <h1>Challenge 04 - Pilas</h1>

      <p>
        Estructura de datos LIFO (Last In, First Out)
      </p>

      {/* FORMULARIO */}

      <h2>Agregar libro</h2>

      <div className="formulario">

        <input
          type="text"
          placeholder="Nombre del libro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />

        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Editorial"
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
        />

      </div>

      {/* BOTONES */}

      <div className="botones">

        <button onClick={agregarLibro}>
          Agregar (Push)
        </button>

        <button onClick={retirarLibro}>
          Retirar (Pop)
        </button>

        <button onClick={consultarCima}>
          Consultar (Peek)
        </button>

        <button onClick={verificarVacia}>
          ¿Está vacía?
        </button>

        <button onClick={vaciarPila}>
          Vaciar pila
        </button>

      </div>

      {/* MENSAJE DE OPERACIONES */}

      <p>{mensaje}</p>

      {/* CONTENIDO DE LA PILA */}

      <h2>Contenido de la pila</h2>

      <p>Cantidad de libros: {libros.length}</p>

      <div className="pila">

        {libros.length === 0 ? (

          <p>La pila está vacía.</p>

        ) : (

          libros.map((libro, index) => (

            <div className="libro" key={index}>

              <div className="datos-libro">

                <strong>
                  {libro.nombre}
                </strong>

                <span>
                  ISBN: {libro.isbn}
                </span>

                <span>
                  Autor: {libro.autor}
                </span>

                <span>
                  Editorial: {libro.editorial}
                </span>

              </div>

              {index === 0 && (
                <strong>← CIMA</strong>
              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default App;