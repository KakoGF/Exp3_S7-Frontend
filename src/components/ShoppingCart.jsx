import CartItem from './CartItem.jsx'
import CartTotal from './CartTotal.jsx'

/* ==========================================================
   ShoppingCart: panel del carrito de compras.
   No guarda estado propio: todo llega por props desde App
   (que usa el hook useCarrito). Así la navbar y el carrito
   siempre muestran la misma información.

   Props:
     items          productos del carrito
     totalUnidades, totalNormal, totalPagar, ahorro  totales
     onAgregar, onQuitarUnidad, onEliminar, onVaciar  acciones
   ========================================================== */
function ShoppingCart({
  items,
  totalUnidades,
  totalNormal,
  totalPagar,
  ahorro,
  onAgregar,
  onQuitarUnidad,
  onEliminar,
  onVaciar,
}) {
  const estaVacio = items.length === 0

  return (
    <div className="card sticky-lg-top carrito-fijo">
      <div className="card-header bg-body-tertiary d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Resumen del carrito</h2>
        <span className="badge text-bg-danger">{totalUnidades}</span>
      </div>

      <div className="card-body">
        {/* Renderizado condicional con operador ternario:
            carrito vacío -> mensaje; con productos -> lista de CartItem */}
        {estaVacio ? (
          <p className="text-body-secondary small mb-3">
            Tu carrito está vacío. Usa el botón &quot;Agregar al carrito&quot; de cualquier producto.
          </p>
        ) : (
          <ul className="list-group list-group-flush mb-3 lista-carrito">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAgregar={onAgregar}
                onQuitarUnidad={onQuitarUnidad}
                onEliminar={onEliminar}
              />
            ))}
          </ul>
        )}

        <CartTotal
          totalUnidades={totalUnidades}
          totalNormal={totalNormal}
          totalPagar={totalPagar}
          ahorro={ahorro}
        />
      </div>

      {/* El botón para vaciar solo tiene sentido si hay productos */}
      {!estaVacio && (
        <div className="card-footer d-grid gap-2">
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={onVaciar}>
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  )
}

export default ShoppingCart
