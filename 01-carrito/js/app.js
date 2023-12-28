//:: Ejercicio: Agregar y eliminar elementos al carrito de compras

// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// Eventos
cargarEventListener();

function cargarEventListener() {
    // Cuando agregas un curso presionando 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e) {
    // Evitando la acción natural del botón (#)
    e.preventDefault();

    // Click en el elemento con la clase .agregar-carrito <a> y evitando event bubbling...
    if (e.target.classList.contains('agregar-carrito')) {
        // ...conocer el padre del botón: .info-card y su padre a su vez: .card, para leer el contenido y mostrarlo en el carrito (nombre, precio e imagen)
        console.log(e.target.parentElement.parentElement);
    }
}
