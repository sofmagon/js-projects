const url = 'http://localhost:4000/clientes';

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
		})
	} catch (error) {
		console.log(error);
	}
}