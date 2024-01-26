//:: Ejercicio: manejo de un presupuesto poniendo en práctica las clases. Una encargada de los cálculos y la otra de la UI.

// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventListeners();
function eventListeners() {
	document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Clases
class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
	}
}

class UI {

}

// Funciones
function preguntarPresupuesto() {
	const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
	/* Validaciones:
	.- Si el usuario sólo acepta
	.- o cancela la ventana
	.- o ingresa un NaN
	.- o ingresa un presupuesto 0 o negativo: recargar la página
	*/
	if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
		window.location.reload();
	}
}