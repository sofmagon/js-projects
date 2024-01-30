import { obtenerCliente } from "./API.js";

(function () {
	document.addEventListener('DOMContentLoaded', () => {
		// URLSearchParams, define métodos para trabajar con los parámetros de búsqueda de una URL
		const parametrosURL = new URLSearchParams(window.location.search);
		// Entonces se obtiene el ID del cliente deseado
		const idCliente = parseInt(parametrosURL.get('id'));
		obtenerCliente(idCliente);
	})
})();