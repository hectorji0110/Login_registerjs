document.addEventListener("DOMContentLoaded", () => {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    alert("No hay sesión iniciada. Redirigiendo al login.");
    window.location.href = "index.html";
    return;
  }
 const usuario = JSON.parse(usuarioGuardado);
// Elementos
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const editarBtn = document.getElementById("editarBtn");
  const guardarBtn = document.getElementById("guardarBtn");
  const form = document.getElementById("formPerfil");

    // Mostrar información en los campos
  function mostrarInformacion() {
    nameInput.value = usuario.name || "";
    emailInput.value = usuario.email || "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";

   // El campo "Name" no se puede modificar
    nameInput.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
    confirmPasswordInput.disabled = true;

    guardarBtn.style.display = "none"; // Ocultar botón guardar al inicio
  }

  mostrarInformacion();

  // Habilitar edición
  editarBtn.addEventListener("click", () => {
    emailInput.disabled = false;
    passwordInput.disabled = false;
    confirmPasswordInput.disabled = false;
    
      editarBtn.style.display = "none";
    guardarBtn.style.display = "inline-block";
  });


// Guardar cambios
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const nuevoUsuario = {
      name: usuario.name,
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    };

    // Actualiza en localStorage
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

    // También actualiza en la lista de usuarios (opcional)
    const users = JSON.parse(localStorage.getItem("users")) || [];
   const index = users.findIndex(u =>
  (u.name === usuario.name || u.Name === usuario.name) &&
  (u.email === usuario.email || u.Email === usuario.email)
);

    if (index !== -1) {
      users[index] = nuevoUsuario;
      localStorage.setItem("users", JSON.stringify(users));
    }

    alert("Información actualizada");

    // Desactivar nuevamente los campos
     mostrarInformacion();

    guardarBtn.style.display = "none";
    editarBtn.style.display = "inline-block";
  });
});


const volverMenuBtn = document.getElementById("volverMenuBtn");

if (volverMenuBtn) {
  volverMenuBtn.addEventListener("click", () => {
    window.location.href = "characters.html"; 
  });
}
