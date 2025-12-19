//utilitarios.js

mostrarImagen = function (idComponente, rutaImagen) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.src = rutaImagen;
};

mostrarTexto = function (idComponente, mensaje) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.innerText = mensaje;
};

mostrarTextoEnCaja = function (idComponente, mensaje) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.value = mensaje;
};

recuperarTexto = function (idComponente) {
  let componente;
  let valorIngresado;
  componente = document.getElementById(idComponente);
  valorIngresado = componente.value;
  return valorIngresado;
};

recuperarInt = function (idComponente) {
  let valorCaja = recuperarTexto(idComponente);
  let valorEntero = parseInt(valorCaja);
  return valorEntero;
};

recuperarFloat = function (idComponente) {
  let valorCaja = recuperarTexto(idComponente);
  let valorFlotante = parseFloat(valorCaja);
  return valorFlotante;
};

agregarEventoEnter = function (idComponente, funcionAEjecutar) {
  let componente = document.getElementById(idComponente);

  componente.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      funcionAEjecutar();
    }
  });
};

agregarEventoEnter = function (idComponente, funcionAEjecutar) {
  let componente = document.getElementById(idComponente);
  if (componente) {
    componente.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        funcionAEjecutar();
      }
    });
  }
};

agregarEventoRango = function (idComponente, funcionAEjecutar) {
  let componente = document.getElementById(idComponente);
  if (componente) {
    componente.addEventListener("input", function () {
      let valorActual = componente.value;
      funcionAEjecutar(valorActual);
    });
  }
};

agregarEventoImagen = function (idInput, idImagenDestino) {
  let input = document.getElementById(idInput);
  let imagen = document.getElementById(idImagenDestino);

  // Referencias a los nuevos elementos
  let panel = document.getElementById("panelControles");
  let textoInfo = document.getElementById("infoArchivo");

  if (input && imagen) {
    input.addEventListener("change", function () {
      if (input.files && input.files[0]) {
        // 1. LEER DATOS DEL ARCHIVO
        let archivo = input.files[0];
        let nombre = archivo.name;
        // Convertimos bytes a Kilobytes (KB) y le dejamos 2 decimales
        let peso = (archivo.size / 1024).toFixed(2) + " KB";

        // Mostramos la info
        if (textoInfo) {
          textoInfo.innerText = "Archivo: " + nombre + " (" + peso + ")";
        }

        // 2. MOSTRAR IMAGEN
        let lector = new FileReader();
        lector.onload = function (eventoLectura) {
          imagen.src = eventoLectura.target.result;
          imagen.style.display = "block";

          // Mostramos el panel de botones que estaba oculto
          if (panel) panel.style.display = "block";
        };
        lector.readAsDataURL(archivo);
      }
    });
  }
};

copiarAlPortapapeles = function (idComponente) {
  let componente = document.getElementById(idComponente);

  if (componente) {
    // 1. Selecciona el texto del input
    componente.select();
    componente.setSelectionRange(0, 99999); // Para móviles

    // 2. Copia al portapapeles del sistema
    navigator.clipboard
      .writeText(componente.value)
      .then(() => {
        alert("¡Copiado: " + componente.value + "!");
      })
      .catch((err) => {
        console.error("Error al copiar: ", err);
      });
  }
};

// Función para GUARDAR un dato
guardarEnMemoria = function (clave, valor) {
  localStorage.setItem(clave, valor);
};

// Función para RECUPERAR un dato
recuperarDeMemoria = function (clave) {
  return localStorage.getItem(clave);
};
