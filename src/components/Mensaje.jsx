/* ==========================================================
   Mensaje: alerta de Bootstrap reutilizable.
   Se usa para el error de carga y para las búsquedas sin
   resultados; solo cambia el tipo (color) y el contenido.

   Props:
     tipo      'danger' | 'warning' | 'info' ... (color de Bootstrap)
     titulo    texto en negrita (opcional)
     children  contenido del mensaje
   ========================================================== */
function Mensaje({ tipo = 'info', titulo, children }) {
  return (
    <div className={`alert alert-${tipo}`} role={tipo === 'danger' ? 'alert' : 'status'}>
      {/* Renderizado condicional con &&: el título solo aparece si se entrega */}
      {titulo && <strong className="d-block mb-1">{titulo}</strong>}
      {children}
    </div>
  )
}

export default Mensaje
