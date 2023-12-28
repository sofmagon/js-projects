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
    // Cuando se agrega un curso presionando 'agregar al carrito'
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

    // crear un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Agregando elementos al array del carrito

    // La lógica de usar el spread operator es con el fin de preservar los elementos previos al ir agregando o eliminando
    articulosCarrito = [...articulosCarrito, infoCurso];

    carritoHTML();
}

// Muestra el carrito de compras en el HTML, cada curso será incrustado dentro de <tbody>
function carritoHTML() {

    // Limpiar HTML previo, evitando copias innecesarias por el spread operator
    limpiarHTML();

    // Iterando sobre cada curso seleccionado para generar su información e incrustarla en el carrito
    articulosCarrito.forEach(curso => {
        // Observando el objeto para tomar los elementos necesarios
        console.log(curso);

        // Generando el HTML necesario para mostrar en el carrito
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
        `;
        // Insertando cada <tr> -> <tbody> a su padre <table>
        contenedorCarrito.appendChild(row);
    });
}

// Elimina cursos del <tbody>
function limpiarHTML() {
    // Mientras al menos tenga un elemento
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
