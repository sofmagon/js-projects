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
