/* ==========================================================================
   MI CUENTA - PUNTOS ACUMULADOS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  const totalUserPoints = document.querySelector("#totalUserPoints");
  const userForumPointsList = document.querySelector("#userForumPointsList");

  const USER_STORAGE_KEY = "mel_logged_user";
  const MEMBERSHIPS_STORAGE_KEY = "mel_forum_memberships";

  function getLoggedUser() {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error leyendo usuario desde localStorage:", error);
      return null;
    }
  }

  function getAllMemberships() {
    const storedMemberships = localStorage.getItem(MEMBERSHIPS_STORAGE_KEY);

    if (!storedMemberships) return {};

    try {
      return JSON.parse(storedMemberships);
    } catch (error) {
      console.error("Error leyendo membresías desde localStorage:", error);
      return {};
    }
  }

  function formatNumber(number) {
    return Number(number || 0).toLocaleString("es-MX");
  }

  function formatDate(dateString) {
    if (!dateString) return "fecha no disponible";

    return new Date(dateString).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  async function getForumsData() {
    try {
      const response = await fetch("/data/forums.json");

      if (!response.ok) {
        throw new Error(`Error al cargar forums.json: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error cargando foros:", error);
      return [];
    }
  }

  function findForumById(forums, forumId) {
    return forums.find((forum) => forum.id === forumId);
  }

  function renderEmptyState(message) {
    if (totalUserPoints) {
      totalUserPoints.textContent = "0";
    }

    if (userForumPointsList) {
      userForumPointsList.innerHTML = `
        <p class="empty-points-message">
          ${message}
        </p>
      `;
    }
  }

  function sortMembershipsByPoints(memberships) {
    return memberships.sort((a, b) => {
      return Number(b.points || 0) - Number(a.points || 0);
    });
  }

  async function renderUserPoints() {
    const loggedUser = getLoggedUser();

    if (!loggedUser) {
      renderEmptyState(
        "Inicia sesión para consultar tus puntos acumulados y tus foros activos."
      );
      return;
    }

    const memberships = getAllMemberships();
    const userMemberships = memberships[loggedUser.id] || {};
    const userForumMemberships = Object.values(userMemberships);

    if (userForumMemberships.length === 0) {
      renderEmptyState(
        "Aún no tienes puntos acumulados. Suscríbete a un foro, crea una publicación o responde para comenzar a ganar puntos."
      );
      return;
    }

    const forums = await getForumsData();

    const sortedMemberships = sortMembershipsByPoints(userForumMemberships);

    const totalPoints = sortedMemberships.reduce((total, membership) => {
      return total + Number(membership.points || 0);
    }, 0);

    if (totalUserPoints) {
      totalUserPoints.textContent = formatNumber(totalPoints);
    }

    if (!userForumPointsList) return;

    userForumPointsList.innerHTML = sortedMemberships
      .map((membership) => {
        const forum = findForumById(forums, membership.forumId);

        const forumName = forum?.nombre || "Foro desconocido";
        const forumIcon = forum?.icono || "📚";
        const joinedAt = formatDate(membership.joinedAt);
        const points = Number(membership.points || 0);

        return `
          <article class="forum-points-item">
            <div class="forum-points-icon">
              ${forumIcon}
            </div>

            <div class="forum-points-info">
              <h4>${forumName}</h4>
              <p>Te uniste el ${joinedAt}</p>
            </div>

            <div class="forum-points-value">
              ${formatNumber(points)}
              <small>puntos</small>
            </div>
          </article>
        `;
      })
      .join("");
  }

  renderUserPoints();
});
👁


/*==========================================================================*/
              //*!Formulario de registro*/
/*==========================================================================*/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formregister");
    const warnings = document.getElementById("warnings");

    form.addEventListener("submit", (e) => {
        // Evitamos que el formulario se envíe automáticamente y recargue la página
        e.preventDefault(); 
        
        // Capturamos los valores actuales de los inputs eliminando espacios vacíos al inicio/final
        const nombre = document.getElementById("regisNombres").value.trim();
        const apellidos = document.getElementById("regisApellidos").value.trim();
        const phone = document.getElementById("regisphone").value.trim();
        const email = document.getElementById("regisEmail").value.trim();
        const emailconf = document.getElementById("regisEmailconf").value.trim();
        const password = document.getElementById("regisPassword").value.trim();
        const passwordconf = document.getElementById("regisPasswordconf").value.trim();

        let errores = [];
        warnings.innerHTML = ""; // Limpiamos la pantalla de errores previos

        // 1. Validar campos vacíos
        if (!nombre || !apellidos || !phone || !email || !emailconf || !password || !passwordconf) {
            errores.push("Todos los campos son obligatorios.");
        }

        // 2. Validar formato de Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errores.push("Ingresa un correo válido.");
        }

        // 3. Validar coincidencia de correos
        if (email !== emailconf) {
            errores.push("Los correos no coinciden.");
        }

        // 4. Validar longitud de la contraseña
        if (password && password.length < 8) {
            errores.push("La contraseña debe tener al menos 8 caracteres.");
        }

        // 5. Validar coincidencia de contraseñas
        if (password !== passwordconf) {
            errores.push("Las contraseñas no coinciden.");
        }

        // 6. Evaluar resultados
        if (errores.length > 0) {
            // Mostramos todos los errores acumulados separados por un salto de línea
            warnings.innerHTML = errores.join("<br>");
            warnings.style.color = "red"; 
        } else {
            // Si pasa todas las validaciones
            warnings.innerHTML = "¡Registro exitoso! Procesando datos...";
            warnings.style.color = "green";

            // Aquí puedes proceder a enviar los datos a tu backend con fetch() 
            // o permitir el comportamiento por defecto descomentando la línea de abajo:
            // form.submit();
        }
    });
});