//:: Ejercicio: filtrar una búsqueda bajo distintos criterios utilizando un array de objetos (db.js)

// Variables
const resultado = document.querySelector('#resultado');

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos();
    llenarSelect();
});

// Funciones

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

}