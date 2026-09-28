/* ==========================================================
   Encabezado: presentación de la tienda.
   Componente sin props ni estado: solo muestra contenido fijo.
   ========================================================== */
function Encabezado() {
  return (
    <header id="inicio" className="bg-body-tertiary text-center py-5 border-bottom border-secondary">
      <div className="container">
        <h1 className="text-danger fw-bold">KakoJuegos</h1>
        <p className="lead mb-0 text-body-secondary">
          Tu tienda de videojuegos para PC con los mejores títulos de acción, rol y mundo abierto.
        </p>
      </div>
    </header>
  )
}

export default Encabezado
