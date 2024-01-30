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

		// Si al menos uno está vacío retorna true
		console.log(!Object.values(cliente).every(input => input !== ''));
	}
})();