import { useCallback, useEffect, useState } from 'react'

import Navbar from './components/Navbar.jsx'
import Encabezado from './components/Encabezado.jsx'
import Carrusel from './components/Carrusel.jsx'
import ProductList from './components/ProductList.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import ModalDetalle from './components/ModalDetalle.jsx'
import Footer from './components/Footer.jsx'
import { useCarrito } from './hooks/useCarrito.js'
import { normalizarTexto, rutaPublica } from './utils/formato.js'

// Categorías simuladas que se muestran en la navbar.
const CATEGORIAS = ['Todos', 'Acción', 'RPG', 'Mundo abierto']

/* ==========================================================
   App: componente principal.
   Guarda el estado compartido (productos, filtros, carrito y
   producto abierto en el modal) y lo reparte a los componentes
   hijos mediante props. Los hijos avisan de los cambios
   llamando a las funciones que reciben por props.
   ========================================================== */
function App() {
  // ----- Estado del catálogo -----
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // ----- Estado de los filtros -----
  const [categoriaActual, setCategoriaActual] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [avisoBusqueda, setAvisoBusqueda] = useState('')

  // ----- Producto que se muestra en el modal (null = modal cerrado) -----
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  // ----- Carrito (lógica encapsulada en un hook personalizado) -----
  const carrito = useCarrito()

  /* useEffect con arreglo de dependencias vacío [ ]:
     se ejecuta una sola vez, cuando el componente aparece en pantalla.
     Es el lugar indicado para pedir los datos con la Fetch API. */
  useEffect(() => {
    fetch(rutaPublica('productos.json'))
      .then((respuesta) => {
        // fetch no rechaza la promesa ante un 404 o 500,
        // por eso se revisa respuesta.ok y se lanza el error a mano.
        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con el estado ${respuesta.status}`)
        }
        return respuesta.json()
      })
      .then((datos) => setProductos(datos))
      .catch((errorCarga) => {
        console.error('Error al cargar el catálogo:', errorCarga)
        setError('No pudimos cargar el catálogo en este momento. Revisa tu conexión e inténtalo nuevamente.')
      })
      .finally(() => setCargando(false))
  }, [])

  /* Lista visible: se calcula a partir del estado en cada renderizado.
     Como no se guarda aparte, nunca queda desincronizada con los filtros. */
  const textoNormalizado = normalizarTexto(busqueda)
  const productosVisibles = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActual === 'Todos' || producto.categoria === categoriaActual
    const coincideTexto = normalizarTexto(producto.nombre).includes(textoNormalizado)
    return coincideCategoria && coincideTexto
  })

  // useCallback conserva la misma función entre renderizados,
  // así el useEffect del modal no se vuelve a ejecutar sin necesidad.
  const cerrarModal = useCallback(() => setProductoSeleccionado(null), [])

  function limpiarFiltros() {
    setCategoriaActual('Todos')
    setBusqueda('')
    setAvisoBusqueda('')
  }

  // Cada vez que el usuario escribe se actualiza la búsqueda y se borra el aviso.
  function cambiarBusqueda(texto) {
    setBusqueda(texto)
    setAvisoBusqueda('')
  }

  // Al enviar el formulario vacío se avisa al usuario (se mantiene el catálogo completo).
  function enviarBusqueda(texto) {
    setAvisoBusqueda(texto.trim() === '' ? 'Escribe el nombre de un juego para buscarlo.' : '')
  }

  return (
    <>
      <Navbar
        categorias={CATEGORIAS}
        categoriaActual={categoriaActual}
        onCambiarCategoria={setCategoriaActual}
        busqueda={busqueda}
        onCambiarBusqueda={cambiarBusqueda}
        onEnviarBusqueda={enviarBusqueda}
        totalUnidades={carrito.totalUnidades}
      />

      <Encabezado />

      <main>
        <Carrusel productos={productos.slice(0, 3)} />

        <section className="container my-5">
          <div className="row g-4">
            <div className="col-12 col-lg-8" id="catalogo">
              <ProductList
                productos={productosVisibles}
                cargando={cargando}
                error={error}
                categoriaActual={categoriaActual}
                busqueda={busqueda}
                avisoBusqueda={avisoBusqueda}
                onAgregar={carrito.agregarAlCarrito}
                onVerDetalle={setProductoSeleccionado}
                onLimpiarFiltros={limpiarFiltros}
                cantidadEnCarrito={carrito.cantidadEnCarrito}
              />
            </div>

            <div className="col-12 col-lg-4" id="carrito">
              <ShoppingCart
                items={carrito.carrito}
                totalUnidades={carrito.totalUnidades}
                totalPagar={carrito.totalPagar}
                totalNormal={carrito.totalNormal}
                ahorro={carrito.ahorro}
                onAgregar={carrito.agregarAlCarrito}
                onQuitarUnidad={carrito.quitarUnidad}
                onEliminar={carrito.eliminarDelCarrito}
                onVaciar={carrito.vaciarCarrito}
              />
            </div>
          </div>
        </section>

        <section id="contacto" className="container my-5">
          <h2 className="h3 text-warning">Contacto</h2>
          <p className="text-body-secondary">
            ¿Tienes dudas o quieres comprar? Escríbenos a{' '}
            <a href="mailto:contacto@kakojuegos.cl" className="link-warning">
              contacto@kakojuegos.cl
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />

      {/* Renderizado condicional: el modal solo existe si hay un producto seleccionado */}
      {productoSeleccionado && (
        <ModalDetalle
          producto={productoSeleccionado}
          cantidadEnCarrito={carrito.cantidadEnCarrito(productoSeleccionado.id)}
          onAgregar={carrito.agregarAlCarrito}
          onCerrar={cerrarModal}
        />
      )}
    </>
  )
}

export default App
