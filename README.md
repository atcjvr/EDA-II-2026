# Estructura de Datos y Algoritmos II

## Challenge 05 - Colas (Queues)

### Descripción

Aplicación desarrollada en React que simula una fila de
personas esperando atención en un cajero automático.

Se implementa una estructura de datos tipo cola (Queue),
utilizando el principio FIFO (First In, First Out).

Esto significa que la primera persona en ingresar a la
fila será la primera en recibir atención.

### Tecnologías utilizadas

- JavaScript
- React
- Vite
- HTML5
- CSS3
- Node.js

### Funcionalidades

1. Registrar personas en la fila.
2. Asignar automáticamente la fecha de llegada.
3. Registrar el monto que desea retirar cada persona.
4. Mostrar las personas ordenadas por llegada.
5. Atender a la primera persona de la fila.
6. Consultar la siguiente persona sin retirarla.
7. Mostrar la cantidad de personas esperando.
8. Cargar datos ficticios para probar el funcionamiento.

### Estructura de datos

La cola se implementa mediante una clase Queue.

Métodos principales:

- enqueue(): Agregar una persona.
- dequeue(): Retirar la primera persona.
- front(): Consultar la primera persona.
- isEmpty(): Verificar si la cola está vacía.
- size(): Obtener la cantidad de elementos.
- print(): Mostrar los elementos.

### Ejecución del proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm run dev
```

### Autor

Jorge Luis Velásquez Reina
Cod 2240590

Ingeniería Informática

Estructura de Datos y Algoritmos II