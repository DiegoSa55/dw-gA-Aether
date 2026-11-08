# AETHER Studio — E-Commerce de Periféricos de Alta Precisión

> **Proyecto Académico | Asignatura: Diseño Web**  
> **Universidad Continental (2026)**  
> **Versión:** `v0.3` | **Estado:** Desplegado al 30% (C2)

---

## 🌐 Enlaces del Proyecto

- **Sitio Web Publicado (GitHub Pages):** [https://diegosa55.github.io/dw-gA-Aether/](https://diegosa55.github.io/dw-gA-Aether/)
- **Repositorio de Código (GitHub):** [https://github.com/DiegoSa55/dw-gA-Aether](https://github.com/DiegoSa55/dw-gA-Aether)

---

## 📌 Descripción del Proyecto

**AETHER Studio** es una tienda en línea enfocada en la venta de periféricos y accesorios de alta precisión para entusiastas y profesionales. El proyecto ha sido maquetado y programado desde cero utilizando estándares web modernos (HTML5 semántico, CSS3 modular mediante custom properties y JavaScript ES6 orientada a objetos), sin la dependencia de librerías o frameworks externos.

---

## 🛠️ Tecnologías y Arquitectura

- **HTML5 Semántico:** Uso riguroso de etiquetas `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>` para accesibilidad y SEO.
- **CSS3 Avanzado:** 
  - Variables CSS globales (`css/variables.css`) para mantener consistencia cromática y tipográfica.
  - Diseño adaptativo (Responsive Web Design) mediante Flexbox y CSS Grid (`css/estilos.css`).
  - Animaciones y transiciones sutiles para microinteracciones de UI.
- **JavaScript ES6+ (Modular & POO):**
  - **Programación Orientada a Objetos:** Clase `Carrito` (`js/carrito.js`) que administra la lógica de estado del carrito.
  - **Persistencia de Datos:** Uso de `localStorage` (`JSON.parse` / `JSON.stringify`) para conservar el carrito entre sesiones.
  - **Cálculos Matemáticos Puros:** Funciones centralizadas en `js/calculos.js` para desglose de subtotal, IGV (18%), cupones de descuento y costo de envío.
  - **Delegación de Eventos:** Intercepción eficiente de clics en catálogo y tabla sin sobrecargar el DOM.
  - **Validación de Formularios:** Uso de `novalidate` en `<form>` y atributos `aria-invalid` con validación regex en tiempo de envío.

---

## 📁 Estructura del Repositorio

```text
dw-gA-Aether/
├── index.html              # Portada / Home principal
├── catalogo.html           # Renderizado dinámico de productos
├── carrito.html            # Gestión de compras, tabla y desglose
├── contacto.html           # Formulario de soporte con validación JS
├── css/
│   ├── variables.css       # Paleta de colores, fuentes y sombras
│   └── estilos.css         # Layout global, responsive design y UI
├── js/
│   ├── datos.js            # Fuente de datos (Mock de productos)
│   ├── carrito.js          # Clase POO Carrito y localStorage
│   ├── calculos.js         # Lógica matemática pura de cobro
│   ├── formulario.js       # Validación del formulario de contacto
│   └── app.js              # Controlador principal y renderizado DOM
├── docs/
│   ├── bitacora.md         # Registro de avances, decisiones y commits
│   └── declaracion-ia.md   # Informe de transparencia del uso de IA
└── README.md               # Documentación general del proyecto