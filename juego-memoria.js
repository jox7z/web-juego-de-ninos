//FACIL NUMEROS INCIO
//variables
let tarjetasReveladas = 0;
let tarjeta1 = null;
let tarjeta2 = null;

let primerResultado = null;
let segundoResultado = null;

let movimientos = 0;
let correctos = 0;
let temporizador = false;
let timer = 40;
let tiempoRegresivo = null;
let temporizadorInterval;

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarCorrectos = document.getElementById('correctos');
let mostrarTiempo = document.getElementById('tiempo-restante');

//modal
var modal = document.getElementById('modal');
var closeBtn = document.querySelector('.close');
const continuarBtn = document.querySelector('.continuarBtn');


//Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

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

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disable = true;

  }
}

//Modal
function mostrarModal() {
  modal.style.display = 'block';
  clearInterval(tiempoRegresivo);
}
function cerrarModal() {
  modal.style.display = 'none';
  contarTiempo();
}

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
  timer = 40; 
  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  mostrarCorrectos.innerHTML = `Correctos: ${correctos}`;
  
  for (let i = 0; i <= 15; i++) {
    const tarjeta = document.getElementById(i);
    tarjeta.innerHTML = '';
    tarjeta.disabled = false; 
  }
  
}


continuarBtn.addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  clearInterval(temporizadorInterval);
  reiniciarPartida();
  mostrarTiempo = document.getElementById('tiempo-restante');
  mostrarTiempo.innerHTML = 'Tiempo: 40 segundos';
});



function mostrarMensajeVictoria() {
  if (correctos === 8) {
    var mensajeResultado = document.getElementById("mensajeResultado");
    mensajeResultado.innerHTML = "¡VICTORIA!";
    clearInterval(tiempoRegresivo);

    document.querySelector('.modal-content img[src="background/derrota.gif"]').style.display = 'none';
    document.querySelector('.modal-content img[src="background/victoria.gif"]').style.display = 'block';
    mostrarModal();

  }
}

function mostrarMensajeDerrota() {
  if (correctos !== 8 && timer === 0) {
    document.getElementById('mensajeResultado').innerHTML = "¡Se acabó el tiempo! Has perdido.";
    bloquearTarjetas();

    document.querySelector('.modal-content img[src="background/victoria.gif"]').style.display = 'none';
    document.querySelector('.modal-content img[src="background/derrota.gif"]').style.display = 'block';

    mostrarModal();
  }
}

//funciones
function revelar(id) {

  if (!temporizador) {
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
    //ensenhar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;

    tarjeta2.disable = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasReveladas = 0;

      correctos++;
      mostrarCorrectos.innerHTML = `Correctos: ${correctos}`;
      mostrarMensajeVictoria();

    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disable = false;
        tarjeta2.disable = false;
        tarjetasReveladas = 0;
      }, 800);
    }
  }
}