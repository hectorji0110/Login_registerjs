document.addEventListener("DOMContentLoaded", () => {

  const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  alert("Sesión no iniciada");
  window.location.href = "index.html";
}
  const favoritosGuardados = JSON.parse(localStorage.getItem(`favoritos_${usuario.email}`)) || [];
  const contenedor = document.getElementById("contenedorFavoritos");

  console.log("Favoritos encontrados:", favoritosGuardados); // debug

  favoritosGuardados.forEach(p => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow text-center";

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="mx-auto w-24 h-24 object-cover rounded-full mb-2" />
      <h2 class="font-semibold">${p.name}</h2>
      <p class="text-sm text-gray-600">Status: ${p.status}</p>
    `;

    contenedor.appendChild(div);
  });
});
const volverMenuBtn = document.getElementById("volverMenuBtn");

if (volverMenuBtn) {
  volverMenuBtn.addEventListener("click", () => {
    window.location.href = "characters.html"; 
  });
}