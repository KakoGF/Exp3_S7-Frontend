import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap 5.3 instalado con npm: primero su CSS y luego el JS
// (importar 'bootstrap' activa el menú hamburguesa, el carrusel y demás componentes).
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Estilos propios: se cargan después de Bootstrap para poder sobrescribirlo.
import './styles/kakojuegos.css'

import App from './App.jsx'

// Punto de entrada: React toma el div#root del index.html y dibuja <App /> dentro.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
