// Variables
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// Eventos
window.addEventListener('load', () => {
	formulario.addEventListener('submit', buscarClima);
})

// Funciones
function buscarClima(e) {
	e.preventDefault();

	// Validar
	const ciudad = document.querySelector('#ciudad').value;
	const pais = document.querySelector('#pais').value;

	if (ciudad === '' || pais === '') {
		mostrarError('Ambos campos son obligatorios');
		return;
	}
}

function mostrarError(mensaje) {
	console.log(mensaje);
}