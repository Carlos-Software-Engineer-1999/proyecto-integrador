/* ===================================== */
/* CARGAR JSON */
/* ===================================== */
let todosLosLibros = [];
let todasLasSagas = [];
async function cargarCatalogo() {
  try {
    const respuesta = await fetch("../public/data/catalog.json");
    console.log("Respuesta:", respuesta);

    const data = await respuesta.json();
    todosLosLibros = data.libros;
    todasLasSagas = data.sagas;
    console.log("JSON completo:", data);

    generarSagas(data.sagas, data.libros);

    generarCategorias(data.libros);

    console.log("JSON cargado");
  } catch (error) {
    console.error(error);
  }
}

/* ===================================== */
/* SAGAS */
/* ===================================== */

function generarSagas(sagas, libros) {
  const contenedor = document.getElementById("contenedor-categorias");

  const section = document.createElement("section");

  section.classList.add("categoria");

  section.innerHTML = `

        <h2 class="categoria-titulo">
            📚 Sagas
        </h2>

        <div class="carrusel-libros">

            ${sagas.map((saga) => crearCardSaga(saga, libros)).join("")}

        </div>

    `;

  contenedor.appendChild(section);
}

/* ===================================== */
/* CARD SAGA */
/* ===================================== */

function crearCardSaga(saga, libros) {
  const cantidadLibros = saga.libros.length;

  return `

        <div
            class="
                card
                card-libro
                card-saga
            "
        >

            <img
                src="/frontend/assets/img/sagas/${saga.portada}"
                alt="${saga.nombre}"
            >

            <div class="card-body">

                <h5 class="card-title">
                    ${saga.nombre}
                </h5>

                <p>

                    ${cantidadLibros}
                    libros

                </p>

                <p class="precio">

                    $${saga.precioSaga}

                </p>

                <button
                    class="btn btn-libro"
                    data-saga="${saga.id}"
                >

                    Ver más

                </button>

            </div>

        </div>

    `;
}

/* ===================================== */
/* CATEGORIAS */
/* ===================================== */

function generarCategorias(libros) {
  const contenedor = document.getElementById("contenedor-categorias");

  const categorias = [...new Set(libros.map((libro) => libro.categoria))];

  categorias.forEach((categoria) => {
    const librosCategoria = libros.filter(
      (libro) => libro.categoria === categoria,
    );

    crearCategoria(
      categoria,

      librosCategoria,

      contenedor,
    );
  });
}

/* ===================================== */
/* CREAR CATEGORIA */
/* ===================================== */

function crearCategoria(
  categoria,

  libros,

  contenedor,
) {
  const section = document.createElement("section");

  section.classList.add("categoria");

  section.innerHTML = `

        <h2
            class="categoria-titulo"
        >

            ${categoria}

        </h2>

        <div
            class="carrusel-libros"
        >

            ${libros.map((libro) => crearCardLibro(libro)).join("")}

        </div>

    `;

  contenedor.appendChild(section);
}

/* ===================================== */
/* CARD LIBRO */
/* ===================================== */

function crearCardLibro(libro) {
  return `

        <div
            class="
                card
                card-libro
            "
        >

            <img

                src="${libro.portada}"

                alt="${libro.titulo}"

            >

            <div
    class="
        card-body
        d-flex
        flex-column
    "
>

    <h5 class="card-title">

        ${libro.titulo}

    </h5>

    <p class="dato-libro">

        <strong>Autor:</strong>

        ${libro.autor}

    </p>

    <p class="dato-libro">

        <strong>Editorial:</strong>

        ${libro.editorial}

    </p>

    <div class="precio-container">

        <span class="texto-precio">

            Precio

        </span>

        <p class="precio">

            $${libro.precio}

        </p>

    </div>

    <button

        class="
            btn
            btn-libro
            mt-auto
        "

        data-id="${libro.id}"

    >

        Ver detalles

    </button>

</div>
        </div>

    `;
}
/* ===================================== */
/* EVENTO VER DETALLES */
/* ===================================== */
document.addEventListener("click", function (evento) {
  if (evento.target.matches(".btn-libro")) {
    const idLibro = Number(evento.target.dataset.id);

    if (!idLibro) return;

    const libro = todosLosLibros.find((libro) => libro.id === idLibro);

    if (libro) {
      abrirModalLibro(libro);
    }
  }
});
/* ===================================== */
/* ABRIR MODAL */
/* ===================================== */

function abrirModalLibro(libro) {
  document.getElementById("tituloModal").textContent = libro.titulo;

  document.getElementById("imagenModal").src = libro.portada;

  document.getElementById("autorModal").textContent = libro.autor;

  document.getElementById("sagaModal").textContent = libro.saga
    ? libro.saga
    : "Libro independiente";

  document.getElementById("editorialModal").textContent = libro.editorial;

  document.getElementById("edicionModal").textContent = libro.edicion;

  document.getElementById("isbnModal").textContent = libro.isbn;

  document.getElementById("precioModal").textContent = libro.precio;

  document.getElementById("sinopsisModal").textContent =
    libro.sinopsis || "Sinopsis disponible próximamente.";

  const modal = new bootstrap.Modal(document.getElementById("modalLibro"));

  modal.show();
}
/* ===================================== */
/* INICIAR */
/* ===================================== */

cargarCatalogo();
