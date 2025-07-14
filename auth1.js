  const message = document.getElementById("message");
  
  
  // LOGIN
 document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("usuario").value.trim();
    const password = document.getElementById("Password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar usuario con nombre y contraseña
    const usuario = users.find(u =>
      u.name === name &&
      u.password === password
    );

    if (!name || !password || !usuario) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    // Guardar usuario activo
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("usuario", JSON.stringify(usuario));

    window.location.href = "characters.html";
  });
});
    document.getElementById("registerLink").addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "register.html";
    });
    