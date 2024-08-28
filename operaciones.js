var num1, num2;
var respuesta;
var operacion;
var randomOP;
var operacionAnterior;

var victorias = 0;
var derrotas = 0;

// elementos manipulables de la página
var txt_titulo = document.getElementById("tituloJuego");
var txt_operacion = document.getElementById("operacion");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");
var op3 = document.getElementById("op3");
var txt_msj = document.getElementById("msj");
var txt_resultado = document.getElementById("resultado");
var txt_tipoOperacion = document.getElementById("tipoOperacion");

function comenzar() {
  txt_resultado.innerHTML = "?";
  txt_msj.innerHTML = "";

  num1 = Math.round(Math.random() * 9);
  num2 = Math.round(Math.random() * 9);

  randomOP = Math.round(Math.random() * 3);
  if (randomOP === 0) {
    txt_titulo.innerHTML = "Juego de suma"; 
    operacion = "+";
    respuesta = num1 + num2;
  } else if (randomOP === 1) {
    txt_titulo.innerHTML = "Juego de resta";
    operacion = "-";
    respuesta = num1 - num2;
  } else if (randomOP === 2) {
    txt_titulo.innerHTML = "Juego de multiplicación";
    operacion = "x";
    respuesta = num1 * num2;
  } else {
    txt_titulo.innerHTML = "Juego de división";
    operacion = "/";
    num2 = Math.floor(Math.random() * 8) + 2;
    num1 = num2 * (Math.floor(Math.random() * 8) + 1);
    respuesta = num1 / num2;
  }

  if (operacion === "+") {
    txt_operacion.innerHTML = num1 + " + " + num2 + " = ";
  } else if (operacion === "-") {
    txt_operacion.innerHTML = num1 + " - " + num2 + " = ";
  } else if (operacion === "x") {
    txt_operacion.innerHTML = num1 + " x " + num2 + " = ";
  } else if (operacion === "/") {
    txt_operacion.innerHTML = num1 + " ÷ " + num2 + " = ";
  }

  OpCorrecta = Math.round(Math.random());
  if (OpCorrecta == 0) {
    op1.innerHTML = respuesta;
    op2.innerHTML = respuesta + 1;
    op3.innerHTML = respuesta - 1;
  } else if (OpCorrecta == 1) {
    op2.innerHTML = respuesta;
    op1.innerHTML = respuesta + 2;
    op3.innerHTML = respuesta - 1;
  } else {
    op3.innerHTML = respuesta;
    op1.innerHTML = respuesta + 1;
    op2.innerHTML = respuesta - 1;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("userId");
  let usuario = localStorage.getItem(userId);

  if (!usuario) {
    usuario = {
      id: userId,
      victorias: 0,
      derrotas: 0,
    };
  } else {
    usuario = JSON.parse(usuario);
  }

  function actualizarUsuario() {
    localStorage.setItem(userId, JSON.stringify(usuario));
  }

  function actualizarMarcador() {
    const victoriasElement = document.getElementById("victorias");
    const derrotasElement = document.getElementById("derrotas");
    victoriasElement.textContent = "Correctas: " + usuario.victorias;
    derrotasElement.textContent = "Incorrectas: " + usuario.derrotas;
  }

  actualizarMarcador();

  function controlarRespuesta(opcionElegida) {
    var txt_respuesta = opcionElegida.innerHTML.trim();
    console.log("Respuesta seleccionada:", txt_respuesta);
    console.log("Respuesta correcta:", respuesta);
  
    if (parseInt(txt_respuesta) === respuesta) {
      document.getElementById("mensajeResultado").textContent = "¡EXCELENTE!";
      var modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
      modal.show();
      txt_msj.style.color = "green";
      usuario.victorias++;
      actualizarMarcador();
      actualizarUsuario();
      setTimeout(function() {
        modal.hide();
        comenzar();
      }, 2000); // Ocultar el modal después de 2 segundos y comenzar una nueva operación
    } else {
      document.getElementById("mensajeResultado").textContent = "Incorrecto. La respuesta correcta era: " + respuesta;
      var modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
      modal.show();
      txt_msj.style.color = "red";
      usuario.derrotas++;
      actualizarMarcador();
      actualizarUsuario();
      setTimeout(function() {
        modal.hide();
        comenzar();
      }, 2000); // Ocultar el modal después de 2 segundos y comenzar una nueva operación
    }
  }
  
  function limpiar() {
    txt_resultado.innerHTML = "?";
    txt_msj.innerHTML = "";
    comenzar();
  }

  op1.addEventListener("click", function() {
    controlarRespuesta(op1);
  });

  op2.addEventListener("click", function() {
    controlarRespuesta(op2);
  });

  op3.addEventListener("click", function() {
    controlarRespuesta(op3);
  });
  
  window.addEventListener("beforeunload", function(event) {
    usuario.victorias = 0; 
    usuario.derrotas = 0;
    actualizarUsuario();
  });   

  comenzar();
});