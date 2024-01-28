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
		mostrarAlerta('Ingresa un término de búsqueda');
		return;
	}

	buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
	// Verificar si ya existe una alerta para evitar duplicidad
	const existeAlerta = document.querySelector('.bg-red-100');
	if (!existeAlerta) {
		// Creando alerta con scripting
		const alerta = document.createElement('P');
		alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
		alerta.innerHTML = `
		<strong class="font-bold">¡Error!</strong>
		<span class="block sm:inline">${mensaje}</span>
	`;
		// Insertando la alerta en HTML
		formulario.appendChild(alerta);
		// Eliminar la alerta después de 3 segundos
		setTimeout(() => {
			alerta.remove();
		}, 3000);
	}
}

function buscarImagenes(termino) {
	const APIkey = '37139059-b0ef9a169f9e4cc2ee7649ba0';
	// Se adapta la URL de la documentación a las variables
	const url = `https://pixabay.com/api/?key=${APIkey}&q=${termino}`;

	fetch(url)
		.then(respuesta => respuesta.json())
		.then(resultado => {
			console.log(resultado.hits);
		})
}