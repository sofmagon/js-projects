//:: Ejercicio: implementación de Prototypes

// Constructores. Uno para la cotización del seguro y otro para la interfaz de usuario

function Seguro(marca, year, tipo) {
	this.marca = marca;
	this.year = year;
	this.tipo = tipo;
}

function UI() { }

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

// Instanciar UI
const ui = new UI();
console.log(ui);

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

	} else {
		console.log('...Sí pasó la validación');
	}
}