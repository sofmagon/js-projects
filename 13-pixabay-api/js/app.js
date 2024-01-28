// Variables
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');
const registrosPorPagina = 40;
let totalPaginas;
let iterador;
// Por defecto la página actual será 1
let paginaActual = 1;

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

	buscarImagenes();
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

function buscarImagenes() {
	const termino = document.querySelector('#termino').value;
	const APIkey = '37139059-b0ef9a169f9e4cc2ee7649ba0';
	// Se adapta la URL de la documentación a las variables
	const url = `https://pixabay.com/api/?key=${APIkey}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

	fetch(url)
		.then(respuesta => respuesta.json())
		.then(resultado => {
			// Visualizar el objeto
			console.log(resultado);
			// totalHits contiene el número de imágenes permitido por la API, máximo 500; para poder calcular la paginación
			totalPaginas = calcularPaginas(resultado.totalHits);
			console.log(totalPaginas);
			// hits contiene el array con los resultados
			mostrarImagenes(resultado.hits);
		})
}

// Generador que va a registrar la cantidad de páginas de acuerdo al total de páginas calculado previamente
function* crearPaginador(total) {
	for (let i = 1; i <= total; i++) {
		// Registrar los valores internamente del generador
		yield i;
	}
}

function calcularPaginas(total) {
	// .ceil redondea hacia arriba porque al generar la paginación hay que cubrir todos los elementos obtenidos
	return parseInt(Math.ceil(total / registrosPorPagina));
}

function mostrarImagenes(imagenes) {
	// Visualizar el array
	console.log(imagenes);

	// Limpiar HTML de consulta previa
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}

	// Iterar sobre el array de imágenes y construir el HTML
	imagenes.forEach(imagen => {
		// Destructuring del objeto respuesta
		const { previewURL, likes, views, largeImageURL } = imagen;
		resultado.innerHTML += `
			<div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
				<div class="bg-white">
					<img class="w-full" src="${previewURL}"/>
					<div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light"> Me Gusta</span></p>

						<p class="font-bold">${views} <span class="font-light"> Veces vista</span></p>

						<a href=${largeImageURL} rel="noopener noreferrer"
                        target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                    </div>
				</div>
			</div>
		`;
	});

	// Limpiar paginador previo
	while (paginacionDiv.firstChild) {
		paginacionDiv.removeChild(paginacionDiv.firstChild)
	}

	// Después de iterar y generar el HTML para todas las cards de imágenes, generar el HTML de la paginación
	imprimirPaginador()
}

function imprimirPaginador() {
	iterador = crearPaginador(totalPaginas);
	// .next devuelve un objeto con las propiedades: done (booleano) y value (valor registrado de yield)
	// console.log(iterador.next());

	while (true) {
		// Destructuring
		const { value, done } = iterador.next();
		// Si ya llegó al final, no hacer nada
		if (done) return;

		// Caso contrario, crea un botón por cada elemento del generador (paginador)
		const boton = document.createElement('A');
		boton.href = '#';
		// Incrustando el valor de la paginación en un atributo personalizado
		boton.dataset.pagina = value;
		boton.textContent = value;
		boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');
		boton.onclick = () => {
			paginaActual = value;
			//console.log(paginaActual);
			// Volver a consultar la API en la nueva página
			buscarImagenes();
		}
		// Incrustando el botón
		paginacionDiv.appendChild(boton);
	}
}
