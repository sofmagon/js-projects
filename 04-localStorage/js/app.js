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
        console.log('...No puede ir vacío');
        // evita que se ejecuten más líneas, aplica dentro de un if de una función
        return;
    }
}
