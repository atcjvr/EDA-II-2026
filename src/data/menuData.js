// Challenge 09 - Datos del menú N-ario

import { NaryNode, NaryTree } from "../structures/NaryTree.js";

// Crear nodo raíz
const root = new NaryNode(
  "Menú Principal",
  "/",
  "Home"
);

// Crear opciones principales
const inicio = new NaryNode(
  "Inicio",
  "/inicio",
  "Home"
);

const usuarios = new NaryNode(
  "Usuarios",
  "/usuarios",
  "Users"
);

const productos = new NaryNode(
  "Productos",
  "/productos",
  "Products"
);

const ayuda = new NaryNode(
  "Ayuda",
  "/ayuda",
  "Help"
);

// Submenús de Usuarios
usuarios.addChild(
  new NaryNode(
    "Registrar usuario",
    "/usuarios/registrar",
    "RegisterUser"
  )
);

usuarios.addChild(
  new NaryNode(
    "Consultar usuarios",
    "/usuarios/consultar",
    "UserList"
  )
);

usuarios.addChild(
  new NaryNode(
    "Configuración",
    "/usuarios/configuracion",
    "UserSettings"
  )
);

// Submenús de Productos
productos.addChild(
  new NaryNode(
    "Agregar producto",
    "/productos/agregar",
    "AddProduct"
  )
);

productos.addChild(
  new NaryNode(
    "Consultar productos",
    "/productos/consultar",
    "ProductList"
  )
);

productos.addChild(
  new NaryNode(
    "Inventario",
    "/productos/inventario",
    "Inventory"
  )
);

// Submenús de Ayuda
ayuda.addChild(
  new NaryNode(
    "Preguntas frecuentes",
    "/ayuda/faq",
    "FAQ"
  )
);

ayuda.addChild(
  new NaryNode(
    "Contacto",
    "/ayuda/contacto",
    "Contact"
  )
);

// Agregar opciones principales a la raíz
root.addChild(inicio);
root.addChild(usuarios);
root.addChild(productos);
root.addChild(ayuda);

// Crear árbol N-ario
export const menuTree = new NaryTree(root);