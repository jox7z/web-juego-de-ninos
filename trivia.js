let tiempoRestante = 15; // Duración del temporizador en segundos
let intervaloTiempo; // Almacena el ID del intervalo del temporizador
let respuestaSeleccionada = false; // Indica si se ha seleccionado una respuesta
let posActual = 0; // Índice de la pregunta actual
let cantidadAcertadas = 0; // Número de respuestas correctas
let cantidadNoAcertadas = 0; // Número de respuestas incorrectas
let modalAbierto = false; // Indica si el modal está abierto
let juegoCompletado = false; // Variable para indicar si se ha completado el juego

// Array de preguntas
let preguntas = [
  "¿Cuál es el océano más grande del mundo?",
  "¿Quién escribió Harry Potter?",
  "¿Qué animal es conocido por dormir todo el invierno?",
  "¿Cuál es la capital de España?",
  "¿Qué planeta es conocido como el planeta rojo?",
  "¿Quién fue el famoso físico que formuló la teoría de la relatividad?",
  "¿Cuál es la montaña más alta de América?",
  "¿Qué país es famoso por la Gran Muralla?",
  "¿Cuál es el animal nacional de Australia?",
  "¿Qué instrumento se utiliza para medir la temperatura?",
  "¿Cuál es el proceso por el cual las plantas convierten la luz solar en alimento?",
  "¿Cuál es el país donde se originó el sushi?",
  "¿Quién pintó la famosa obra La noche estrellada?",
  "¿Cuál es la capital de Italia?",
  "¿Qué invento revolucionó la comunicación a larga distancia?",
  "¿Cuál es la moneda de Japón?",
  "¿Qué famoso explorador descubrió América en 1492?",
  "¿Cuál es el instrumento musical más grande de la orquesta?",
  "¿Quién fue el primer hombre en pisar la luna?",
  "¿Cuál es la capital de China?"
];

// Índices de las respuestas correctas para cada pregunta
let correcta = [
  1, 0, 1, 1, 3, 0, 1, 1, 2, 1,
  0, 0, 1, 1, 1, 3, 1, 1, 2, 0
];

// Opciones para cada pregunta
let opciones = [
  ["Océano Atlántico", "Océano Pacífico", "Océano Índico", "Océano Antártico"],
  ["J.K. Rowling", "Stephen King", "Roald Dahl", "J.R.R. Tolkien"],
  ["Elefante", "Oso pardo", "Jirafa", "León"],
  ["París", "Madrid", "Roma", "Londres"],
  ["Júpiter", "Venus", "Mercurio", "Marte"],
  ["Albert Einstein", "Isaac Newton", "Stephen Hawking", "Nikola Tesla"],
  ["Mont Blanc", "Monte McKinley", "Monte Everest", "K2"],
  ["India", "China", "Rusia", "Estados Unidos"],
  ["Canguro", "Emú", "Koala", "Diablo de Tasmania"],
  ["Barómetro", "Termómetro", "Brújula", "Higrómetro"],
  ["Fotosíntesis", "Respiración celular", "Germinación", "Transpiración"],
  ["Japón", "China", "Tailandia", "Corea del Sur"],
  ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
  ["París", "Roma", "Madrid", "Lisboa"],
  ["Telégrafo", "Radio", "Internet", "Teléfono"],
  ["Yuan", "Dólar", "Euro", "Yen"],
  ["Vasco da Gama", "Cristóbal Colón", "Ferdinand Magellan", "Juan Sebastián Elcano"],
  ["Violín","Contrabajo", "Flauta", "Tuba"],
  ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
  ["Pekín (Beijing)","JingPing",  "Shanghái", "Hong Kong"]
];

// Función para mezclar preguntas y respuestas
function mezclarPreguntasYRespuestas() {
  
  let preguntasMezcladas = [];

// Crear un array de índices de preguntas
  let indices = [];
  for (let i = 0; i < preguntas.length; i++) {
    indices.push(i);
  }

  // Mezclamos los índices para obtener un orden aleatorio
  indices = shuffleArray(indices);

  // Llenamos el array de preguntas mezcladas con las preguntas y respuestas correspondientes en el nuevo orden
  for (let i = 0; i < preguntas.length; i++) {
    let preguntaIndex = indices[i];
    preguntasMezcladas.push({
      pregunta: preguntas[preguntaIndex],
      opciones: opciones[preguntaIndex],
      correcta: correcta[preguntaIndex]
    });
  }

  
  return preguntasMezcladas;
}

// Función para comenzar el juego
function comenzarJuego() {
  posActual = 0;
  cantidadAcertadas = 0;
  cantidadNoAcertadas = 0;
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  
  // Mezclamos las preguntas y respuestas antes de comenzar el juego
  preguntasMezcladas = mezclarPreguntasYRespuestas();
  
  cargarPregunta();
  comenzarTemporizador();
}

// Función para cargar una pregunta en la interfaz
function cargarPregunta() {
  if (posActual >= preguntasMezcladas.length) {
    terminarJuego();
  } else {
    limpiarOpciones();

    document.getElementById("tituloPregunta").innerHTML = preguntasMezcladas[posActual].pregunta;
    document.getElementById("n0").innerHTML = preguntasMezcladas[posActual].opciones[0];
    document.getElementById("n1").innerHTML = preguntasMezcladas[posActual].opciones[1];
    document.getElementById("n2").innerHTML = preguntasMezcladas[posActual].opciones[2];
    document.getElementById("n3").innerHTML = preguntasMezcladas[posActual].opciones[3];
    respuestaSeleccionada = false; // Reiniciar variable de respuesta seleccionada

    comenzarTemporizador();
    document.getElementById("tiempo-restante").textContent = "Tiempo: " + tiempoRestante + " segundos";
  }
}

// Función para mezclar un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para iniciar el temporizador
function comenzarTemporizador() {
  tiempoRestante = 15;
  clearInterval(intervaloTiempo);

  intervaloTiempo = setInterval(function() {
    if (!modalAbierto) {
      tiempoRestante--;
      document.getElementById("tiempo-restante").textContent = "Tiempo: " + tiempoRestante + " segundos";

      if (tiempoRestante <= 0) {
        clearInterval(intervaloTiempo);

        if (!respuestaSeleccionada) {
          cantidadNoAcertadas++;
          document.getElementById("incorrectos").textContent = "Incorrectas: " + cantidadNoAcertadas;
        }

        posActual++;
        cargarPregunta();
      }
    }
  }, 1000);
}

// Función para limpiar las opciones de respuesta en la interfaz
function limpiarOpciones() {
  for (let i = 0; i < 4; i++) {
    document.getElementById("n" + i).className = "respuesta";
    document.getElementById("l" + i).className = "letra";
  }
}

// Función para comprobar la respuesta seleccionada por el usuario
function comprobarRespuesta(opElegida) {
  if (!respuestaSeleccionada) {
    respuestaSeleccionada = true;
    if (opElegida == preguntasMezcladas[posActual].correcta) {
      document.getElementById("n" + opElegida).className = "respuesta respuestaAcertada";
      document.getElementById("l" + opElegida).className = "letra letraAcertada";
      cantidadAcertadas++;
      document.getElementById("correctos").textContent = "Correctas: " + cantidadAcertadas;
      abrirModal("¡Respuesta correcta!");
    } else {
      document.getElementById("n" + opElegida).className = "respuesta respuestaNoAcertada";
      document.getElementById("l" + opElegida).className = "letra letraNoAcertada";

      const respuestaCorrectaIndex = preguntasMezcladas[posActual].correcta;
      const respuestaCorrecta = preguntasMezcladas[posActual].opciones[respuestaCorrectaIndex];
      cantidadNoAcertadas++;
      document.getElementById("incorrectos").textContent = "Incorrectos: " + cantidadNoAcertadas;
      abrirModal("Respuesta incorrecta. La respuesta correcta es: " + respuestaCorrecta);
      
    }
  }
  posActual++;
  setTimeout(cargarPregunta, 1000);
}


// Función para abrir el modal con un mensaje
function abrirModal(mensaje) {
  var modal = document.getElementById("miModal");
  var mensajeModal = document.getElementById("modalMensaje");
  mensajeModal.textContent = mensaje;
  modal.style.display = "block";
  modalAbierto = true;

  clearInterval(intervaloTiempo);
}



// Función para cerrar el modal y, si se ha completado el juego, recargar la página
function cerrarModal() {
  var modal = document.getElementById("miModal");
  modal.style.display = "none";
  modalAbierto = false;

  if (juegoCompletado) {
    // Recargar la página si se ha completado el juego
    location.reload();
  } else {
    comenzarTemporizador();
  }
}

// Función para terminar el juego y mostrar el resultado
function terminarJuego() {
  var porcentajeCorrectas = (cantidadAcertadas / preguntas.length) * 100;
  if (posActual >= preguntas.length - 1) {
    juegoCompletado = true; // Marcar el juego como completado
    if (porcentajeCorrectas >= 80) {
      mostrarAnimacionGanadora(porcentajeCorrectas);
    } else {
      mostrarAnimacionPerdedora(porcentajeCorrectas);
    }
  }
}


// Función para mostrar una animación de victoria
function mostrarAnimacionGanadora(porcentajeCorrectas) {
  var mensaje = "¡Felicidades, ganaste el juego! Acertaste el ";
  if (Number.isInteger(porcentajeCorrectas)) {
    mensaje += porcentajeCorrectas + "% de las preguntas.✌️✌️✌️✅";
  } else {
    mensaje += porcentajeCorrectas.toFixed(2) + "% de las preguntas.";
  }
  abrirModal(mensaje);
}

// Función para mostrar una animación de derrota
function mostrarAnimacionPerdedora(porcentajeCorrectas) {
  var mensaje = "¡Lo siento, perdiste el juego! Acertaste solo el ";
  if (Number.isInteger(porcentajeCorrectas)) {
    mensaje += porcentajeCorrectas + "% de las preguntas. 👎👎👎❌";
  } else {
    mensaje += porcentajeCorrectas.toFixed(2) + "% de las preguntas.";
  }
  abrirModal(mensaje);
}