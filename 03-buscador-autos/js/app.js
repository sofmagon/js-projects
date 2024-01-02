//:: Ejercicio: filtrar una búsqueda bajo distintos criterios utilizando un array de objetos (db.js)

// Variables
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;

// Objeto con los parámetros de búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    precioMin: '',
    precioMax: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos();
    llenarSelect();
});

// Mostrando todos los autos y sus características
function mostrarAutos() {
    autos.forEach(auto => {
        const autoHTML = document.createElement('P');
        // Destructuring
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - $ ${precio} MXN - Color: ${color}`;
        // Insertar en HTML
        resultado.appendChild(autoHTML);
    });
}

// Generando los años del select
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('OPTION');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}
