# Challenge 11 – Tries & Heaps

## Estructura de Datos y Algoritmos II

### Descripción

Este proyecto consiste en el desarrollo de un buscador inteligente de productos utilizando las estructuras de datos Trie y Min Heap, implementadas en JavaScript e integradas en una interfaz desarrollada con React.

El objetivo es permitir el registro de productos, realizar búsquedas por prefijo y mostrar los K productos con mayor popularidad.

## Tecnologías utilizadas

- JavaScript
- React
- Vite
- CSS
- Node.js
- Git y GitHub

## Estructuras de datos implementadas

### Trie

El Trie es una estructura de datos basada en un árbol que permite almacenar palabras mediante sus caracteres.

En este proyecto se utiliza para registrar productos y realizar búsquedas por prefijo.

**Operaciones implementadas:**

- `insert()`: registra productos.
- `search()`: realiza búsquedas exactas.
- `searchByPrefix()`: busca productos por prefijo.
- `getAllProducts()`: obtiene todos los productos.
- `size()`: consulta la cantidad de productos.

### Min Heap

El Min Heap es una estructura basada en un árbol binario completo, donde cada nodo padre tiene una prioridad menor o igual que sus hijos.

En este proyecto se utiliza para seleccionar los K productos más populares.

**Operaciones implementadas:**

- `push()`: inserta elementos.
- `pop()`: elimina el elemento mínimo.
- `peek()`: consulta el elemento mínimo.
- `heapify()`: organiza los elementos.
- `percolateUp()`: reorganiza hacia arriba.
- `percolateDown()`: reorganiza hacia abajo.

## Funcionamiento del buscador inteligente

La aplicación combina ambas estructuras mediante la clase `SmartSearch`.

El proceso funciona de la siguiente manera:

1. El usuario registra productos con un nombre y un valor de popularidad.
2. Los productos se almacenan en un Trie.
3. El usuario introduce un prefijo de búsqueda.
4. El Trie encuentra los productos que coinciden con ese prefijo.
5. El Min Heap selecciona los K productos con mayor popularidad.
6. Los resultados se presentan ordenados de mayor a menor popularidad.

### Ejemplo

Productos registrados:

| Producto | Popularidad |
|---|---:|
| Air Max | 90 |
| Air Force | 95 |
| Air Jordan | 85 |
| Adidas Boost | 80 |

Búsqueda:

**Prefijo:** `air`  
**K:** `2`

Resultados:

1. Air Force – 95
2. Air Max – 90

## Funcionalidades

- Registrar nuevos productos.
- Actualizar la popularidad de productos existentes.
- Buscar productos mediante prefijos.
- Seleccionar la cantidad de resultados (Top K).
- Mostrar resultados ordenados por popularidad.
- Visualizar barras de popularidad.
- Consultar el catálogo de productos registrados.
- Mostrar estadísticas dinámicas.

## Organización del proyecto

```text
src/
├── structures/
│   ├── Trie.js
│   ├── MinHeap.js
│   └── SmartSearch.js
├── testTrie.js
├── testHeap.js
├── testSmartSearch.js
├── App.jsx
├── App.css
└── main.jsx
```

## Pruebas realizadas

Se realizaron pruebas individuales para verificar el funcionamiento de cada estructura.

**Trie:** inserción, búsqueda exacta, búsqueda por prefijo y conteo de productos.

**Min Heap:** inserción, consulta del mínimo, extracción y reorganización.

**SmartSearch:** búsqueda de los K productos más populares, prefijos inexistentes y validación de valores de K.

También se verificó el funcionamiento de la interfaz React.

## Ejecución del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/atcjvr/EDA-II-2026.git
```

Ingresar al directorio:

```bash
cd EDA-II-2026
```

Instalar dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm run dev
```

Abrir la dirección indicada por Vite, normalmente:

http://localhost:5173/

Para ejecutar las pruebas:

```bash
node src/testTrie.js
node src/testHeap.js
node src/testSmartSearch.js
```

**Nota:** para consultar esta implementación se debe seleccionar la rama `challenge-11`.

## Conclusiones

El desarrollo del Challenge 11 permitió comprender cómo diferentes estructuras de datos pueden trabajar conjuntamente para resolver un problema.

El Trie facilita la búsqueda de productos mediante prefijos, mientras que el Min Heap permite seleccionar los resultados más populares.

La integración de ambas estructuras con React permitió desarrollar una aplicación interactiva, aplicando los conocimientos adquiridos durante el curso de Estructura de Datos y Algoritmos II.

---

## Información del estudiante

**Nombre:** Jorge Luis Velásquez Reina  
**Código estudiantil:** 2240590  
**Programa académico:** Ingeniería Informática  
**Universidad:** Universidad Autónoma de Occidente  
**Asignatura:** Estructura de Datos y Algoritmos II  
**Challenge:** 11 – Tries & Heaps  
**Año:** 2026

---