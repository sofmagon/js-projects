import { obtenerCliente } from "./API.js";

(function () {
	// Async/await permite bloquear el siguiente código hasta que la promesa de la API esté lista

	document.addEventListener('DOMContentLoaded', async () => {
		// URLSearchParams, define métodos para trabajar con los parámetros de búsqueda de una URL
		const parametrosURL = new URLSearchParams(window.location.search);
		// Entonces se obtiene el ID del cliente deseado
		const idCliente = parseInt(parametrosURL.get('id'));
		// Almacenando el objeto obtenido por la API
		const cliente = await obtenerCliente(idCliente);
		console.log(cliente);
	})
})();