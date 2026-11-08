// js/formulario.js - Validación exclusiva mediante JavaScript (R9)

const $formContacto = document.querySelector('#form-contacto');
const $mensajeExito = document.querySelector('#mensaje-exito');

// Función pura de validación que retorne un objeto con los errores encontrados
function validarFormulario(datos) {
  const errores = {};

  // 1. Validar Nombre (mínimo 3 letras)
  if (!datos.nombre || datos.nombre.trim().length < 3) {
    errores.nombre = 'Escribe al menos 3 letras.';
  }

  // 2. Validar Correo (formato mediante Expresión Regular)
  const regexCorreo = /^\S+@\S+\.\S+$/;
  if (!datos.correo || !regexCorreo.test(datos.correo.trim())) {
    errores.correo = 'El correo no tiene un formato válido.';
  }

  // 3. Validar Celular (9 dígitos y debe empezar obligatoriamente con 9)
  const regexCelular = /^9\d{8}$/;
  if (!datos.celular || !regexCelular.test(datos.celular.trim())) {
    errores.celular = 'Debe tener 9 dígitos y empezar con 9.';
  }

  // 4. Validar Mensaje (mínimo 10 caracteres)
  if (!datos.mensaje || datos.mensaje.trim().length < 10) {
    errores.mensaje = 'Escribe una consulta de al menos 10 caracteres.';
  }

  return errores;
}

// Escuchar evento submit en el formulario
if ($formContacto) {
  $formContacto.addEventListener('submit', e => {
    e.preventDefault(); // Detener el envío tradicional del navegador

    // Capturar todos los pares clave/valor del formulario
    const datos = Object.fromEntries(new FormData($formContacto));
    const errores = validarFormulario(datos);

    const campos = ['nombre', 'correo', 'celular', 'mensaje'];
    let hayErrores = false;

    // Iterar sobre cada campo para mostrar mensaje de error y actualizar aria-invalid
    campos.forEach(campo => {
      const $error = document.querySelector(`#error-${campo}`);
      const $input = $formContacto.elements[campo];

      if (errores[campo]) {
        hayErrores = true;
        if ($error) $error.textContent = errores[campo];
        if ($input) $input.setAttribute('aria-invalid', 'true');
      } else {
        if ($error) $error.textContent = '';
        if ($input) $input.setAttribute('aria-invalid', 'false');
      }
    });

    // Si todos los campos son válidos, resetear formulario y notificar al usuario
    if (!hayErrores) {
      $formContacto.reset();
      campos.forEach(campo => {
        const $input = $formContacto.elements[campo];
        if ($input) $input.removeAttribute('aria-invalid');
      });

      if ($mensajeExito) {
        $mensajeExito.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
        $mensajeExito.style.display = 'block';
        setTimeout(() => {
          $mensajeExito.style.display = 'none';
        }, 4000);
      }
    }
  });
}