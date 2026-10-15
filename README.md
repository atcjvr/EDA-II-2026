# Challenge 03 - Listas Enlazadas

## Estructura de Datos y Algoritmos II

Proyecto desarrollado en JavaScript y React para implementar
y visualizar el funcionamiento de listas simplemente enlazadas
y listas doblemente enlazadas.

## Objetivo

Implementar estructuras de datos lineales mediante JavaScript,
aplicando sus operaciones en dos ejemplos prácticos:

1. Reproductor de música utilizando una lista simplemente enlazada.
2. Historial de navegación utilizando una lista doblemente enlazada.

## Tecnologías utilizadas

- JavaScript
- React
- Vite
- HTML5
- CSS3
- Node.js
- Git y GitHub
- Visual Studio Code

## 1. Lista simplemente enlazada

Se implementó un reproductor de música que permite recorrer
una lista de canciones mediante referencias entre nodos.

Cada nodo contiene:

- Información de la canción.
- Referencia al siguiente nodo (`next`).

### Funcionalidades

- Mostrar la lista de canciones.
- Consultar la canción actual.
- Avanzar a la siguiente canción.
- Reiniciar la lista de reproducción.
- Mostrar la cantidad de canciones.

### Archivo principal

`src/structures/LinkedList.js`

## 2. Lista doblemente enlazada

Se desarrolló un simulador de historial de navegación web.

Cada nodo contiene:

- Información de la página.
- Referencia al nodo anterior (`prev`).
- Referencia al nodo siguiente (`next`).

### Funcionalidades

- Visitar nuevas páginas.
- Retroceder a una página anterior.
- Avanzar a una página siguiente.
- Consultar la página actual.
- Mostrar el historial completo.
- Eliminar el historial hacia adelante cuando se visita
  una nueva página después de retroceder.

### Archivo principal

`src/structures/DoublyLinkedList.js`

## Estructura del proyecto

```text
EDA-II-2026/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── MusicPlayer.jsx
│   │   └── BrowserHistory.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── structures/
│   │   ├── Stack.js
│   │   ├── LinkedList.js
│   │   └── DoublyLinkedList.js
│   │
│   ├── testDoublyLinkedList.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone -b challenge-03 https://github.com/atcjvr/EDA-II-2026.git
```

Ingresar al proyecto:

```bash
cd EDA-II-2026
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm run dev
```

Abrir en el navegador la dirección local indicada por Vite,
normalmente:

http://localhost:5173/

## Pruebas

Para verificar el funcionamiento de la lista doblemente
enlazada, ejecutar:

```bash
node src/testDoublyLinkedList.js
```

## Conclusión

Este proyecto permitió aplicar las listas enlazadas en
situaciones prácticas mediante JavaScript y React.

La lista simplemente enlazada permite recorrer canciones
en una dirección, mientras que la lista doblemente enlazada
permite navegar hacia adelante y hacia atrás.

Ambas implementaciones permiten comprender cómo los nodos
se relacionan mediante referencias y cómo estas estructuras
pueden utilizarse en aplicaciones interactivas.

## Repositorio

https://github.com/atcjvr/EDA-II-2026

Rama: `challenge-03`