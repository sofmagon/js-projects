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

	// Validar campos
	const ciudad = document.querySelector('#ciudad').value;
	const pais = document.querySelector('#pais').value;
	if (ciudad === '' || pais === '') {
		mostrarError('Ambos campos son obligatorios');
		return;
	}
}

function mostrarError(mensaje) {
	console.log(mensaje);

	// Verificar si ya existe una alerta
	const alerta = document.querySelector('.bg-red-100');
	if (!alerta) {
		// Si no existe, crear alerta con scripting
		const alerta = document.createElement('DIV');
		alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

		alerta.innerHTML = `
		<strong class="font-bold">¡Error!</strong>
		<span class="block">${mensaje}</span>
		`;

		container.appendChild(alerta);
	}
}
