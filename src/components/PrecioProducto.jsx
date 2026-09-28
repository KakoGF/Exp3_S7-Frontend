import { formatearPrecio } from '../utils/formato.js'

/* ==========================================================
   PrecioProducto: muestra el precio normal tachado y el precio
   oferta destacado. Se reutiliza en la tarjeta y en el modal.

   Props:
     precio        precio normal
     precioOferta  precio con descuento
   ========================================================== */
function PrecioProducto({ precio, precioOferta }) {
  const tieneOferta = precioOferta < precio

  return (
    <div className="d-flex flex-wrap align-items-baseline gap-2">
      {/* Renderizado condicional: el precio normal tachado solo se muestra si hay oferta */}
      {tieneOferta && (
        <span className="precio-normal">
          <span className="visually-hidden">Precio normal: </span>
          {formatearPrecio(precio)}
        </span>
      )}
      <span className="precio-oferta">
        <span className="visually-hidden">{tieneOferta ? 'Precio oferta: ' : 'Precio: '}</span>
        {formatearPrecio(tieneOferta ? precioOferta : precio)}
      </span>
    </div>
  )
}

export default PrecioProducto
