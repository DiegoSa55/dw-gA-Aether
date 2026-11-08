
class Carrito {
  constructor(clave = 'carrito_aether') {
    this.clave = clave;
    this.items = JSON.parse(localStorage.getItem(this.clave)) ?? [];
  }

  agregar(id) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.cantidad++;
    } else {
      this.items.push({ id: id, cantidad: 1 });
    }
    this.guardar();
  }

  quitar(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.guardar();
  }

  cambiarCantidad(id, nuevaCantidad) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      if (nuevaCantidad <= 0) {
        this.quitar(id);
      } else {
        item.cantidad = nuevaCantidad;
        this.guardar();
      }
    }
  }

  contar() {
    return this.items.reduce((acc, item) => acc + item.cantidad, 0);
  }

  guardar() {
    localStorage.setItem(this.clave, JSON.stringify(this.items));
  }
}