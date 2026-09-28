/* ==========================================================
   Buscador: formulario de búsqueda por nombre.
   Es un "input controlado": su valor viene del estado de App
   (prop busqueda) y cada tecla se informa con onChange.
   Así el catálogo se filtra en vivo mientras el usuario escribe.

   Props:
     busqueda           texto actual
     onCambiarBusqueda  función que actualiza el texto en App
     onBuscar           avisa a App que se envió el formulario (recibe el texto)
   ========================================================== */
function Buscador({ busqueda, onCambiarBusqueda, onBuscar }) {
  /**
   * Evento onSubmit: se usa preventDefault para que la página
   * no se recargue y se desplaza la vista hasta el catálogo.
   */
  function manejarEnvio(evento) {
    evento.preventDefault()
    onBuscar(busqueda)
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form className="d-flex gap-2" role="search" onSubmit={manejarEnvio}>
      <label htmlFor="inputBusqueda" className="visually-hidden">
        Buscar juegos
      </label>
      <input
        id="inputBusqueda"
        className="form-control form-control-sm"
        type="search"
        placeholder="Buscar juego..."
        value={busqueda}
        onChange={(evento) => onCambiarBusqueda(evento.target.value)}
      />
      <button className="btn btn-danger btn-sm" type="submit">
        Buscar
      </button>
    </form>
  )
}

export default Buscador
