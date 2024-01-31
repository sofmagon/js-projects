import { obtenerCliente, editarCliente } from "./API.js";
import { mostrarAlerta, validar } from './funciones.js';

(function () {
	// Campos del formulario para la manipulación de datos
	const nombreInput = document.querySelector('#nombre');
	const emailInput = document.querySelector('#email');
	const telefonoInput = document.querySelector('#telefono');
	const empresaInput = document.querySelector('#empresa');
	const idInput = document.querySelector('#id');

	// Async/await permite bloquear el siguiente código hasta que la promesa de la API esté lista
	document.addEventListener('DOMContentLoaded', async () => {
		// URLSearchParams, define métodos para trabajar con los parámetros de búsqueda de una URL
		const parametrosURL = new URLSearchParams(window.location.search);
		// Entonces se obtiene el ID del cliente deseado
		const idCliente = parseInt(parametrosURL.get('id'));
		// Almacenando el objeto obtenido por la API
		const cliente = await obtenerCliente(idCliente);
		// Mostrar detalle del cliente
		mostrarCliente(cliente);
		// Evento submit al formulario
		const formulario = document.querySelector('#formulario');
		formulario.addEventListener('submit', validarCliente);
	});

	function mostrarCliente(cliente) {
		// Destructuring del objeto obtenido por la API
		const { nombre, email, telefono, empresa } = cliente;
		nombreInput.value = nombre;
		emailInput.value = email;
		telefonoInput.value = telefono;
		empresaInput.value = empresa;
		idInput.value = id;
	}

	function validarCliente(e) {
		e.preventDefault();

		// Objeto con los valores de los campos
		const cliente = {
			nombre: nombreInput.value,
			email: emailInput.value,
			telefono: telefonoInput.value,
			empresa: emailInput.value,
			id: parseInt(idInput.value)
		}
		//console.log(cliente);

		if (validar(cliente)) {
			// Mostrar mensaje
			mostrarAlerta('Todos los campos son obligatorios');
			return;
		}

		// Una vez aprobada la validación, reescribir el objeto
		editarCliente(cliente);
	}
})();