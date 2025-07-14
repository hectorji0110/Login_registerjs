const message = document.getElementById("message");

  // REGISTRO
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("Name").value.trim();
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      message.textContent = "Todos los campos son obligatorios.";
      return;
    }

    if (password !== confirmPassword) {
      message.textContent = "Las contraseñas no coinciden.";
      return;
    }

    const nuevoUsuario = { name, email, password };
   // Verificar si el correo ya está registrado
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(user => user.name === name || user.email === email);

    if (exists) {
      message.textContent = "Ese correo ya está registrado, por favor inicie sesion.";
      return;
    }
    

    // Guardar el nuevo usuario en el almacenamiento local
    users.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

    message.textContent = "Registro exitoso. Por favor, inicia sesión.";
    });

document.getElementById("loginLink").addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  


