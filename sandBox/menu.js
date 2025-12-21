document.addEventListener("DOMContentLoaded", function () {
  // 1. Detectamos si estamos dentro de la carpeta "IA"
  const estamosEnIA = window.location.pathname.includes("/IA/");

  // 2. Definimos las rutas y el LOGO según dónde estemos
  let rutaInicio = "index.html";
  let rutaIA = "IA/IA.html";
  let textoLogo = "S"; // Por defecto es S (Sandbox)

  // Si estamos DENTRO de la carpeta IA...
  if (estamosEnIA) {
    rutaInicio = "../index.html"; // Salimos de la carpeta
    rutaIA = "IA.html"; // Ya estamos dentro
    textoLogo = "IA"; // <--- CAMBIAMOS EL LOGO
  }

  // 3. Decidimos cuál botón se ilumina (Clase 'activo')
  const claseInicio = !estamosEnIA ? "boton-nav activo" : "boton-nav";
  const claseIA = estamosEnIA ? "boton-nav activo" : "boton-nav";

  // 4. Creamos el HTML del menú
  // Nota que ahora usamos ${textoLogo} en la parte del div logo
  const htmlMenu = `
    <nav class="menu-principal">
        <div class="logo">${textoLogo}</div>
        <div class="enlaces">
            <a href="${rutaInicio}" class="${claseInicio}">🧪 SANDBOX</a>
            <a href="${rutaIA}" class="${claseIA}">🧠 CEREBRO IA</a>
        </div>
    </nav>
    `;

  // 5. Inyectamos el menú al principio de la página
  document.body.insertAdjacentHTML("afterbegin", htmlMenu);
});
