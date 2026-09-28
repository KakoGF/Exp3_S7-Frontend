import { useRef } from 'react'
import { Collapse } from 'bootstrap'
import Buscador from './Buscador.jsx'

/* ==========================================================
   Navbar: barra de navegación responsiva.
   - Se colapsa en menú hamburguesa bajo 992px (navbar-expand-lg).
   - Dibuja las categorías a partir de un arreglo con .map().
   - Muestra el contador del carrito que recibe por props.

   Props:
     categorias          arreglo de nombres de categoría
     categoriaActual     categoría seleccionada (para marcarla activa)
     onCambiarCategoria  función que avisa a App la nueva categoría
     busqueda            texto actual del buscador
     onCambiarBusqueda   función que avisa a App el nuevo texto
     onEnviarBusqueda    función que avisa a App que se envió el formulario
     totalUnidades       cantidad de productos en el carrito
   ========================================================== */
function Navbar({
  categorias,
  categoriaActual,
  onCambiarCategoria,
  busqueda,
  onCambiarBusqueda,
  onEnviarBusqueda,
  totalUnidades,
}) {
  // useRef guarda una referencia al menú colapsable sin provocar re-renderizados.
  const menuRef = useRef(null)

  /**
   * En móvil, cierra el menú hamburguesa después de elegir una opción,
   * para que el usuario vea el catálogo sin tener que cerrarlo a mano.
   */
  function cerrarMenuMovil() {
    if (menuRef.current && menuRef.current.classList.contains('show')) {
      Collapse.getOrCreateInstance(menuRef.current).hide()
    }
  }

  function manejarClickCategoria(categoria) {
    onCambiarCategoria(categoria)
    cerrarMenuMovil()
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom border-danger">
      <div className="container">
        <a className="navbar-brand fw-bold text-danger" href="#inicio">
          KakoJuegos
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarPrincipal" ref={menuRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categorias.map((categoria) => (
              <li className="nav-item" key={categoria}>
                {/* Evento onClick: cambia la categoría del catálogo */}
                <button
                  type="button"
                  className={`nav-link btn-categoria ${categoria === categoriaActual ? 'active' : ''}`}
                  aria-current={categoria === categoriaActual ? 'page' : undefined}
                  onClick={() => manejarClickCategoria(categoria)}
                >
                  {categoria}
                </button>
              </li>
            ))}
            <li className="nav-item">
              <a className="nav-link" href="#contacto" onClick={cerrarMenuMovil}>
                Contacto
              </a>
            </li>
          </ul>

          <Buscador
            busqueda={busqueda}
            onCambiarBusqueda={onCambiarBusqueda}
            onBuscar={(texto) => {
              onEnviarBusqueda(texto)
              cerrarMenuMovil()
            }}
          />

          <a
            href="#carrito"
            className="btn btn-outline-light btn-sm ms-lg-3 mt-2 mt-lg-0"
            onClick={cerrarMenuMovil}
          >
            Carrito{' '}
            <span className="badge text-bg-danger" aria-label={`${totalUnidades} productos en el carrito`}>
              {totalUnidades}
            </span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
