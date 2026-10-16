# Challenge 10 - Grafos

## Estructura de Datos y Algoritmos II

### Descripción

Este proyecto implementa una estructura de datos de tipo grafo
utilizando JavaScript y React.

El objetivo es representar las relaciones existentes entre
ciudades y personas, permitiendo registrar nuevos elementos,
establecer conexiones y consultar información.

El grafo se implementa mediante listas de adyacencia,
facilitando la representación de las relaciones entre nodos.

## Tecnologías utilizadas

- JavaScript
- React
- Vite
- React Flow
- CSS
- Git y GitHub

## Estructura de datos

Se utiliza un grafo no dirigido compuesto por dos tipos de nodos:

**Ciudades:** representan las ciudades registradas.

**Personas:** representan personas con nombre y edad.

Las conexiones representan dos tipos de relaciones:

1. Residencia: conecta una persona con su ciudad.
2. Amistad: conecta dos personas.

## Funcionalidades

### Registrar ciudades

Permite agregar nuevas ciudades al grafo.

### Registrar personas

Permite registrar personas indicando:

- Nombre.
- Edad.
- Ciudad de residencia.

Al registrar una persona, se crea automáticamente una
conexión con su ciudad.

### Crear relaciones de amistad

Permite conectar dos personas mediante una relación
de amistad.

El sistema evita crear relaciones duplicadas y
relaciones de una persona consigo misma.

### Consultar personas por ciudad

Permite seleccionar una ciudad y visualizar las
personas que residen en ella.

### Visualización del grafo

Se utiliza React Flow para representar gráficamente
los nodos y sus conexiones.

Los elementos se identifican mediante colores:

- Azul: ciudades.
- Verde: personas.
- Líneas azules: relaciones de residencia.
- Líneas amarillas curvas: relaciones de amistad.

### Estadísticas

La aplicación muestra información actualizada sobre:

- Cantidad de ciudades.
- Cantidad de personas.
- Relaciones de residencia.
- Relaciones de amistad.

## Organización del código

La aplicación está organizada en los siguientes archivos:

- `src/App.jsx`: interfaz principal y operaciones.
- `src/App.css`: estilos de la aplicación.
- `src/structures/Graph.js`: implementación del grafo.
- `src/components/GraphView.jsx`: visualización gráfica.

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

Ejecutar el servidor:

```bash
npm run dev
```

Abrir la dirección que muestra Vite, normalmente:

http://localhost:5173/

## Conceptos aplicados

Durante el desarrollo se aplicaron conceptos de:

- Grafos.
- Nodos y aristas.
- Listas de adyacencia.
- Grafos no dirigidos.
- Relaciones entre entidades.
- Recorrido y consulta de conexiones.
- Manejo del estado en React.
- Visualización interactiva de estructuras de datos.

## Conclusión

El desarrollo del Challenge 10 permitió comprender cómo
los grafos representan relaciones entre diferentes
elementos de un sistema.

Mediante la implementación de nodos y aristas,
fue posible construir una aplicación que administra
ciudades, personas y relaciones de amistad.

La integración con React permitió desarrollar una
interfaz interactiva que facilita la comprensión
visual del funcionamiento de esta estructura de datos.


---

## Información del estudiante

**Nombre:** Jorge Luis Velásquez Reina  
**Código estudiantil:** 2240590  
**Programa académico:** Ingeniería Informática  
**Asignatura:** Estructura de Datos y Algoritmos II  
**Universidad:** Universidad Autónoma de Occidente  
**Challenge:** 10 – Grafos  
**Año:** 2026  

---