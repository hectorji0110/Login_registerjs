
fetch("https://rickandmortyapi.com/api/character").then((texto) => {
  return texto.json();
}).then((informacion) => {
  document.getElementById("personajes").innerHTML = informacion.results.map(character => {
  const enFavoritos = favoritos.some(p => p.id === character.id);
  const textoBtn = enFavoritos ? "Quitar de Favoritos" : "Agregar a Favoritos";
  const claseColor = enFavoritos 
    ? "bg-red-500 hover:bg-red-700"
    : "bg-blue-500 hover:bg-blue-700";

  return `
    <div class="flex flex-col items-center justify-center gap-2">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p>Status: ${character.status}</p>
      <button class="mt-2 px-4 py-2 ${claseColor} text-white rounded transition" 
        onclick="agregarAFavoritos(${character.id}, this)">
        ${textoBtn}
      </button>
    </div>
  `;
}).join("");
  }).catch((error) => {
  console.error("Error al obtener los datos:", error);
  }
)

const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  alert("Sesión no iniciada");
  window.location.href = "index.html";
}

const favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuario.email}`)) || [];

function agregarAFavoritos(id, btn) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(personaje => {
      const index = favoritos.findIndex(p => p.id === personaje.id);
      if (index  !==  -1) {
           // El personaje ya está en favoritos: lo quitamos
        favoritos.splice(index, 1);
        btn.textContent = "Agregar a Favoritos";
         // Cambiar color a azul
        btn.classList.remove("bg-red-500", "hover:bg-red-700");
        btn.classList.add("bg-blue-500", "hover:bg-blue-700");
      } else {
        favoritos.push(personaje);
        btn.textContent = "Quitar de Favoritos";
        btn.classList.remove("bg-blue-500", "hover:bg-blue-700");
        btn.classList.add("bg-red-500", "hover:bg-red-700");
      }
      // 👉 GUARDAR en localStorage SIEMPRE
      localStorage.setItem(`favoritos_${usuario.email}`, JSON.stringify(favoritos));  

        mostrarVentanaFavoritos(); 
    });
}


function mostrarVentanaFavoritos() {
  const ventana = document.getElementById("ventanaFavoritos");
  const lista = document.getElementById("listaFavoritos");

  lista.innerHTML = ""; // Limpiar antes de agregar

  favoritos.forEach(p => {
    const div = document.createElement("div");
    div.className = "bg-gray-100 p-2 rounded shadow";

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="w-16 h-16 rounded-full inline-block">
      <span class="ml-2 font-semibold">${p.name}</span>
    `;

    lista.appendChild(div);
  });

  ventana.classList.remove("hidden");
}

function cerrarFavoritos() {
  document.getElementById("ventanaFavoritos").classList.add("hidden");
}
function cerrarSesion() {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    window.location.href = "index.html";
  }

document.getElementById("btnPerfil").addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  localStorage.setItem("usuario", JSON.stringify(user));
  window.location.href = "profile.html";
});