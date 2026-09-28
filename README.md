# KakoJuegos — Tienda de videojuegos para PC en React

Actividad Formativa Semana 7: **"Construyendo componentes funcionales en React para un eCommerce interactivo"**

**Desarrollo Frontend I (PFY2201)** — Duoc UC
**Alumno:** Joaquín Gómez Flores

## Descripción del proyecto

Migración a **React** de la tienda KakoJuegos construida en las semanas anteriores con HTML, Bootstrap y JavaScript puro.

En la versión anterior el catálogo y el carrito se dibujaban a mano con `createElement` y `appendChild`. En esta versión la interfaz se divide en **componentes funcionales**, los datos cambiantes se guardan con el Hook **`useState`** y React vuelve a dibujar automáticamente lo que corresponde cuando el estado cambia.

El proyecto se creó con **Vite** (`npm create vite@latest -- --template react`) en lugar de `create-react-app`, porque es la herramienta que hoy recomienda el ecosistema de React: arranca más rápido y recarga los cambios al instante (HMR).

---

## Cómo ejecutar el proyecto

Requisitos: **Node.js 18 o superior** y npm.

```bash
npm install        # instala las dependencias (solo la primera vez)
npm run dev        # servidor de desarrollo
```

Abrir la dirección que muestra la terminal: `http://localhost:5173/Exp3_S7-Frontend/`.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión optimizada en la carpeta `dist/`. |
| `npm run preview` | Sirve localmente la versión de `dist/` para revisarla. |
| `npm run lint` | Revisa el código con oxlint (incluye las reglas de los Hooks). |
| `npm run deploy` | Compila y publica `dist/` en la rama `gh-pages`. |

---

## Publicación en GitHub Pages (rama `gh-pages`)

1. `vite.config.js` define `base: '/Exp3_S7-Frontend/'`, igual al nombre del repositorio. Sin esto el sitio publicado no encuentra sus archivos.
2. El paquete `gh-pages` (dependencia de desarrollo) sube la carpeta `dist/` a la rama `gh-pages`.
3. En `package.json`, el script `predeploy` ejecuta el build antes de publicar:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

4. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `gh-pages` / `(root)`**.

La rama `main` guarda el **código fuente** (componentes JSX). La rama `gh-pages` guarda solo el **sitio compilado** que GitHub Pages sirve al público.

---

## Estructura de archivos

```
Exp3_S7-Frontend/
├── index.html                 Página base: React dibuja todo dentro de <div id="root">
├── package.json               Dependencias y scripts (dev, build, deploy)
├── vite.config.js             Configuración de Vite y ruta base para GitHub Pages
├── public/
│   ├── productos.json         Catálogo (6 juegos con precio normal y precio oferta)
│   ├── favicon.svg
│   └── img/                   Portadas optimizadas de los juegos
├── docs/capturas/             Evidencias de todas las funcionalidades
└── src/
    ├── main.jsx               Punto de entrada: importa Bootstrap, los estilos y monta <App />
    ├── App.jsx                Componente principal: estado global, carga de datos y filtros
    ├── components/
    │   ├── Navbar.jsx         Barra de navegación, categorías y contador del carrito
    │   ├── Buscador.jsx       Formulario de búsqueda (input controlado)
    │   ├── Encabezado.jsx     Título y bajada de la tienda
    │   ├── Carrusel.jsx       Carrusel de juegos destacados
    │   ├── ProductList.jsx    Listado del catálogo y sus estados (carga, error, vacío)
    │   ├── ProductCard.jsx    Tarjeta de un producto
    │   ├── PrecioProducto.jsx Precio normal tachado + precio oferta (reutilizable)
    │   ├── ModalDetalle.jsx   Ventana con el detalle del juego
    │   ├── ShoppingCart.jsx   Panel del carrito
    │   ├── CartItem.jsx       Fila del carrito con cantidad y botones
    │   ├── CartTotal.jsx      Totales: productos, precio normal, ahorro y total
    │   ├── Mensaje.jsx        Alerta reutilizable (error, sin resultados, avisos)
    │   └── Footer.jsx         Pie de página
    ├── hooks/
    │   └── useCarrito.js      Hook personalizado con toda la lógica del carrito
    ├── utils/
    │   └── formato.js         Funciones puras: precios, descuentos, rutas, textos
    └── styles/
        └── kakojuegos.css     Estilos propios que complementan a Bootstrap
```

---

## Resolviendo lo solicitado

### 1. Listado de productos con nombre, precio, oferta, descripción e imagen

Cada producto de `public/productos.json` tiene `nombre`, `precio` (normal), `precioOferta`, `descripcion` (corta) e `imagen`, además de `categoria`, `plataforma`, `stock` y `detalle`.

`ProductCard` muestra la imagen, el nombre, la descripción corta, el **precio normal tachado** y el **precio oferta destacado**, junto con una etiqueta con el porcentaje de descuento calculado por `calcularDescuento()`.

| Juego | Precio normal | Precio oferta | Descuento |
|---|---:|---:|---:|
| State of Decay 2: Juggernaut Edition | $14.990 | $9.990 | 33% |
| Baldur's Gate 3 | $29.990 | $23.990 | 20% |
| Grand Theft Auto V Enhanced | $19.990 | $11.990 | 40% |
| Elden Ring | $34.990 | $27.990 | 20% |
| Cyberpunk 2077 | $24.990 | $17.490 | 30% |
| DOOM Eternal | $12.990 | $8.990 | 31% |

### 2. Carrito de compras: agregar, eliminar, contador y total

La lógica vive en el hook personalizado `useCarrito`, que usa `useState`:

| Función | Qué hace |
|---|---|
| `agregarAlCarrito(producto)` | Agrega el juego o suma una unidad si ya estaba. No supera el stock. |
| `quitarUnidad(id)` | Resta una unidad; si era la última, el juego sale del carrito. |
| `eliminarDelCarrito(id)` | Quita el juego completo. |
| `vaciarCarrito()` | Deja el carrito sin productos. |
| `cantidadEnCarrito(id)` | Unidades de un juego en el carrito (lo usan las tarjetas). |

- **Contador:** `totalUnidades` se muestra en la navbar y en el encabezado del carrito.
- **Total:** `totalPagar` suma `precioOferta × cantidad` con `reduce`. También se muestran el total a precio normal y el **ahorro**.

### 3. Componentes funcionales modulares y reutilizables

La aplicación está dividida en 13 componentes funcionales, cada uno con una sola responsabilidad. Se comunican con **props**: los datos bajan desde `App` y los cambios suben llamando a las funciones recibidas (`onAgregar`, `onEliminar`, `onCambiarCategoria`…).

Ejemplos de reutilización:
- `ProductCard` se usa para los seis juegos: la misma tarjeta, distintas props.
- `PrecioProducto` se usa en la tarjeta y en el modal.
- `Mensaje` se usa para el error de carga, las búsquedas sin resultados y el aviso de búsqueda vacía.

### 4. Eventos

| Evento | Dónde | Acción |
|---|---|---|
| `onClick` | `ProductCard`, `ModalDetalle` | Agregar al carrito / ver detalles |
| `onClick` | `CartItem` | Botones −, + y Eliminar |
| `onClick` | `ShoppingCart` | Vaciar carrito |
| `onClick` | `Navbar` | Cambiar categoría (Todos, Acción, RPG, Mundo abierto) |
| `onChange` | `Buscador` | Filtra el catálogo en vivo mientras se escribe |
| `onSubmit` | `Buscador` | `preventDefault()`, desplaza al catálogo y avisa si el texto está vacío |
| `keydown` (Escape) | `ModalDetalle` | Cierra el modal (listener registrado con `useEffect`) |

### 5. Renderizado condicional

| Condición | Resultado | Técnica |
|---|---|---|
| Datos cargando | Spinner "Cargando productos…" | `if` con retorno temprano |
| Error en `fetch` | Alerta roja con mensaje amigable | `if` con retorno temprano |
| Búsqueda o filtro sin resultados | Alerta amarilla y enlace "Ver todo el catálogo" | `if` con retorno temprano |
| Búsqueda enviada vacía | Aviso "Escribe el nombre de un juego para buscarlo." | `&&` |
| Carrito vacío o con productos | Mensaje o lista de `CartItem` | Operador ternario `? :` |
| Carrito con productos | Botón "Vaciar carrito" visible | `&&` |
| Precio oferta menor al normal | Precio normal tachado y etiqueta `-X%` | `&&` |
| Hay ahorro en el carrito | Líneas "Precio normal" y "Ahorras" | `&&` |
| Juego ya agregado | Botón verde "Agregar otra (n en carrito)" | Variable + `if` |
| Cantidad = stock | Botón deshabilitado "Stock máximo en carrito" | `disabled` + texto condicional |
| Stock ≤ 5 | "¡Últimas n unidades!" | `&&` |
| Producto seleccionado | Modal de detalle visible | `&&` en `App` |

### 6. Funciones reutilizables, convenciones y comentarios

- `src/utils/formato.js`: funciones puras sin dependencia de React (`formatearPrecio`, `calcularDescuento`, `rutaPublica`, `normalizarTexto`).
- `src/hooks/useCarrito.js`: la lógica del carrito queda separada de la interfaz.
- **Convenciones:** componentes en PascalCase (`ProductCard.jsx`), funciones y variables en camelCase, props de eventos con prefijo `on` (`onAgregar`), constantes en MAYÚSCULAS (`CATEGORIAS`, `REDES`).
- Cada componente comienza con un comentario que explica su función y sus props. Los Hooks tienen comentarios que explican por qué se usan.
- Los valores derivados (lista filtrada, totales) se calculan en cada renderizado en lugar de guardarse en otro estado, así nunca quedan desincronizados.

### 7. Publicación y documentación

Código en `main`, sitio compilado en `gh-pages`, este README y capturas en `docs/capturas/`.

---

## Hooks utilizados

| Hook | Dónde | Para qué |
|---|---|---|
| `useState` | `App`, `useCarrito` | Productos, estado de carga, error, categoría, búsqueda, aviso, producto del modal y carrito. |
| `useEffect` | `App` | Cargar `productos.json` con la Fetch API una sola vez (`[]`). Valida `respuesta.ok` y maneja el error con `catch`. |
| `useEffect` | `Carrusel` | Iniciar el carrusel de Bootstrap (cada 3 segundos) cuando los slides existen y destruirlo en la limpieza. |
| `useEffect` | `ModalDetalle` | Escuchar la tecla Escape y bloquear el scroll mientras el modal está abierto; la limpieza lo revierte. |
| `useRef` | `Navbar`, `Carrusel` | Referencia al menú colapsable y al carrusel sin provocar re-renderizados. |
| `useCallback` | `App` | Mantener estable la función `cerrarModal` para no repetir el efecto del modal. |
| `useCarrito` | `App` | Hook personalizado que encapsula el estado y las operaciones del carrito. |

---