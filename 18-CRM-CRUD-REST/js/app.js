import { obtenerClientes } from "./API.js";

(function () {
	const listado = document.querySelector('#listado-clientes');

	document.addEventListener('DOMContentLoaded', mostrarClientes);

	function mostrarClientes() {
		const clientes = obtenerClientes();
		console.log(clientes);
	}
})();