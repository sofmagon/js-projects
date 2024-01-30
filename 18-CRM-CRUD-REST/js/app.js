import { obtenerClientes } from "./API.js";

(function () {
	const listado = document.querySelector('#listado-clientes');

	document.addEventListener('DOMContentLoaded', mostrarClientes);

	async function mostrarClientes() {
		const clientes = await obtenerClientes();
		// Async/await permite bloquear el siguiente código hasta que DOMContentLoaded esté listo o seguirá mostrando pending
		console.log(clientes);
	}
})();