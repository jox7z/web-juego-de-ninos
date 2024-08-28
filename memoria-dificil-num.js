//dificil-numeros
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

// Generamos números aleatorios para las tarjetas
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
  9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16,
  17, 17, 18, 18];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
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
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disable = true;
  }
}

// Función para mostrar el modal de victoria o derrota
function mostrarModal() {
  modal.style.display = 'block';
  contrarTiemop(tiempoRegresivo);
}
// Función para cerrar el modal
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
  // Comenzamos el temporizador si no está activo
  if (temporizador == false) {
    temporizador = true;
    contarTiempo();
  }

  tarjetasReveladas++;
  console.log(tarjetasReveladas);

  if (tarjetasReveladas == 1) {
    //Mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;

    //deshabilito primer boton
    tarjeta1.disable = true;
  } else if (tarjetasReveladas == 2) {
    // Mostramos el segundo número
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;

    tarjeta2.disable = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      // Si los números coinciden, reiniciamos el contador de tarjetas reveladas y aumentamos los correctos
      tarjetasReveladas = 0;
      correctos++;
      mostrarCorrectos.innerHTML = `Correctos: ${correctos}`;
      mostrarMensajeVictoria();

    } else {
      setTimeout(() => { // Si no coinciden, ocultamos las tarjetas después de un breve período de tiempo
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disable = false;
        tarjeta2.disable = false;
        tarjetasReveladas = 0;
      }, 800);
    }
  }
}//dificil numeros final{
























