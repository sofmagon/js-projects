//:: Ejercicio: manejo de un presupuesto poniendo en práctica las clases. Una encargada de los cálculos y la otra de la UI.

// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
// Esta variable global permitirá la comunicación entre la clase Presupuesto y la función preguntarPresupuesto
let presupuesto;

// Eventos
eventListeners();
function eventListeners() {
	document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
	formulario.addEventListener('submit', agregarGasto);
}

// Clases
class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		// Cuando se instancia esta clase, el presupuesto asignado es el mismo restante. Ya que no se han generado gastos.
		this.restante = Number(presupuesto);
		this.gastos = [];
	}

	nuevoGasto(gasto) {
		// Hacer una copia del array como esté y agregando el nuevo gasto
		this.gastos = [...this.gastos, gasto];
	}
}

class UI {
	// La función recibe el objeto presupuesto
	insertarPresupuesto(cantidad) {
		// Destructuring del objeto presupuesto
		const { presupuesto, restante } = cantidad;
		// Mostrando en el HTML
		document.querySelector('#total').textContent = presupuesto;
		document.querySelector('#restante').textContent = restante;
	}

	// Genera alertas reutilizables
	imprimirAlerta(mensaje, tipo) {
		const divAlerta = document.createElement('DIV');
		divAlerta.classList.add('text-center', 'alert');

		if (tipo === 'error') {
			divAlerta.classList.add('alert-danger')
		} else {
			divAlerta.classList.add('alert-success');
		}

		// Agregar texto a esa alerta
		divAlerta.textContent = mensaje;
		// Insertar en el HTML
		document.querySelector('.primario').insertBefore(divAlerta, formulario);

		// Remover la alerta después de 300ms
		setTimeout(() => {
			divAlerta.remove();
		}, 3000);
	}

	// .- Método que toma como referencia el destructuring del objeto presupuesto
	agregarGastoListado(gastos) {
		// Primero eliminar cualquier gasto agregado, para evitar duplicados. El uso de this es porque convive en la misma clase.
		this.limpiarHTML();

		// Iterando sobre gastos (es un array de objetos)
		gastos.forEach(gasto => {
			// Destructuring el objeto gasto
			const { cantidadGasto, nombreGasto, id } = gasto;

			// Crear lista HTML
			const nuevoGasto = document.createElement('LI');
			nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
			// Incrustando el ID en un atributo personalizado
			nuevoGasto.dataset.id = id;

			// HTML del gasto
			nuevoGasto.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pill"> ${cantidadGasto} </span>`;

			// Botón para eliminar el gasto
			const btnBorrar = document.createElement('BUTTON');
			btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
			btnBorrar.textContent = 'Borrar'
			nuevoGasto.appendChild(btnBorrar);

			// Insertar todos los gastos en HTML
			gastoListado.appendChild(nuevoGasto);
		});
	}

	limpiarHTML() {
		// Al insertar elementos con appendChild se clona el anterior. Por lo tanto, remover desde el primer elemento existente.
		while (gastoListado.firstChild) {
			gastoListado.removeChild(gastoListado.firstChild);
		}
	}
}

const ui = new UI();

// Funciones
function preguntarPresupuesto() {
	const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
	/* Validaciones:
	.- Si el usuario sólo acepta
	.- o cancela la ventana
	.- o ingresa un NaN
	.- o ingresa un presupuesto 0 o negativo: recargar la página
	*/
	if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
		window.location.reload();
	}

	// Pasando la validación, instanciar la clase Presupuesto
	presupuesto = new Presupuesto(presupuestoUsuario);

	// Insertar presupuesto y restante en el HTML
	ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
	e.preventDefault();
	// Leer los dos inputs
	const nombreGasto = document.querySelector('#gasto').value;
	const cantidadGasto = Number(document.querySelector('#cantidad').value);
	// Validaciones. return evita que se ejecute código fuera de las condiciones
	if (nombreGasto === '' || cantidadGasto === '') {
		ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
	} else if (cantidadGasto <= 0 || isNaN(cantidadGasto)) {
		ui.imprimirAlerta('Cantidad no válida', 'error');
		return;
	}

	// console.log('Agregando gasto');

	/*
	Generar un objeto con el gasto. Esta sintaxis es lo contrario al destructing, se conoce como Object Literal Enhancement.
	- Date.now() obtiene los ms transcurridos desde Enero 01, 1970 hasta la fecha, lo cual es un buen método para generar ID únicos.
	*/
	const gasto = { nombreGasto, cantidadGasto, id: Date.now() };

	// Agrega un nuevo gasto recibiendo el nuevo objeto
	presupuesto.nuevoGasto(gasto);
	// Imprimir alerta; sin tipo, lo hace exitosa
	ui.imprimirAlerta('Gasto agregado correctamente');
	// Imprimir gasto aplicando destructuring al objeto presupuesto
	const { gastos } = presupuesto;
	ui.agregarGastoListado(gastos);
	// Limpiar formulario una vez agregado el gasto
	formulario.reset();
}