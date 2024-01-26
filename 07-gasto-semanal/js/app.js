//:: Ejercicio: manejo de un presupuesto poniendo en práctica las clases en JavaScript

// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventListeners();
function eventListeners() {
	document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Clases


// Funciones