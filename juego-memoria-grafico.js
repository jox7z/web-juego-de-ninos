
//variables
let tarjetasReveladas = 0; // Número de tarjetas reveladas actualmente
let tarjeta1 = null; // Primera tarjeta seleccionada
let tarjeta2 = null; // Segunda tarjeta seleccionada

let primerResultado = null; // Primer resultado (número) de la tarjeta seleccionada
let segundoResultado = null; // Segundo resultado (número) de la tarjeta seleccionada

let movimientos =0; // Número de movimientos realizados
let correctos =0; // Número de pares correctos encontrados
let temporizador = false; // Estado del temporizador (iniciado o no)
let timer = 40; // Duración del temporizador en segundos
let tiempoRegresivo = null; // Almacena el ID del intervalo del temporizador
let temporizadorInterval; // Intervalo del temporizador


let mostrarMovimientos = document.getElementById('movimientos'); // Elemento HTML para mostrar el número de movimientos
let mostrarCorrectos = document.getElementById('correctos'); // Elemento HTML para mostrar el número de pares correctos
let mostrarTiempo = document.getElementById('tiempo-restante'); // Elemento HTML para mostrar el tiempo restante

//modal
var modal = document.getElementById('modal');  // Elemento modal
var closeBtn = document.querySelector('.close'); // Botón para cerrar el modal
const continuarBtn = document.querySelector('.continuarBtn'); // Botón para continuar después de mostrar el modal

//Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

// Función para contar el tiempo
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

// Función para bloquear las tarjetas al acabar el tiempo
function bloquearTarjetas(){
  for (let i =0; i <=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML =`<img src="/memoria-graficos/${numeros [i]}.png" alt="">`;
    tarjetaBloqueada.disable = true;

  }
}

//Modal 
function mostrarModal() {
  modal.style.display = 'block';
  clearInterval(tiempoRegresivo);
}

// Función para cerrar el modal y continuar el juego
function cerrarModal() {
  modal.style.display = 'none';
  contarTiempo();
}

// Función para reiniciar la partida
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

// Event listener para el botón "Continuar" del modal
continuarBtn.addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  clearInterval(temporizadorInterval);
  reiniciarPartida();
  mostrarTiempo = document.getElementById('tiempo-restante');
  mostrarTiempo.innerHTML = 'Tiempo: 40 segundos';
});

// Función para mostrar el mensaje de victoria
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

// Función para mostrar el mensaje de derrota
function mostrarMensajeDerrota() {
  if (correctos !== 8 && timer === 0) {
    document.getElementById('mensajeResultado').innerHTML = "¡Se acabó el tiempo! Has perdido.";
    bloquearTarjetas();

    document.querySelector('.modal-content img[src="background/victoria.gif"]').style.display = 'none';
    document.querySelector('.modal-content img[src="background/derrota.gif"]').style.display = 'block';

    mostrarModal();
  }
}


// Función para revelar una tarjeta
function revelar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }
  tarjetasReveladas++;
  console.log(tarjetasReveladas);

  if (tarjetasReveladas == 1) {
    //Mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="/memoria-graficos/${primerResultado}.png" alt="">`

    //deshabilito primer boton
    tarjeta1.disable = true;
  } else if (tarjetasReveladas == 2) {
    //Mostrar el segundo número
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="/memoria-graficos/${segundoResultado}.png" alt="">`

    tarjeta2.disable = true;

    //Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasReveladas = 0;
      correctos++;
      mostrarCorrectos.innerHTML = `Correctos: ${correctos}`;

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