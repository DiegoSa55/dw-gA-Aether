
const carrito = new Carrito();

const $catalogo = document.querySelector('#catalogo');
const $buscador = document.querySelector('#buscador');
const $filtroCategoria = document.querySelector('#filtro-categoria');
const $contador = document.querySelector('#contador');
const $modalDetalle = document.querySelector('#modal-detalle');
const $contenidoModal = document.querySelector('#contenido-modal');
const $btnCerrarModal = document.querySelector('#btn-cerrar-modal');

const soles = (monto) => `S/ ${monto.toFixed(2)}`;

function pintarCatalogo(lista) {
  if (!$catalogo) return;

  if (lista.length === 0) {
    $catalogo.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-texto-mutado);">No se encontraron productos que coincidan con la búsqueda.</p>`;
    return;
  }

  $catalogo.innerHTML = lista.map(p => `
    <article class="tarjeta-producto">
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <div class="info-tarjeta">
        <span class="categoria-badge">${p.categoria}</span>
        <h3 class="titulo-producto">${p.nombre}</h3>
        <p class="precio-producto">${soles(p.precio)}</p>
        <div class="acciones-tarjeta">
          <button type="button" class="btn btn-primario" data-agregar="${p.id}">Agregar</button>
          <button type="button" class="btn btn-secundario" data-detalle="${p.id}">Detalle</button>
        </div>
      </div>
    </article>
  `).join('');
}

function pintarContador() {
  if ($contador) {
    $contador.textContent = carrito.contar();
  }
}

function aplicarFiltros() {
  const textoBuscado = $buscador ? $buscador.value.trim().toLowerCase() : '';
  const categoriaSeleccionada = $filtroCategoria ? $filtroCategoria.value : 'todas';

  const productosFiltrados = productos.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(textoBuscado);
    const coincideCategoria = categoriaSeleccionada === 'todas' || p.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  pintarCatalogo(productosFiltrados);
}

function mostrarDetalle(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto || !$modalDetalle || !$contenidoModal) return;

  $contenidoModal.innerHTML = `
    <span class="categoria-badge">${producto.categoria}</span>
    <h2 style="margin: 0.5rem 0; font-size: 1.4rem;">${producto.nombre}</h2>
    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px; margin: 0.5rem 0;">
    <p style="color: var(--color-texto-mutado); margin: 0.75rem 0;">${producto.descripcion}</p>
    <p style="font-weight: bold; margin-bottom: 0.5rem;">Stock disponible: <span style="color: var(--color-exito);">${producto.stock} unidades</span></p>
    <p class="precio-producto" style="font-size: 1.4rem; margin-bottom: 1rem;">${soles(producto.precio)}</p>
    <button type="button" class="btn btn-primario" data-agregar="${producto.id}" style="width: 100%;">Agregar al carrito</button>
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


document.addEventListener('DOMContentLoaded', () => {
  pintarCatalogo(productos);
  pintarContador();
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

// ==========================================
// SECCIÓN: Lógica para la vista de carrito.html (R6 y R7)
// ==========================================

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

function pintarVistaCarrito() {
  if (!$itemsCarrito) return; // Si no estamos en carrito.html, salir

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
        <tr style="border-bottom: 1px solid var(--color-borde);">
          <td style="padding: 1rem; display: flex; align-items: center; gap: 1rem;">
            <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            <span>${prod.nombre}</span>
          </td>
          <td style="padding: 1rem;">${soles(prod.precio)}</td>
          <td style="padding: 1rem;">
            <input type="number" min="1" max="${prod.stock}" value="${item.cantidad}" data-cambiar-cantidad="${prod.id}" class="campo-input" style="width: 70px; padding: 0.3rem;">
          </td>
          <td style="padding: 1rem; font-weight: bold;">${soles(subtotalLinea)}</td>
          <td style="padding: 1rem;">
            <button type="button" class="btn btn-secundario" data-quitar="${prod.id}" style="color: var(--color-error); border-color: var(--color-error);">Quitar</button>
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
  $montoDescuento.textContent = `- ${soles(resumen.descuento)}`;
  $montoEnvio.textContent = resumen.envio === 0 ? '¡GRATIS!' : soles(resumen.envio);
  $montoIgv.textContent = soles(resumen.igv);
  $montoTotal.textContent = soles(resumen.total);
}

// Escuchar cambios de cantidad y botones de quitar mediante Delegación de Eventos en la tabla
if ($itemsCarrito) {
  $itemsCarrito.addEventListener('change', e => {
    const inputCantidad = e.target.closest('[data-cambiar-cantidad]');
    if (inputCantidad) {
      const id = inputCantidad.dataset.cambiarCantidad;
      const nuevaCant = parseInt(inputCantidad.value, 10);
      carrito.cambiarCantidad(id, nuevaCant);
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

// Escuchar aplicación de cupones
if ($btnAplicarCupon) {
  $btnAplicarCupon.addEventListener('click', () => {
    const codigo = $inputCupon ? $inputCupon.value : '';
    const desc = calcularDescuento(calcularSubtotal(carrito.items, productos), codigo);

    if (desc > 0) {
      cuponActivo = codigo;
      $mensajeCupon.style.color = 'var(--color-exito)';
      $mensajeCupon.textContent = '¡Cupón aplicado con éxito!';
    } else {
      cuponActivo = '';
      $mensajeCupon.style.color = 'var(--color-error)';
      $mensajeCupon.textContent = 'Cupón inválido o no cumple las condiciones.';
    }
    actualizarResumenPago();
  });
}

// Ejecutar pintado inicial si estamos en la vista de carrito
document.addEventListener('DOMContentLoaded', () => {
  pintarVistaCarrito();
});