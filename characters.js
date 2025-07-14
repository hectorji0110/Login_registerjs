
fetch("https://rickandmortyapi.com/api/character").then((texto) => {
  return texto.json();
}).then((informacion) => {
  document.getElementById("personajes").innerHTML = informacion.results.map(character => `
    <div class="flex flex-col items-center justify-center gap-2">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p>Status: ${character.status}</p>
      <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onclick="agregarAFavoritos(${character.id})">Agregar a Favoritos
      </button>
    </div>
  `).join("");
  }).catch((error) => {
  console.error("Error al obtener los datos:", error);
  }
)
const favoritos = [];

function agregarAFavoritos(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(personaje => {
      const index = favoritos.findIndex(p => p.id === personaje.id);
      if (index  !==  -1) {
           // El personaje ya está en favoritos: lo quitamos
        favoritos.splice(index, 1);
      } else {
        favoritos.push(personaje);
      }
        
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