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
    // Objeto con el texto y un método auxiliar como identificador único
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }
    // Agregar mensaje al array con spread operator para preservar el contenido previo
    tweets = [...tweets, tweetObj];
    // Una vez agregado, crear HTML
    crearHTML();
    // Reiniciar el formulario
    formulario.reset();
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

// Mostrar listado de los tweets
function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Crear HTML
            const li = document.createElement('LI');
            li.textContent = tweet.texto;
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agregando tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar HTML previo
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
