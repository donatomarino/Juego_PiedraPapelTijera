var posibilidades = ["piedra", "papel", "tijera"];
var playerName = document.getElementsByName("nombre")[0]; // Obtener el input de nombre del jugador
var match = document.getElementsByName("partidas")[0]; // Obtener el input de número de partidas
var playerButton = document.getElementsByTagName("button")[0]; // Obtener el botón de jugar
var currentMatch = document.getElementById("actual"); // Obtener el elemento con id "actual"
var totalMatches = document.getElementById("total"); // Obtener el elemento con id "total"
var playerImages = document.querySelectorAll("#jugador img"); // Seleccionar todas las imágenes dentro del div con id "jugador"
var computerButton = document.getElementsByTagName("button")[1]; // Obtener el botón para seleccionar la imagen del ordenador
var computerImage = document.querySelectorAll("#maquina img")[0]; // Seleccionar todas las imágenes dentro del div con id "ordenador"
var resetButton = document.getElementsByTagName("button")[2]; // Obtener el botón de reiniciar
var playerPosition = 0; // Inicializar la posición del jugador
var computerPosition = 0; // Inicializar la posición del ordenador

computerButton.setAttribute("disabled", "true"); // Deshabilitar el botón de comienzo partida

playerButton.addEventListener("click", function () { // Añadir evento click al botón de jugar
    if (playerName.value.length <= 3 || !isNaN(playerName.value[0])) { // Validar que el nombre del jugador tenga más de 3 caracteres y el primer carácter no sea un número
        playerName.className = "fondoRojo"; // Cambiar el color de fondo a rojo
    } else if (match.value == 0) { // Validar que el número de partidas sea mayor a 0
        match.className = "fondoRojo"; // Cambiar el color de fondo a rojo
    } else { // Si el nombre y el número de partidas son válidos
        playerName.classList.remove("fondoRojo"); // Eliminar la clase de fondo rojo
        playerName.setAttribute("readonly", "true"); // Hacer el input de nombre de jugador de solo lectura
        match.classList.remove("fondoRojo"); // Eliminar la clase de fondo rojo
        match.setAttribute("readonly", "true"); // Hacer el input de número de partidas de solo lectura

        totalMatches.innerHTML = match.value; // Inicializar el número total de partidas

        for (let i = 0; i < playerImages.length; i++) { // Recorrer todas las imágenes del jugador
            playerImages[i].src = `img/${posibilidades[i]}Jugador.png`; // Cambiar la imagen del jugador
            playerImages[i].addEventListener("click", function () { // Añadir el evento click a cada imagen
                playerImages.forEach(function (image) { // Recorrer todas las imágenes
                    image.className = "noSeleccionado" // Cambiar la clase de la imagen
                })

                this.className = "seleccionado"; // Cambiar la clase de la imagen seleccionada   
                playerPosition = i; // Guardar la posición del jugador
            }); 
        }
        computerButton.removeAttribute("disabled"); // Habilitar el botón para comenzar la partida
    }
})

computerButton.addEventListener("click", function () { // Añadir evento click al botón para empezar la partida
    imageRandom = posibilidades[Math.floor(Math.random() * 3)]; // Seleccionar una imagen aleatoria del array posibilidades

    computerImage.src = `img/${imageRandom}Ordenador.png`; // Cambiar la imagen del ordenador
    computerPosition = posibilidades.indexOf(imageRandom); // Guardar la posición del ordenador

    let historical = document.getElementById("historial"); // Obtener la lista de historial
    let li = document.createElement("li"); // Crear un nuevo elemento de lista
    let winPlayer = playerPosition == 0 && computerPosition == 2 || playerPosition == 2 && computerPosition == 1 || playerPosition == 1 && computerPosition == 0; // Validar si el jugador gana
    let winComputer = computerPosition == 0 && playerPosition == 2 || computerPosition == 2 && playerPosition == 1 || computerPosition == 1 && playerPosition == 0 // Validar si el ordenador gana

    if (winPlayer) { // Gana jugador
        li.innerHTML = `Gana ${playerName.value}`; // Cambiar el texto del elemento de lista
        historical.appendChild(li); // Añadir el elemento de lista al historial
    } else if (winComputer) { // Gana computer
        li.innerHTML = `Gana la máquina` // Cambiar el texto del elemento de lista
        historical.appendChild(li); // Añadir el elemento de lista al historial
    } else { // Empate
        li.innerHTML = `Empate` // Cambiar el texto del elemento de lista
        historical.appendChild(li); // Añadir el elemento de lista al historial
    }

    currentMatch.innerHTML = parseInt(currentMatch.innerHTML) + 1; // Incrementar el número de partidas actuales

    if(currentMatch.innerHTML == match.value){
        computerButton.setAttribute("disabled", "true"); // Deshabilitar el botón de seleccionar imagen del ordenador
    }
});

// Añadir evento click al botón de reiniciar
resetButton.addEventListener("click", function(){
    alert("Nueva partida"); // Mostrar alerta de nueva partida
    playerName.removeAttribute("readonly"); // Remover el atributo de solo lectura del input de nombre de jugador
    match.removeAttribute("readonly"); // Remover el atributo de solo lectura del input de número de partidas
    match.value = 0; // Reiniciar el input número de partidas
    currentMatch.innerHTML = 0; // Reiniciar el número de partidas actuales
    totalMatches.innerHTML = 0; // Reiniciar el número total de partidas
    computerImage.src = `img/defecto.png`; // Cambiar la imagen del ordenador a la imagen por defecto
})
