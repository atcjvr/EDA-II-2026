function MenuPage({ title, description }) {
  return (
    <section className="content-card">
      <h2>{title}</h2>

      <p>{description}</p>

      <div className="info-box">
        <h3>Sección del sistema</h3>
        <p>
          Este contenido se muestra dinámicamente
          según la opción seleccionada en el menú.
        </p>
      </div>
    </section>
  );
}

export default MenuPage;