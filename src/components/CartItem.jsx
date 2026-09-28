import { formatearPrecio, rutaPublica } from '../utils/formato.js'

/* ==========================================================
   CartItem: una fila del carrito.
   Muestra miniatura, nombre, cantidad con botones - y +,
   subtotal y botón para eliminar el producto completo.

   Props:
     item          producto del carrito (incluye cantidad)
     onAgregar     suma una unidad
     onQuitarUnidad resta una unidad
     onEliminar    elimina el producto del carrito
   ========================================================== */
function CartItem({ item, onAgregar, onQuitarUnidad, onEliminar }) {
  const subtotal = item.precioOferta * item.cantidad
  const llegoAlStock = item.cantidad >= item.stock

  return (
    <li className="list-group-item">
      <div className="d-flex gap-2 align-items-start">
        <img src={rutaPublica(item.imagen)} alt="" className="miniatura-carrito" />
        <div className="flex-grow-1">
          <p className="mb-1 small fw-semibold">{item.nombre}</p>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="btn-group btn-group-sm" role="group" aria-label={`Cantidad de ${item.nombre}`}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-cantidad"
                onClick={() => onQuitarUnidad(item.id)}
                aria-label={`Quitar una unidad de ${item.nombre}`}
              >
                −
              </button>
              <span className="btn btn-outline-secondary disabled btn-cantidad text-body">{item.cantidad}</span>
              <button
                type="button"
                className="btn btn-outline-secondary btn-cantidad"
                onClick={() => onAgregar(item)}
                disabled={llegoAlStock}
                aria-label={`Agregar una unidad de ${item.nombre}`}
              >
                +
              </button>
            </div>
            <span className="small text-warning">{formatearPrecio(subtotal)}</span>
          </div>
          {llegoAlStock && <p className="small text-body-secondary mb-0 mt-1">Máximo disponible: {item.stock}</p>}
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => onEliminar(item.id)}
          aria-label={`Eliminar ${item.nombre} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default CartItem
