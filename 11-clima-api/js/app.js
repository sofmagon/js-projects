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

	// Aprobada la validación
	consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
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

		// Remover la alerta después de 5 segundos
		setTimeout(() => {
			alerta.remove();
		}, 5000);
	}
}

function consultarAPI(ciudad, pais) {
	const appID = '74314bbedf4e498a770529a9de3232ec';
	// Se adapta la URL de la documentación a las variables
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

	// Responde con una URL y al abrirla se visualiza un JSON con la información requerida
	// console.log(url);

	fetch(url)
		.then(respuesta => respuesta.json())
		.then(datos => {
			// Limpiar resultado previo
			limpiarHTML();

			console.log(datos);
			// Evaluar si la ciudad no existe
			if (datos.cod === '404') {
				mostrarError('Ciudad no encontrada');
				return;
			}

			// Mostrar la respuesta en HTML
			mostrarClima(datos);
		})
}

function mostrarClima(datos) {
	// Nested Destructuring
	const { main: { temp, temp_max, temp_min } } = datos;
	console.log(temp);
	// Convertir grados Kelvin a Celsius
	const centigrados = temp - 273.15;
	// Mostrar la temperatura actual
	const actual = document.createElement('P');
	actual.innerHTML = `${centigrados} &#8451;`;
	actual.classList.add('font-bold', 'text-6xl');
	const resultadoDiv = document.createElement('DIV');
	resultadoDiv.classList.add('text-center', 'text-white');
	resultadoDiv.appendChild(actual);
	resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}