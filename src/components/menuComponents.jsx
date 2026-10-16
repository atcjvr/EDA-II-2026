import MenuPage from "./MenuPage.jsx";

const menuComponents = {
  Home: () => (
    <MenuPage
      title="Inicio"
      description="Bienvenido al sistema de navegación N-ario."
    />
  ),

  Users: () => (
    <MenuPage
      title="Usuarios"
      description="Administración de usuarios del sistema."
    />
  ),

  RegisterUser: () => (
    <MenuPage
      title="Registrar usuario"
      description="Sección para registrar nuevos usuarios."
    />
  ),

  UserList: () => (
    <MenuPage
      title="Consultar usuarios"
      description="Consulta de usuarios registrados."
    />
  ),

  UserSettings: () => (
    <MenuPage
      title="Configuración"
      description="Configuración de usuarios."
    />
  ),

  Products: () => (
    <MenuPage
      title="Productos"
      description="Administración de productos."
    />
  ),

  AddProduct: () => (
    <MenuPage
      title="Agregar producto"
      description="Registro de nuevos productos."
    />
  ),

  ProductList: () => (
    <MenuPage
      title="Consultar productos"
      description="Consulta de productos registrados."
    />
  ),

  Inventory: () => (
    <MenuPage
      title="Inventario"
      description="Control de inventario del sistema."
    />
  ),

  Help: () => (
    <MenuPage
      title="Ayuda"
      description="Centro de ayuda del sistema."
    />
  ),

  FAQ: () => (
    <MenuPage
      title="Preguntas frecuentes"
      description="Respuestas a preguntas frecuentes."
    />
  ),

  Contact: () => (
    <MenuPage
      title="Contacto"
      description="Información de contacto y soporte."
    />
  ),
};

export default menuComponents;