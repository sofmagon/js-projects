//:: Ejercicio: Simular el envío de un email, validando todos los campos

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');

    // Eventos.- callback: cuando un evento ocurre y se dispara una función
    inputEmail.addEventListener('blur', function (e) {
        // Conociendo lo que escribió el usuario
        console.log(e.target.value);
    });

    inputAsunto.addEventListener('blur', function (e) {
        console.log(e.target.value);
    });

    inputMensaje.addEventListener('blur', function (e) {
        console.log(e.target.value);
    });
});
