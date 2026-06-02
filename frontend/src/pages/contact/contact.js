//? Israel: Validación de datos de entrada
//Escribe tu código aquí

















//? Rodrigo: Formspree
//Escribe tu código aquí








/* ==========================================================================
   ?FORMULARIO DE CONTACTO - SWEETALERT: Mafer
   Esta sección sólo se encarga de:
   1. Evitar que el formulario ensucie la URL.
   2. Mostrar SweetAlert de confirmación.
   3. Mostrar SweetAlert de error si fuera necesario.
   4. Limpiar el formulario después de enviar.

   Nota:
   La validación real de datos será integrada por Israel.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contactForm");

  if (!contactForm) {
    console.error("No se encontró el formulario con id='contactForm'.");
    return;
  }

  /* --------------------------------------------------------------------------
     SweetAlert de éxito
     Se muestra cuando el envío simulado del formulario fue correcto.
     -------------------------------------------------------------------------- */
  function showContactSuccess() {
    return Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: "Gracias por contactarnos. Te responderemos lo antes posible.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4B1D13",
      background: "#F6EBD9",
      color: "#521F12"
    });
  }

  /* --------------------------------------------------------------------------
     SweetAlert de error
     Esta función queda lista para que después tu compañero la use con validación.
     -------------------------------------------------------------------------- */
  function showContactError(
    message = "Ocurrió un error al registrar tu mensaje. Inténtalo nuevamente."
  ) {
    return Swal.fire({
      icon: "error",
      title: "No se pudo enviar",
      text: message,
      confirmButtonText: "Entendido",
      confirmButtonColor: "#4B1D13",
      background: "#F6EBD9",
      color: "#521F12"
    });
  }

  /* --------------------------------------------------------------------------
     Envío temporal del formulario
     Esta es la prueba visual de SweetAlert.
     No valida datos ni envía información a backend.
     -------------------------------------------------------------------------- */
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    /*
      Limpia la URL en caso de que el navegador haya agregado parámetros
      como ?userName=...&userEmail=...
    */
    window.history.replaceState({}, document.title, window.location.pathname);

    /*
      Verifica que SweetAlert2 esté cargado.
      Si no está cargado, usa alert normal como respaldo.
    */
    if (typeof Swal === "undefined") {
      console.error("SweetAlert2 no está cargado. Revisa el script CDN en tu HTML.");
      alert("Mensaje enviado correctamente.");
      contactForm.reset();
      return;
    }

    /*
      PRUEBA TEMPORAL:
      Muestra alerta de éxito y limpia el formulario después de aceptar.
    */
    showContactSuccess().then(() => {
      contactForm.reset();
    });

    /*
      PRUEBA DE ERROR:
      Si necesitas probar el SweetAlert de error, comenta el bloque de éxito de arriba
      y descomenta este bloque.

      showContactError("Este es un mensaje de error de prueba.");
    */
  });
});