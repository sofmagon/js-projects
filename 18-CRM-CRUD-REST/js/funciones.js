export function mostrarAlerta(mensaje) {
	// Buscar una alerta generada previamente
	const alerta = document.querySelector('.bg-red-100');
	if (!alerta) {
		// Si no existe, crearla
		const alerta = document.createElement('P');
		alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

		// Colocando mensajes
		alerta.innerHTML = `
			<strong class="font-bold">¡Error!</strong>
			<span class="block sm:inline">${mensaje}</span>
		`;

		// Insertando alerta en HTML
		const formulario = document.querySelector('#formulario');
		formulario.appendChild(alerta);
		// Removerla después de 3s para evitar duplicidad
		setTimeout(() => {
			alerta.remove();
		}, 3000);
	}
}