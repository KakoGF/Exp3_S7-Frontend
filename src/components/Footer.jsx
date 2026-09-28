// Redes sociales en un arreglo: agregar una nueva red es sumar un objeto, sin tocar el JSX.
const REDES = [
  { nombre: 'Instagram', url: 'https://www.instagram.com/' },
  { nombre: 'YouTube', url: 'https://www.youtube.com/' },
  { nombre: 'X', url: 'https://x.com/' },
]

/* ==========================================================
   Footer: pie de página con datos de contacto y redes.
   ========================================================== */
function Footer() {
  return (
    <footer className="bg-body-tertiary border-top border-secondary py-4 mt-5">
      <div className="container">
        <div className="row gy-3 text-center text-md-start">
          <div className="col-12 col-md-4">
            <h2 className="h6 text-danger">KakoJuegos</h2>
            <p className="small text-body-secondary mb-0">
              Tienda de videojuegos para PC.
              <br />
              Santiago, Chile.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h2 className="h6">Contacto</h2>
            <ul className="list-unstyled small text-body-secondary mb-0">
              <li>
                <a href="mailto:contacto@kakojuegos.cl" className="link-light text-decoration-none">
                  contacto@kakojuegos.cl
                </a>
              </li>
              <li>+56 9 1234 5678</li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h2 className="h6">Redes sociales</h2>
            <ul className="list-inline mb-0">
              {REDES.map((red) => (
                <li className="list-inline-item" key={red.nombre}>
                  <a href={red.url} className="btn btn-outline-light btn-sm" target="_blank" rel="noreferrer">
                    {red.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center small text-body-secondary mb-0">
          &copy; 2026 KakoJuegos - Duoc UC. Actividad Semana 7, Desarrollo Frontend I (PFY2201).
        </p>
      </div>
    </footer>
  )
}

export default Footer
