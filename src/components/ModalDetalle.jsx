import { useEffect } from 'react'
import PrecioProducto from './PrecioProducto.jsx'
import { calcularDescuento, rutaPublica } from '../utils/formato.js'

/* ==========================================================
   ModalDetalle: ventana con la información completa del juego.
   Usa las clases de modal de Bootstrap, pero lo controla React:
   App lo dibuja solo cuando hay un producto seleccionado y lo
   quita al cerrarlo (renderizado condicional).

   Props:
     producto          juego a mostrar
     cantidadEnCarrito unidades que ya están en el carrito
     onAgregar         agregar al carrito
     onCerrar          cerrar el modal
   ========================================================== */
function ModalDetalle({ producto, cantidadEnCarrito, onAgregar, onCerrar }) {
  const descuento = calcularDescuento(producto.precio, producto.precioOferta)
  const sinStockDisponible = cantidadEnCarrito >= producto.stock

  /* useEffect con limpieza (cleanup):
     mientras el modal está abierto se escucha la tecla Escape y se
     bloquea el scroll de la página. Al cerrarse, la función de retorno
     quita el listener y devuelve el scroll, para no dejar efectos colgando. */
  useEffect(() => {
    function manejarTecla(evento) {
      if (evento.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', manejarTecla)
    document.body.classList.add('overflow-hidden')

    return () => {
      document.removeEventListener('keydown', manejarTecla)
      document.body.classList.remove('overflow-hidden')
    }
  }, [onCerrar])

  // Clic sobre el fondo oscuro (fuera de la ventana) también cierra el modal.
  function manejarClickFondo(evento) {
    if (evento.target === evento.currentTarget) onCerrar()
  }

  return (
    <div
      className="modal modal-react"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalProductoTitulo"
      onClick={manejarClickFondo}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title h5" id="modalProductoTitulo">
              {producto.nombre}
            </h3>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar}></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <img
                  src={rutaPublica(producto.imagen)}
                  className="img-fluid rounded w-100"
                  alt={`Portada de ${producto.nombre}`}
                />
              </div>
              <div className="col-12 col-md-6">
                <p className="mb-2">
                  <span className="badge text-bg-secondary me-1">{producto.categoria}</span>
                  {descuento > 0 && <span className="badge text-bg-danger">-{descuento}%</span>}
                </p>
                <p className="small text-body-secondary mb-2">{producto.plataforma}</p>
                <p className="small">{producto.descripcion}</p>
                <p className="small">{producto.detalle}</p>
                <PrecioProducto precio={producto.precio} precioOferta={producto.precioOferta} />
                <p className="small text-body-secondary mt-2 mb-0">
                  Stock disponible: {producto.stock} unidades
                  {cantidadEnCarrito > 0 && ` · ${cantidadEnCarrito} en tu carrito`}
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCerrar}>
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onAgregar(producto)}
              disabled={sinStockDisponible}
            >
              {sinStockDisponible ? 'Stock máximo en carrito' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetalle
