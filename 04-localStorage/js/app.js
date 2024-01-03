// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}

// Funciones

function agregarTweet(e) {
    e.preventDefault();
    // Área donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    // Validación
    if (tweet === '') {
        mostrarError('El campo de texto no puede ir vacío');
        // evita que se ejecuten más líneas, aplica dentro de un if de una función
        return;
    }
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertando en HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminando alerta después de 3s
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}
