//:: Ejercicio: filtrar una búsqueda bajo distintos criterios utilizando un array de objetos (db.js)

// Variables
const resultado = document.querySelector('#resultado');

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos();
});

// Funciones
function mostrarAutos() {
    autos.forEach(auto => {
        const autoHTML = document.createElement('P');
        // Destructuring
        const { marca, modelo } = auto;
        autoHTML.textContent = `${marca} ${modelo}`;
        // Insertar en HTML
        resultado.appendChild(autoHTML);
    });
}
