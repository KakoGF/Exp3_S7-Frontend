import ProductCard from './ProductCard.jsx'
import Mensaje from './Mensaje.jsx'

/* ==========================================================
   ProductList: listado de productos del catálogo.
   Decide qué mostrar según el estado de la aplicación
   (renderizado condicional con if y retornos tempranos):
     1. cargando      -> spinner
     2. error         -> alerta roja
     3. sin resultados-> alerta amarilla con botón para limpiar
     4. con productos -> grilla de ProductCard generada con .map()

   Props:
     productos          productos ya filtrados
     cargando / error   estado de la carga con Fetch
     categoriaActual    filtro activo (para la etiqueta)
     busqueda           texto buscado (para la etiqueta y el aviso)
     avisoBusqueda      mensaje al enviar la búsqueda vacía ('' = sin aviso)
     onAgregar          agregar al carrito
     onVerDetalle       abrir modal
     onLimpiarFiltros   volver a mostrar todo
     cantidadEnCarrito  función que devuelve unidades por producto
   ========================================================== */
function ProductList({
  productos,
  cargando,
  error,
  categoriaActual,
  busqueda,
  avisoBusqueda,
  onAgregar,
  onVerDetalle,
  onLimpiarFiltros,
  cantidadEnCarrito,
}) {
  // Etiqueta con el filtro activo, construida a partir de las props.
  let etiquetaFiltro = `Mostrando: ${categoriaActual === 'Todos' ? 'todos' : categoriaActual}`
  if (busqueda.trim() !== '') etiquetaFiltro += ` · "${busqueda.trim()}"`

  function contenido() {
    if (cargando) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 mb-0 text-body-secondary">Cargando productos desde el catálogo...</p>
        </div>
      )
    }

    if (error) {
      return (
        <Mensaje tipo="danger" titulo="Ups, algo salió mal">
          {error}
        </Mensaje>
      )
    }

    if (productos.length === 0) {
      return (
        <Mensaje tipo="warning" titulo="Sin resultados">
          No encontramos juegos
          {busqueda.trim() !== '' && <> que coincidan con &quot;{busqueda.trim()}&quot;</>}
          {categoriaActual !== 'Todos' && <> en la categoría {categoriaActual}</>}.{' '}
          <button type="button" className="btn btn-link alert-link p-0 align-baseline" onClick={onLimpiarFiltros}>
            Ver todo el catálogo
          </button>
        </Mensaje>
      )
    }

    return (
      <>
        {/* Aviso de búsqueda vacía: al ser parte del estado, se mantiene
            visible aunque el catálogo se vuelva a dibujar (feedback S6). */}
        {avisoBusqueda && <Mensaje tipo="info">{avisoBusqueda}</Mensaje>}
        <div className="row g-4">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              cantidad={cantidadEnCarrito(producto.id)}
              onAgregar={onAgregar}
              onVerDetalle={onVerDetalle}
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="h3 text-warning mb-0">Catálogo de productos</h2>
        {!cargando && !error && (
          <span className="badge text-bg-secondary">
            {etiquetaFiltro} ({productos.length})
          </span>
        )}
      </div>
      {contenido()}
    </>
  )
}

export default ProductList
