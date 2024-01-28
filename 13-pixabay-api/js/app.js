// Variables
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

// Eventos
window.onload = () => {
	formulario.addEventListener('submit', validarFormulario);
}

// Funciones
function validarFormulario(e) {
	e.preventDefault();

	const terminoBusqueda = document.querySelector('#termino').value;
	if (terminoBusqueda === '') {
		console.log('Agrega un término de búsqueda');
		return;
	}
}
