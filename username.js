// Función para guardar el nombre del usuario y redirigirlo al menú
function saveNameAndRedirect(event) {
  event.preventDefault(); // Evita que se envíe el formulario de manera convencional

  // Obtener el valor ingresado en el campo de nombre
  const nombreInput = document.getElementById('ingresa-nombre');
  const nombre = nombreInput.value;

  // Guardar el nombre del usuario actual en el almacenamiento local
  localStorage.setItem('nombreUsuario', nombre);

  // Redirigir al usuario al menú
  window.location.href = 'menu.html';
}

// Evento que se dispara cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el elemento que mostrará la información del usuario
  const userInfoDiv = document.getElementById('user-info');

  // Obtener el nombre de usuario guardado en el almacenamiento local
  const nombreUsuario = localStorage.getItem('nombreUsuario');

  // Si hay un nombre de usuario guardado, mostrarlo en la página
  if (nombreUsuario) {
    const nombreElement = document.createElement('div');
    nombreElement.classList.add('username');
    nombreElement.textContent = 'Usuario: ' + nombreUsuario;
    userInfoDiv.appendChild(nombreElement);
  }
});
