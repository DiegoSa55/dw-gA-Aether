# Bitácora de Desarrollo y Registro de Decisiones

**Proyecto:** AETHER Studio — E-Commerce de Periféricos  
**Asignatura:** Diseño Web — Universidad Continental  
**Integrantes:** Diego Salazar | Airton Gutierrez Palomino  
**Período:** 2026  

---

## 📝 Registro de Sesiones de Trabajo y Avances

### Sesión 1: Maquetación Semántica, Branding y Sistema de Variables CSS
- **Integrantes:** Diego Salazar, Airton Gutierrez Palomino.
- **Objetivo:** Definir la arquitectura HTML5 y la identidad cromática global del sitio web.
- **Acciones realizadas:**
  - Creación del archivo `css/variables.css` centralizando la paleta en modo oscuro (`--color-fondo: #0f172a`, `--color-superficie: #1e293b`) y acentos cian (`--color-primario: #06b6d4`).
  - Maquetación de la estructura semántica de `index.html`, `catalogo.html`, `carrito.html` y `contacto.html` utilizando `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>` y `<footer>`.
- **Decisión técnica:** Desarrollar el sistema con CSS nativo puro (sin Bootstrap ni Tailwind) para asegurar un código ligero y cumplir con el requerimiento de desarrollo desde cero.

---

### Sesión 2: Programación POO del Carrito y Persistencia Local
- **Integrantes:** Airton Gutierrez Palomino, Diego Salazar.
- **Objetivo:** Construir la lógica de gestión de productos y persistencia en navegador.
- **Acciones realizadas:**
  - Creación del archivo `js/datos.js` con el mock de catálogo de periféricos.
  - Implementación de la clase `Carrito` en `js/carrito.js` con métodos POO: `agregar()`, `eliminar()`, `actualizarCantidad()`, `vaciar()` y `guardar()`.
  - Integración con el API `localStorage` utilizando `JSON.stringify()` al sincronizar y `JSON.parse()` con operador de fusión nula `?? []` al inicializar la sesión.

---

### Sesión 3: Centralización de Cálculos Matemáticos e IGV
- **Integrantes:** Diego Salazar, Airton Gutierrez Palomino.
- **Objetivo:** Implementar la matemática comercial de la tienda en funciones puras e independientes del DOM.
- **Acciones realizadas:**
  - Creación de `js/calculos.js` con las funciones: `calcularSubtotal()`, `calcularEnvio()`, `calcularDescuento()` y `calcularIGV()`.
  - Lógica para el cupón de descuento `AETHER10` (10% de rebaja en el subtotal).
  - Regla comercial de envío gratuito para pedidos con importe igual o mayor a S/ 300.00 soles (tarifa plana de S/ 15.00 en caso contrario).
  - Formateo estricto de valores a dos decimales con `.toFixed(2)` para evitar errores de precisión flotante.

---

### Sesión 4: Validación de Formulario Accesible y Depuración Responsive de UI
- **Integrantes:** Diego Salazar, Airton Gutierrez Palomino.
- **Objetivo:** Garantizar la accesibilidad del formulario de contacto y resolver problemas de visualización en el carrito.
- **Acciones realizadas:**
  - Implementación de `novalidate` en `<form>` dentro de `contacto.html` y validación con expresiones regulares mediante `js/formulario.js`.
  - Inserción del atributo de accesibilidad `aria-invalid="true"` y mensajes `<small class="mensaje-error">` dinámicos al detectar campos vacíos o con formato erróneo.
  - **Corrección de Error Visual en `carrito.html`:** Refactorización de la estructura CSS Flexbox/Grid en `.layout-carrito` para evitar la sobreposición entre la tabla de items y la tarjeta resumen del pedido en pantallas medianas/móviles.
  - **Restablecimiento de Estructura HTML:** Solución del problema de renderizado en blanco sin estilos provocado por la omisión de las etiquetas `<!DOCTYPE html>`, `<head>` y `<body>` al editar fragmentos de código, asegurando la carga limpia de scripts al final del documento.

---

### Sesión 5: Git, Resolución de Errores de Entorno, Tagging v0.3 y Despliegue
- **Integrantes:** Diego Salazar (Git Admin), Airton Gutierrez Palomino.
- **Objetivo:** Configurar el repositorio público en GitHub, registrar el hito de versión `v0.3` y publicar en la Web.
- **Acciones realizadas:**
  - Instalación de Git en el entorno local y configuración global de usuario (`user.name` y `user.email`).
  - **Resolución de Error de Entorno:** Solución al fallo `fatal: detected dubious ownership` ejecutando el comando de excepción de directorio seguro `git config --global --add safe.directory "*"`.
  - Creación del commit consolidado de la entrega C2 (30%).
  - Etiquetado oficial del proyecto con el comando `git tag v0.3` y sincronización con GitHub.
  - Publicación y despliegue del sitio a través de **GitHub Pages** (`https://diegosa55.github.io/dw-gA-Aether/`), verificando la ausencia de errores en la consola de desarrollador (`F12`).