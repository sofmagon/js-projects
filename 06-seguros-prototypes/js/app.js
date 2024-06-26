//:: Ejercicio: implementación de Prototypes sobre dos objetos. Uno para la cotización del seguro y otro para la UI.

function Seguro(marca, year, tipo) {
	this.marca = marca;
	this.year = year;
	this.tipo = tipo;
}

// Proto. Realiza la cotización del seguro con los datos
Seguro.prototype.cotizarSeguro = function () {
	/* Incrementos al valor del auto con base a su tipo
	1.- Americano 15%
	2.- Asiático 05%
	3.- Europeo 35%
	*/
	// console.log(this.marca);

	const precioBase = 2000;
	let precioFinal;

	// Calculando el precio final
	switch (this.marca) {
		case '1':
			precioFinal = precioBase * 1.15;
			break;
		case '2':
			precioFinal = precioBase * 1.05;
			break;
		case '3':
			precioFinal = precioBase * 1.35;
			break;
		default:
			break;
	}

	// Descuento del 3% por cada año que el año seleccionado sea más viejo que el actual
	const diferencia = new Date().getFullYear() - this.year;
	precioFinal -= ((diferencia * 3) * precioFinal) / 100;

	/* Calcular el precio final con base en el tipo de seguro.
	1.- Básico: se multiplica por un 30% más.
	2.- Completo: se multiplica por un 50% más.
	*/

	if (this.tipo === 'basico') {
		precioFinal *= 1.30;
	} else {
		precioFinal *= 1.50;
	}

	// console.log(precioFinal);

	return precioFinal;
}

function UI() { }
// Instanciar UI de manera global
const ui = new UI();

// Proto. Genera los años del select
UI.prototype.llenarOpciones = () => {
	const max = new Date().getFullYear();
	const min = max - 20;
	const selectYear = document.querySelector('#year');

	// Iterando sobre el año máximo hasta el mínimo creando las diferentes opciones del select
	for (let i = max; i >= min; i--) {
		let option = document.createElement('OPTION');
		option.value = i;
		option.textContent = i;
		selectYear.appendChild(option);
	}
}

// Proto. Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
	const div = document.createElement('DIV');
	if (tipo === 'error') {
		div.classList.add('error');
	} else {
		div.classList.add('correcto');
	}

	div.classList.add('mensaje', 'mt-10');
	div.textContent = mensaje;
	// Insertar en HTML
	const formulario = document.querySelector('#cotizar-seguro');
	formulario.insertBefore(div, document.querySelector('#resultado'));
	// Ocultar la alerta después de 3ms
	setTimeout(() => {
		div.remove();
	}, 3000);
}

// Proto. Mostrar el detalle del seguro cotizado y la cantidad total
UI.prototype.mostrarResultado = (total, seguro) => {
	// Destructuring del objeto Seguro
	const { marca, year, tipo } = seguro;
	// Marca contiene un número, convertirlo a palabra para el usuario.
	let textoMarca;
	switch (marca) {
		case '1':
			textoMarca = 'Americano';
			break;
		case '2':
			textoMarca = 'Asiático';
			break;
		case '3':
			textoMarca = 'Europeo';
			break;
		default:
			break;
	}

	const div = document.createElement('DIV');
	div.classList.add('mt-10');
	div.innerHTML = `
		<p class="header">Tu Resumen</p>
		<p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
		<p class="font-bold">Año: <span class="font-normal">${year}</span></p>
		<p class="font-bold">Tipo seguro: <span class="font-normal capitalize">${tipo}</span></p>
		<p class="font-bold">Total: <span class="font-normal">$${total} MXN</span></p>
	`;

	// Colocándolo en el HTML
	const resultadoDiv = document.querySelector('#resultado');

	// Mostrar el spinner
	const spinner = document.querySelector('#cargando');
	spinner.style.display = 'block';
	// Ocultar el spinner al mismo tiempo que el mensaje
	setTimeout(() => {
		spinner.style.display = 'none';
		// Mostrar el resultado una vez eliminado el spinner
		resultadoDiv.appendChild(div);
	}, 3000);
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
	// Generando los años del select
	ui.llenarOpciones();
})

eventListeners();
function eventListeners() {
	const formulario = document.querySelector('#cotizar-seguro');
	formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
	e.preventDefault();

	// Leer la marca seleccionada
	const marca = document.querySelector('#marca').value;
	// Leer el año seleccionado
	const year = document.querySelector('#year').value;
	// Leer el tipo de cobertura
	const tipo = document.querySelector('input[name="tipo"]:checked').value;

	if (marca === '' || year === '' || tipo === '') {
		ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
		return;
	}

	ui.mostrarMensaje('Cotizando. Espera un momento', 'exito');

	// Ocultar las cotizaciones previas
	const resultados = document.querySelector('#resultado div');
	if (resultados != null) {
		resultados.remove();
	}

	// Después de la validación, instanciar el objeto Seguro recibiendo como parámetros las variables ya obtenidas
	const seguro = new Seguro(marca, year, tipo);
	const total = seguro.cotizarSeguro();

	ui.mostrarResultado(total, seguro);
}