//:: Ejercicio: filtrar una búsqueda bajo distintos criterios utilizando un array de objetos (db.js)

// Variables
const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Objeto con los parámetros de búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
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
    // Ojo: datos que vienen de un formulario generalmente son tipo string, habrá que convertirlo para generar la comparación correctamente
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

// Refresco de los resultados en el HTML
function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach(auto => {
        const autoHTML = document.createElement('P');
        // Destructuring
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - $ ${precio} MXN - Color: ${color}`;
        // Insertar en HTML
        resultado.appendChild(autoHTML);
    });
}

// Limpiar HTML previo
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
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

//! Filtrado de resultado con base a la búsqueda
function filtrarAuto() {
    /* Empleando higher order function: una función que toma otra función; y chaining: encadenamiento.

    .filter() iterará sobre el array 'autos', crea un nuevo array basado en el parámetro que es evaluado, en este caso, la función.

    Como el parámetro ya está ocupado por una función, el parámetro pasará a esa nueva función y automáticamente .filter() iterará sobre el array 'autos'. */
    const resultados = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    mostrarAutos(resultados);
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

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}
