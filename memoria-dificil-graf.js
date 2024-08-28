//Dificil grafico inicio
// Declaramos variables para el juego
let tarjetasReveladas = 0;
let tarjeta1 = null;
let tarjeta2 = null;

let primerResultado = null;
let segundoResultado = null;

let movimientos = 0;
let correctos = 0;
let temporizador = false;
let timer = 80;// Tiempo inicial en segundos
let tiempoRegresivo = null;
let temporizadorInterval;

// Elementos HTML que vamos a manipular
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarCorrectos = document.getElementById('correctos');
let mostrarTiempo = document.getElementById('tiempo-restante');

// Referencias a elementos del modal
var modal = document.getElementById('modal');
var closeBtn = document.querySelector('.close');
const continuarBtn = document.querySelector('.continuarBtn');

// Función para barajar los elementos de un array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Generación de números aleatorios y barajado
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
  9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16,
  17, 17, 18, 18];
numeros = shuffle(numeros);// Barajamos los números
console.log(numeros);

// Función para contar el tiempo regresivo
function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
      mostrarMensajeDerrota();
    }
  }, 1000);
}

// Función para bloquear todas las tarjetas cuando se acaba el tiempo
function bloquearTarjetas() {
  for (let i = 0; i <= 35; i++) {
    let tarjetaBloqueada = document.getElementById(i);
     // En lugar de mostrar el número, mostramos una imagen según el número
    tarjetaBloqueada.innerHTML = `<img src="/memoria-graficos/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disable = true;
  }
}

//Modal
function mostrarModal() {
  modal.style.display = 'block';
  contrarTiemop(tiempoRegresivo);
}

function cerrarModal() {
  modal.style.display = 'none';
  contarTiempo();
}

// Función para reiniciar el juego
function reiniciarPartida() {
  modal.style.display = 'none';
  tarjetasReveladas = 0;
  tarjeta1 = null;
  tarjeta2 = null;
  primerResultado = null;
  segundoResultado = null;
  movimientos = 0;
  correctos = 0;
  temporizador = false;
  timer = 80;
  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  mostrarCorrectos.innerHTML = `Correctos: ${correctos}`;

  for (let i = 0; i <= 35; i++) {
    const tarjeta = document.getElementById(i);
    tarjeta.innerHTML = '';
    tarjeta.disabled = false;
  }
}
// Event listener para el botón de continuar
continuarBtn.addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  clearInterval(temporizadorInterval);
  reiniciarPartida();
  mostrarTiempo = document.getElementById('tiempo-restante');
  mostrarTiempo.innerHTML = 'Tiempo: 80 segundos';
  location.reload();
});

// Función para mostrar el mensaje de victoria
function mostrarMensajeVictoria() {
  if (correctos === 18) {
    var mensajeResultado = document.getElementById("mensajeResultado");
    mensajeResultado.innerHTML = "¡VICTORIA!";
    clearInterval(tiempoRegresivo);

    document.querySelector('.modal-content img[src="background/derrota.gif"]').style.display = 'none';
    document.querySelector('.modal-content img[src="background/victoria.gif"]').style.display = 'block';
    mostrarModal();

  }
}

// Función para mostrar el mensaje de derrota
function mostrarMensajeDerrota() {
  if (correctos !== 18 && timer === 0) {
    document.getElementById('mensajeResultado').innerHTML = "¡Se acabó el tiempo! Has perdido.";
    bloquearTarjetas();
    document.querySelector('.modal-content img[src="background/victoria.gif"]').style.display = 'none';
    document.querySelector('.modal-content img[src="background/derrota.gif"]').style.display = 'block';
    mostrarModal();
  }
}



// Función para revelar las tarjetas
function revelar(id) {
  if (temporizador == false) {
    temporizador = true;
    contarTiempo();
  }
  tarjetasReveladas++;
  console.log(tarjetasReveladas);

  if (tarjetasReveladas == 1) {
     // Mostrar el primer número
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    // Mostrar la imagen correspondiente al número
    tarjeta1.innerHTML = `<img src="/memoria-graficos/${primerResultado}.png" alt="">`

    // Deshabilitar el primer botón
    tarjeta1.disable = true;
  } else if (tarjetasReveladas == 2) {
    // Mostrar el segundo número
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    // Mostrar la imagen correspondiente al número
    tarjeta2.innerHTML = `<img src="/memoria-graficos/${segundoResultado}.png" alt="">`
    tarjeta2.disable = true;

    // Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasReveladas = 0;

      correctos++;
      mostrarCorrectos.innerHTML = `Correctos: ${correctos}`;
      mostrarMensajeVictoria();

    } else {
      // Ocultar las tarjetas después de un breve período de tiempo si no coinciden
      setTimeout(() => {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disable = false;
        tarjeta2.disable = false;
        tarjetasReveladas = 0;
      }, 800);
    }
  }
}//dificil grafico
























