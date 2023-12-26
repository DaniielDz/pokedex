const contenedor = document.querySelector('.pokemon')
const idPokemon = document.querySelector('.id')
const nombrePokemon = document.querySelector('.nombre')
const imagenPokemon = document.querySelector('.imagen')
const userInput = document.querySelector('.userInput')
const button = document.querySelector('.button')
const versionBtn = document.querySelector('.version')
let shiny = false;

button.addEventListener('click', e => {
    e.preventDefault();

    // Buscar Pokemon
    buscar(userInput.value)
    contenedor.classList.add('pokemon--active')
})

function buscar(input) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    .then(res => res.json())
    .then(data => {
        mostrar(data)
    })

}
function mostrar(data) {
    idPokemon.textContent = `ID: ${data['id']}`
    nombrePokemon.textContent = `Nombre: ${data['name']}`
    imagenPokemon.setAttribute('src', data.sprites.other['official-artwork'].front_default)
    imagenPokemon.setAttribute('alt', `${data['name']} image`)

    versionBtn.addEventListener('click', () => {
        cambiarVersion(data)
    })
}
const cambiarVersion = (data) => {
    shiny = !shiny;    // Cambiar el valor de la variable shiny (true a false o false a true)
    const nuevoSrc = shiny  // Determinar la nueva fuente de la imagen basándose en si es shiny o no
        ? data.sprites.other['official-artwork'].front_shiny    
        : data.sprites.other['official-artwork'].front_default; 

    imagenPokemon.setAttribute('src', nuevoSrc);    // Establecer la nueva fuente de la imagen
    versionBtn.textContent = shiny ? 'Normal' : 'Shiny';    // Actualizar el texto del botón
};