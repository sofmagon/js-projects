const url = 'http://localhost:4000/clientes';

// 1. Crea un nuevo cliente
export const nuevoCliente = async cliente => {
	// console.log(cliente);

	try {
		await fetch(url, {
			method: 'POST',
			// body se envía de 2 formas: string u objeto
			body: JSON.stringify(cliente),
			headers: {
				// esto no sube archivos, sólo texto en JSON
				'Content-Type': 'application/json'
			}
		});
		// Una vez completada la acción (POST), dirigir al home
		window.location.href = 'index.html';
	} catch (error) {
		console.log(error);
	}
}

// 2. Obtiene todos los clientes
export const obtenerClientes = async () => {
	try {
		// Por default fetch envía GET, no hay que especificar un method
		const resultado = await fetch(url);
		// Doble await porque no se está usando axios, requiere que el anterior se haya cumplido
		const clientes = await resultado.json();
		// Se retorna para consumir esa información en otro archivo
		return clientes;
	} catch (error) {
		console.log(error);
	}
}

// 3. Elimina un cliente
export const eliminarCliente = async id => {
	try {
		// based on DOCS: DELETE /posts/:id
		await fetch(`${url}/${id}`, {
			method: 'DELETE'
		});
	} catch (error) {
		console.log(error);
	}
}

// 4. Obtiene un cliente por su ID para poder editarlo
export const obtenerCliente = async id => {
	try {
		// Obteniendo el objeto completo
		const resultado = await fetch(`${url}/${id}`);
		const cliente = await resultado.json();
		console.log(cliente);
	} catch (error) {
		console.log(error);
	}
}