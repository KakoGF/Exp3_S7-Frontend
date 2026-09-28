import { useState } from 'react'

/* ==========================================================
   Hook personalizado useCarrito
   Agrupa toda la lógica del carrito de compras en un solo lugar.
   Internamente usa useState y expone el estado y las funciones
   que necesitan los componentes (agregar, quitar, eliminar, vaciar).

   Cada elemento del carrito es el producto más una propiedad
   "cantidad". Si el usuario agrega dos veces el mismo juego,
   no se duplica la fila: se suma una unidad.
   ========================================================== */
export function useCarrito() {
  const [carrito, setCarrito] = useState([])

  /**
   * Agrega una unidad del producto. Respeta el stock disponible.
   * Se usa la forma funcional de setCarrito (recibe el estado anterior)
   * para trabajar siempre con el valor más reciente.
   */
  function agregarAlCarrito(producto) {
    setCarrito((carritoAnterior) => {
      const existente = carritoAnterior.find((item) => item.id === producto.id)

      if (!existente) {
        return [...carritoAnterior, { ...producto, cantidad: 1 }]
      }
      if (existente.cantidad >= producto.stock) {
        return carritoAnterior
      }
      return carritoAnterior.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
      )
    })
  }

  /**
   * Quita una unidad. Si era la última, el producto sale del carrito.
   */
  function quitarUnidad(idProducto) {
    setCarrito((carritoAnterior) =>
      carritoAnterior
        .map((item) =>
          item.id === idProducto ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    )
  }

  /**
   * Elimina el producto completo, sin importar cuántas unidades tenga.
   */
  function eliminarDelCarrito(idProducto) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((item) => item.id !== idProducto),
    )
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  // Valores derivados: no se guardan en el estado porque se calculan
  // a partir del carrito en cada renderizado (una sola fuente de verdad).
  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const totalPagar = carrito.reduce((suma, item) => suma + item.precioOferta * item.cantidad, 0)
  const totalNormal = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  /**
   * Cuántas unidades de un producto hay en el carrito (0 si no está).
   * Lo usan las tarjetas para cambiar el texto del botón.
   */
  function cantidadEnCarrito(idProducto) {
    const item = carrito.find((elemento) => elemento.id === idProducto)
    return item ? item.cantidad : 0
  }

  return {
    carrito,
    totalUnidades,
    totalPagar,
    totalNormal,
    ahorro: totalNormal - totalPagar,
    agregarAlCarrito,
    quitarUnidad,
    eliminarDelCarrito,
    vaciarCarrito,
    cantidadEnCarrito,
  }
}
