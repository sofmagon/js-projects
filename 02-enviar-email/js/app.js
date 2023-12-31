//:: Ejercicio: Simular el envío de un email, validando todos los campos

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    // Eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e) {
        // Conocer lo que escribió el usuario
        // console.log(e.target.value);

        // Conocer qué elemento disparó la alerta
        // console.log(e.target.id);

        if (e.target.value.trim() === '') {

        } else {

        }
    }

    function mostrarAlerta(mensaje) {
        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario
        formulario.appendChild(error);
    }
});
