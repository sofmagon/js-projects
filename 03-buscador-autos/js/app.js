//:: Ejercicio: filtrar una búsqueda bajo distintos criterios utilizando un array de objetos (db.js)

// Variables
const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;
const precioMin = document.querySelector('#minimo');
const precioMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

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

// Event listener para los parámetros de búsqueda
marca.addEventListener('change', e => {
    /* Leyendo el valor elegido del select
    console.log(e.target.value); */
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
});

precioMin.addEventListener('change', e => {
    datosBusqueda.precioMin = e.target.value;
});

precioMax.addEventListener('change', e => {
    datosBusqueda.precioMax = e.target.value;
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
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

// Filtrado de resultado con base a la búsqueda
function filtrarAuto() {
    /* Empleando higher order function: una función que toma otra función; y chaining: encadenamiento.

    .filter() iterará sobre el array 'autos', crea un nuevo array basado en el parámetro que es evaluado, en este caso, la función.

    Como el parámetro ya está ocupado por una función, el parámetro pasará a esa nueva función y automáticamente .filter() iterará sobre el array 'autos'. */
    const resultados = autos.filter(filtrarMarca).filter(filtrarYear);
    console.log(resultados);
}

function filtrarMarca(auto) {
    // Destructuring
    const { marca } = datosBusqueda;
    if (marca) {
        // Retornar todos los autos de la marca que seleccionó el usuario. Selección almacenada en el objeto 'datosBusqueda'
        return auto.marca === marca;
    }
    // Si el usuario no seleccionó nada en específico, mostrar todos
    return auto;
}

function filtrarYear() {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === year;
    }

    return auto;
}
