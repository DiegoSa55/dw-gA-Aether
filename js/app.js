const carrito = new Carrito();

// Elementos del catalogo y navbar
const $catalogo = document.querySelector('#catalogo');
const $buscador = document.querySelector('#buscador');
const $filtroCategoria = document.querySelector('#filtro-categoria');
const $contador = document.querySelector('#contador');
const $modalDetalle = document.querySelector('#modal-detalle');
const $contenidoModal = document.querySelector('#contenido-modal');
const $btnCerrarModal = document.querySelector('#btn-cerrar-modal');

// Elementos del carrito
const $itemsCarrito = document.querySelector('#items-carrito');
const $tablaCarrito = document.querySelector('#tabla-carrito');
const $contenedorCarritoVacio = document.querySelector('#contenedor-carrito-vacio');
const $montoSubtotal = document.querySelector('#monto-subtotal');
const $montoDescuento = document.querySelector('#monto-descuento');
const $montoEnvio = document.querySelector('#monto-envio');
const $montoIgv = document.querySelector('#monto-igv');
const $montoTotal = document.querySelector('#monto-total');
const $inputCupon = document.querySelector('#input-cupon');
const $btnAplicarCupon = document.querySelector('#btn-aplicar-cupon');
const $mensajeCupon = document.querySelector('#mensaje-cupon');

let cuponActivo = '';

function soles(monto) {
  return 'S/ ' + monto.toFixed(2);
}

// Aviso rapido usando Toast de Bootstrap
function mostrarAviso(texto) {
  let caja = document.querySelector('#caja-avisos');
  if (!caja) {
    caja = document.createElement('div');
    caja.id = 'caja-avisos';
    caja.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(caja);
  }

  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-info border-0';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body fw-semibold">${texto}</div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  caja.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast, { delay: 2000 });
  bsToast.show();
}

function pintarContador() {
  if ($contador) {
    $contador.textContent = carrito.contar();
  }
}

function pintarCatalogo(lista) {
  if (!$catalogo) return;

  if (lista.length === 0) {
    $catalogo.innerHTML = '<p class="text-center text-secondary col-12">No hay productos con ese filtro.</p>';
    return;
  }

  $catalogo.innerHTML = lista.map(p => `
    <div class="col">
      <article class="card tarjeta-producto h-100 text-white">
        <img src="${p.imagen}" class="card-img-top p-3" alt="${p.nombre}" loading="lazy">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary align-self-start mb-2">${p.categoria}</span>
          <h3 class="h5 card-title">${p.nombre}</h3>
          <p class="fs-5 fw-bold text-info mt-auto mb-3">${soles(p.precio)}</p>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-info flex-grow-1 fw-semibold" data-agregar="${p.id}">
              <i class="bi bi-cart-plus me-1"></i>Agregar
            </button>
            <button type="button" class="btn btn-outline-light" data-detalle="${p.id}">
              <i class="bi bi-eye"></i>
            </button>
          </div>
        </div>
      </article>
    </div>
  `).join('');
}

function aplicarFiltros() {
  const texto = $buscador ? $buscador.value.trim().toLowerCase() : '';
  const categoria = $filtroCategoria ? $filtroCategoria.value : 'todas';

  const filtrados = productos.filter(p => {
    const porNombre = p.nombre.toLowerCase().includes(texto);
    const porCategoria = categoria === 'todas' || p.categoria === categoria;
    return porNombre && porCategoria;
  });

  pintarCatalogo(filtrados);
}

function mostrarDetalle(id) {
  const p = productos.find(item => item.id === id);
  if (!p || !$modalDetalle || !$contenidoModal) return;

  $contenidoModal.innerHTML = `
    <span class="badge bg-secondary mb-2">${p.categoria}</span>
    <h2 class="h4 mb-2">${p.nombre}</h2>
    <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid rounded mb-3">
    <p class="text-secondary">${p.descripcion}</p>
    <p class="fw-bold">Stock: <span class="text-info">${p.stock} unidades</span></p>
    <p class="fs-4 fw-bold text-info mb-3">${soles(p.precio)}</p>
    <button type="button" class="btn btn-info w-100 fw-semibold" data-agregar="${p.id}">Agregar al carrito</button>
  `;

  $modalDetalle.classList.add('activo');
  $modalDetalle.setAttribute('aria-hidden', 'false');
}

function cerrarModal() {
  if ($modalDetalle) {
    $modalDetalle.classList.remove('activo');
    $modalDetalle.setAttribute('aria-hidden', 'true');
  }
}

function pintarVistaCarrito() {
  if (!$itemsCarrito) return;

  if (carrito.items.length === 0) {
    if ($tablaCarrito) $tablaCarrito.style.display = 'none';
    if ($contenedorCarritoVacio) $contenedorCarritoVacio.style.display = 'block';
  } else {
    if ($tablaCarrito) $tablaCarrito.style.display = 'table';
    if ($contenedorCarritoVacio) $contenedorCarritoVacio.style.display = 'none';

    $itemsCarrito.innerHTML = carrito.items.map(item => {
      const prod = productos.find(p => p.id === item.id);
      if (!prod) return '';

      const subtotalLinea = prod.precio * item.cantidad;

      return `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <img src="${prod.imagen}" alt="${prod.nombre}" class="rounded" width="50" height="50">
              <span>${prod.nombre}</span>
            </div>
          </td>
          <td>${soles(prod.precio)}</td>
          <td style="width: 100px;">
            <input type="number" min="1" max="${prod.stock}" value="${item.cantidad}" data-cambiar-cantidad="${prod.id}" class="form-control form-control-sm bg-dark text-white">
          </td>
          <td class="fw-bold">${soles(subtotalLinea)}</td>
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" data-quitar="${prod.id}">Quitar</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  actualizarResumenPago();
}

function actualizarResumenPago() {
  if (!$montoTotal) return;

  const resumen = calcularResumenCarrito(carrito.items, productos, cuponActivo);

  $montoSubtotal.textContent = soles(resumen.subtotal);
  $montoDescuento.textContent = '- ' + soles(resumen.descuento);
  $montoEnvio.textContent = resumen.envio === 0 ? 'GRATIS' : soles(resumen.envio);
  $montoIgv.textContent = soles(resumen.igv);
  $montoTotal.textContent = soles(resumen.total);
}

// Eventos al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
  pintarCatalogo(productos);
  pintarContador();
  pintarVistaCarrito();
});

if ($buscador) {
  $buscador.addEventListener('input', aplicarFiltros);
}

if ($filtroCategoria) {
  $filtroCategoria.addEventListener('change', aplicarFiltros);
}

if ($catalogo) {
  $catalogo.addEventListener('click', e => {
    const btnAgregar = e.target.closest('[data-agregar]');
    const btnDetalle = e.target.closest('[data-detalle]');

    if (btnAgregar) {
      carrito.agregar(btnAgregar.dataset.agregar);
      pintarContador();
      mostrarAviso('Producto agregado al carrito');
    } else if (btnDetalle) {
      mostrarDetalle(btnDetalle.dataset.detalle);
    }
  });
}

if ($contenidoModal) {
  $contenidoModal.addEventListener('click', e => {
    const btnAgregar = e.target.closest('[data-agregar]');
    if (btnAgregar) {
      carrito.agregar(btnAgregar.dataset.agregar);
      pintarContador();
      cerrarModal();
      mostrarAviso('Producto agregado al carrito');
    }
  });
}

if ($btnCerrarModal) {
  $btnCerrarModal.addEventListener('click', cerrarModal);
}

if ($modalDetalle) {
  $modalDetalle.addEventListener('click', e => {
    if (e.target === $modalDetalle) cerrarModal();
  });
}

if ($itemsCarrito) {
  $itemsCarrito.addEventListener('change', e => {
    const input = e.target.closest('[data-cambiar-cantidad]');
    if (input) {
      carrito.cambiarCantidad(input.dataset.cambiarCantidad, parseInt(input.value, 10));
      pintarVistaCarrito();
      pintarContador();
    }
  });

  $itemsCarrito.addEventListener('click', e => {
    const btnQuitar = e.target.closest('[data-quitar]');
    if (btnQuitar) {
      carrito.quitar(btnQuitar.dataset.quitar);
      pintarVistaCarrito();
      pintarContador();
    }
  });
}

if ($btnAplicarCupon) {
  $btnAplicarCupon.addEventListener('click', () => {
    const codigo = $inputCupon ? $inputCupon.value : '';
    const desc = calcularDescuento(calcularSubtotal(carrito.items, productos), codigo);

    if (desc > 0) {
      cuponActivo = codigo;
      $mensajeCupon.className = 'text-success small mt-1';
      $mensajeCupon.textContent = 'Cupon aplicado.';
    } else {
      cuponActivo = '';
      $mensajeCupon.className = 'text-danger small mt-1';
      $mensajeCupon.textContent = 'Cupon no valido.';
    }
    actualizarResumenPago();
  });
}