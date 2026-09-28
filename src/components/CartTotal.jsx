import { formatearPrecio } from '../utils/formato.js'

/* ==========================================================
   CartTotal: resumen numérico del carrito.
   Recibe los totales ya calculados (con reduce en useCarrito)
   y solo se encarga de mostrarlos.

   Props:
     totalUnidades  cantidad total de productos
     totalNormal    suma a precio normal
     totalPagar     suma a precio oferta
     ahorro         diferencia entre ambos
   ========================================================== */
function CartTotal({ totalUnidades, totalNormal, totalPagar, ahorro }) {
  return (
    <div className="border-top pt-3">
      <div className="d-flex justify-content-between small">
        <span>Productos</span>
        <span>{totalUnidades}</span>
      </div>

      {/* El detalle del ahorro solo aparece cuando hay un descuento real */}
      {ahorro > 0 && (
        <>
          <div className="d-flex justify-content-between small text-body-secondary">
            <span>Precio normal</span>
            <span className="text-decoration-line-through">{formatearPrecio(totalNormal)}</span>
          </div>
          <div className="d-flex justify-content-between small texto-ahorro">
            <span>Ahorras</span>
            <span>-{formatearPrecio(ahorro)}</span>
          </div>
        </>
      )}

      <div className="d-flex justify-content-between mt-2">
        <strong>Total</strong>
        <strong className="text-warning">{formatearPrecio(totalPagar)}</strong>
      </div>
    </div>
  )
}

export default CartTotal
