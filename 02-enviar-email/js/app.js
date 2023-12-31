//:: Ejercicio: Simular el envío de un email, validando todos los campos

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    // Eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    // Objeto: mensaje a enviar
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    function validar(e) {
        /* Conocer lo que escribió el usuario
        console.log(e.target.value);

        Conocer qué elemento disparó la alerta
        console.log(e.target.id);

        Conocer el elemento padre del input que dispara la alerta
        console.log(e.target.parentElement); */

        // Evaluando el contenido de todos los campos
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            // Reiniciando el valor del objeto que haya sido removido del formulario
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        // Verificar si el email ingresado tiene un formato válido. La segunda condición se niega para evaluar sobre un resultado false
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('Email inválido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar la información ingresada al objeto, en este punto se han aprobado todas las validaciones.
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove()
        }

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario a través de la referencia
        //? referencia: traversing the DOM (e.target.parentElement)
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Comprobar si ya existe una alerta: se debe acotar la búsqueda sólo al input que dispara la alerta con la referencia: e.target.parentElement
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        // Retornará un array con los valores del objeto; al ser un array el método .includes() verificará si al menos uno de ellos está vacío
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }

        // console.log(email);
    }
});
