# Challenge 09 - Árbol N-ario

## Estructura de Datos y Algoritmos II

### Descripción

Este proyecto implementa un árbol N-ario (N-ary Tree)
utilizando JavaScript y React.

El objetivo es construir un menú lateral dinámico
con diferentes opciones y submenús organizados
mediante una estructura jerárquica.

Cada nodo contiene un título, un enlace,
un componente asociado y una lista de nodos hijos.

## Tecnologías utilizadas

- JavaScript
- React
- Vite
- HTML
- CSS
- Node.js

## Estructura de datos

Se implementaron dos clases principales:

### NaryNode

Representa un nodo del árbol.

Propiedades:
- title
- link
- component
- children

### NaryTree

Representa el árbol N-ario y permite realizar
los siguientes recorridos:

- DFS (Depth-First Search)
- BFS (Breadth-First Search)

## Funcionalidades

- Menú lateral dinámico.
- Menús y submenús desplegables.
- Navegación entre componentes React.
- Identificación de la opción seleccionada.
- Recorridos DFS y BFS.
- Diseño adaptable a diferentes pantallas.

## Estructura del proyecto

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── MenuPage.jsx
│   └── menuComponents.jsx
├── data/
│   └── menuData.js
├── structures/
│   └── NaryTree.js
├── testNaryTree.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Ejecución

Instalar dependencias:

npm install

Iniciar la aplicación:

npm run dev

Abrir en el navegador:

http://localhost:5173/

## Pruebas

Ejecutar:

node src/testNaryTree.js

Se verifican los recorridos DFS y BFS,
la raíz del árbol y los menús principales.

## Autor

Jorge Luis Velásquez Reina
Cod. 2240590

Ingeniería Informática

Estructura de Datos y Algoritmos II