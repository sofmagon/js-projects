//:: Ejercicio: Agregar y eliminar elementos al carrito de compras

// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Eventos
cargarEventListener();

function cargarEventListener() {
    // Cuando agregas un curso presionando 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones

// Agregando cursos al carrito
function agregarCurso(e) {
    // Evitando la acción natural del botón (#)
    e.preventDefault();

    // Click en el elemento con la clase .agregar-carrito <a> y evitando event bubbling...
    if (e.target.classList.contains('agregar-carrito')) {
        // ...conocer el padre del botón: .info-card y su padre a su vez: .card, para leer el contenido y mostrarlo en el carrito (nombre, precio e imagen)
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee el contenido de .card y extrae lo necesario para mostrar en el carrito
function leerDatosCurso(curso) {
    // obteniendo el padre el curso seleccionado
    console.log(curso);

    // crar un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    console.log(infoCurso);
}
