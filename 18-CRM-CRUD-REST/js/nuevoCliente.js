import { mostrarAlerta } from './funciones.js';

// IIFE
(function () {
	const formulario = document.querySelector('#formulario');
	formulario.addEventListener('submit', validarCliente);

	function validarCliente(e) {
		e.preventDefault();

		const nombre = document.querySelector('#nombre').value;
		const email = document.querySelector('#email').value;
		const telefono = document.querySelector('#telefono').value;
		const empresa = document.querySelector('#empresa').value;

		// Object literal enhancement
		const cliente = {
			nombre,
			email,
			telefono,
			empresa
		}

		if (validar(cliente)) {
			// Mostrar mensaje
			mostrarAlerta('Todos los campos son obligatorios');
			return;
		}

		console.log('...Validación aprobada');
	}

	function validar(obj) {
		// Si al menos uno está vacío retorna true
		return !Object.values(obj).every(input => input !== '');
	}
})();