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

	// Mostrar el spinner antes de recibir la respuesta
	Spinner();

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
	const { name, main: { temp, temp_max, temp_min } } = datos;
	// Convertir grados Kelvin a Celsius
	const tempActual = convertirKelvin(temp);
	const tempMax = convertirKelvin(temp_max);
	const tempMin = convertirKelvin(temp_min);

	// Mostrar el nombre de la ciudad
	const nombreCiudad = document.createElement('P');
	nombreCiudad.textContent = `Clima en ${name}`;
	nombreCiudad.classList.add('font-bold', 'text-2xl');

	// Mostrar la temperatura actual
	const actual = document.createElement('P');
	actual.innerHTML = `${tempActual} &#8451;`;
	actual.classList.add('font-bold', 'text-6xl');
	// Mostrar la temperatura máxima
	const maxima = document.createElement('P');
	maxima.innerHTML = `Max: ${tempMax} &#8451;`;
	maxima.classList.add('text-xl');
	// Mostrar la temperatura mínima
	const minima = document.createElement('P');
	minima.innerHTML = `Min: ${tempMin} &#8451;`;
	minima.classList.add('text-xl');

	// Insertar en el HTML
	const resultadoDiv = document.createElement('DIV');
	resultadoDiv.classList.add('text-center', 'text-white');
	resultadoDiv.appendChild(nombreCiudad);
	resultadoDiv.appendChild(actual);
	resultadoDiv.appendChild(maxima);
	resultadoDiv.appendChild(minima);
	resultado.appendChild(resultadoDiv);
}

// Helper
const convertirKelvin = grados => parseInt(grados - 273.15);

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

function Spinner() {
	// Limpiar HTML previo
	limpiarHTML();

	// Creando el spinner con scripting
	const divSpinner = document.createElement('DIV');
	divSpinner.classList.add('sk-fading-circle');
	divSpinner.innerHTML = `
		<div class="sk-circle1 sk-circle"></div>
		<div class="sk-circle2 sk-circle"></div>
		<div class="sk-circle3 sk-circle"></div>
		<div class="sk-circle4 sk-circle"></div>
		<div class="sk-circle5 sk-circle"></div>
		<div class="sk-circle6 sk-circle"></div>
		<div class="sk-circle7 sk-circle"></div>
		<div class="sk-circle8 sk-circle"></div>
		<div class="sk-circle9 sk-circle"></div>
		<div class="sk-circle10 sk-circle"></div>
		<div class="sk-circle11 sk-circle"></div>
		<div class="sk-circle12 sk-circle"></div>
	`;

	resultado.appendChild(divSpinner);
}