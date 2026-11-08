
function calcularSubtotal(itemsCarrito, listaProductos) {
  return itemsCarrito.reduce((acumulado, item) => {
    const producto = listaProductos.find(p => p.id === item.id);
    return acumulado + (producto ? producto.precio * item.cantidad : 0);
  }, 0);
}

function calcularDescuento(subtotal, codigoCupon) {
  const cuponLimpio = codigoCupon.trim().toUpperCase();
  if (cuponLimpio === 'AETHER10') {
    return subtotal * 0.10; // 10% de descuento
  }
  if (cuponLimpio === 'AETHER20' && subtotal >= 500) {
    return subtotal * 0.20; // 20% en compras mayores a S/ 500
  }
  return 0;
}

function calcularEnvio(subtotalConDescuento) {
  if (subtotalConDescuento === 0) return 0;
  return subtotalConDescuento >= 300 ? 0 : 15.00;
}

function calcularIGV(montoImponible) {
  return montoImponible * 0.18;
}

function calcularResumenCarrito(itemsCarrito, listaProductos, codigoCupon = '') {
  const subtotal = calcularSubtotal(itemsCarrito, listaProductos);
  const descuento = calcularDescuento(subtotal, codigoCupon);
  const subtotalConDescuento = subtotal - descuento;
  const envio = calcularEnvio(subtotalConDescuento);
  const igv = calcularIGV(subtotalConDescuento);
  const total = subtotalConDescuento + envio;

  return {
    subtotal: subtotal,
    descuento: descuento,
    envio: envio,
    igv: igv,
    total: total
  };
}