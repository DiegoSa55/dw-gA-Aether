const $formContacto = document.querySelector('#form-contacto');

if ($formContacto) {
  const $nombre = document.querySelector('#nombre');
  const $correo = document.querySelector('#correo');
  const $celular = document.querySelector('#celular');
  const $mensaje = document.querySelector('#mensaje');

  function validarCampo(input, condicion, textoError) {
    const feedback = input.nextElementSibling;
    if (condicion) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      input.setAttribute('aria-invalid', 'false');
      return true;
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (feedback) feedback.textContent = textoError;
      return false;
    }
  }

  $formContacto.addEventListener('submit', e => {
    e.preventDefault();

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexCelular = /^9\d{8}$/;

    const okNombre = validarCampo($nombre, $nombre.value.trim().length >= 3, 'Ingresa al menos 3 caracteres.');
    const okCorreo = validarCampo($correo, regexCorreo.test($correo.value.trim()), 'Ingresa un correo válido.');
    const okCelular = validarCampo($celular, regexCelular.test($celular.value.trim()), 'Debe tener 9 dígitos y empezar con 9.');
    const okMensaje = validarCampo($mensaje, $mensaje.value.trim().length >= 10, 'Escribe al menos 10 caracteres.');

    if (okNombre && okCorreo && okCelular && okMensaje) {
      mostrarAviso('Consulta enviada correctamente');
      $formContacto.reset();
      [$nombre, $correo, $celular, $mensaje].forEach(campo => campo.classList.remove('is-valid'));
    }
  });
}