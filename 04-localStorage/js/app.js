// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        // Recuperando los tweets de localStorage para mostrarlos en el HTML, el OR es para evitar fallos por si 'tweets' está vacío
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
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
            // Crear HTML de los tweets
            const li = document.createElement('LI');
            li.textContent = tweet.texto;
            listaTweets.appendChild(li);
            // Agregar botón para eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            li.appendChild(btnEliminar);
            // Agregando función de eliminar para dicho botón
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
        });
    }

    sincronizarStorage();
}

// Agregando tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminando un tweet
function borrarTweet(id) {
    // .filter() genera un nuevo array, en este caso se asignará al array 'tweets'
    // Iterará sobre el array 'tweets' para preservar los que sean diferentes al que se desea eliminar.
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar HTML previo
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
