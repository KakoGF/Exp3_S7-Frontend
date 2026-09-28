import { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'
import { formatearPrecio, rutaPublica } from '../utils/formato.js'

/* ==========================================================
   Carrusel: destaca los primeros productos del catálogo.
   Los slides se generan con .map() a partir de la prop productos,
   así el carrusel siempre muestra datos reales del JSON.

   Corrección del feedback S6: el caption tiene texto claro sobre
   fondo oscuro y las flechas son blancas (ver kakojuegos.css).

   Props:
     productos  arreglo con los productos a destacar
   ========================================================== */
function Carrusel({ productos }) {
  const carruselRef = useRef(null)

  /* useEffect con dependencia [productos.length]:
     cuando los slides ya están en pantalla, se inicia el carrusel
     de Bootstrap con avance automático cada 3 segundos.
     La función de retorno (cleanup) lo destruye si el componente
     se vuelve a dibujar o desaparece, evitando instancias duplicadas. */
  useEffect(() => {
    if (!carruselRef.current || productos.length === 0) return undefined

    const instancia = Carousel.getOrCreateInstance(carruselRef.current, {
      interval: 3000,
      ride: 'carousel',
    })
    instancia.cycle()

    return () => instancia.dispose()
  }, [productos.length])

  // Renderizado condicional: sin productos todavía, no se dibuja el carrusel.
  if (productos.length === 0) return null

  return (
    <section className="container my-5" aria-label="Juegos destacados">
      <div id="carouselJuegos" className="carousel slide shadow" ref={carruselRef}>
        <div className="carousel-indicators">
          {productos.map((producto, indice) => (
            <button
              key={producto.id}
              type="button"
              data-bs-target="#carouselJuegos"
              data-bs-slide-to={indice}
              className={indice === 0 ? 'active' : ''}
              aria-current={indice === 0 ? 'true' : undefined}
              aria-label={`Imagen ${indice + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner rounded">
          {productos.map((producto, indice) => (
            <div key={producto.id} className={`carousel-item ${indice === 0 ? 'active' : ''}`}>
              <img
                src={rutaPublica(producto.imagen)}
                className="d-block w-100"
                alt={`Portada de ${producto.nombre}`}
              />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="h5 mb-1">{producto.nombre}</h2>
                <p className="mb-0 small">
                  Oferta: {formatearPrecio(producto.precioOferta)}{' '}
                  <span className="text-decoration-line-through opacity-75">
                    {formatearPrecio(producto.precio)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselJuegos" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselJuegos" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  )
}

export default Carrusel
