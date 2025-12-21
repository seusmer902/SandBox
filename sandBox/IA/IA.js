/* ==========================================
   CEREBRO OLYMPUS v1.1.0 (Con Memoria)
   ========================================== */

const redNeuronal = new brain.NeuralNetwork();

// Elementos del HTML
const divLogs = document.getElementById("logs");
const cajaMuestra = document.getElementById("cajaMuestra");
const textoMuestra = document.getElementById("textoMuestra");
const prediccionLabel = document.getElementById("prediccionIA");

// --- UTILIDADES ---
function log(mensaje) {
  divLogs.innerHTML += `> ${mensaje}<br>`;
  divLogs.scrollTop = divLogs.scrollHeight;
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

// --- FUNCIONES DE MEMORIA 💾 ---
function guardarCerebro() {
  // Convertimos la red neuronal a texto (JSON)
  const jsonCerebro = redNeuronal.toJSON();
  const textoCerebro = JSON.stringify(jsonCerebro);

  // Guardamos en el navegador
  localStorage.setItem("cerebroOlympus", textoCerebro);
}

function cargarCerebro() {
  const textoCerebro = localStorage.getItem("cerebroOlympus");

  if (textoCerebro) {
    // Si existe memoria guardada, la cargamos
    const jsonCerebro = JSON.parse(textoCerebro);
    redNeuronal.fromJSON(jsonCerebro);
    log("💾 Memoria restaurada correctamente.");
    return true; // Encontramos memoria
  } else {
    return false; // No había nada guardado
  }
}

// --- INICIO DEL SISTEMA ---
document.addEventListener("DOMContentLoaded", function () {
  if (typeof brain !== "undefined") {
    log("Sistema Olympus en línea.");

    // 1. Intentamos cargar la memoria
    if (!cargarCerebro()) {
      log("Memoria vacía. Inicializando conocimiento básico...");
      // Si es nueva, le damos el conocimiento base
      redNeuronal.train([
        { input: { r: 0, g: 0, b: 0 }, output: { blanco: 1 } },
        { input: { r: 1, g: 1, b: 1 }, output: { negro: 1 } },
      ]);
    }

    actualizarColor();
  } else {
    log("ERROR: brain.js no está cargado.");
  }
});

// --- LÓGICA PRINCIPAL ---
function actualizarColor() {
  let colorHex = document.getElementById("colorInput").value;
  let colorRGB = hexToRgb(colorHex);

  cajaMuestra.style.backgroundColor = colorHex;

  let resultado = redNeuronal.run(colorRGB);

  let probBlanco = resultado.blanco || 0;
  let probNegro = resultado.negro || 0;

  let textoPrediccion = "";

  if (probBlanco > probNegro) {
    textoPrediccion = "BLANCO (" + Math.floor(probBlanco * 100) + "%)";
    cajaMuestra.style.color = "white";
    textoMuestra.style.color = "white";
  } else {
    textoPrediccion = "NEGRO (" + Math.floor(probNegro * 100) + "%)";
    cajaMuestra.style.color = "black";
    textoMuestra.style.color = "black";
  }

  prediccionLabel.innerText = textoPrediccion;
}

function entrenar(votoUsuario) {
  let colorHex = document.getElementById("colorInput").value;
  let colorRGB = hexToRgb(colorHex);

  let outputDeseado = votoUsuario === "negro" ? { negro: 1 } : { blanco: 1 };

  redNeuronal.train([{ input: colorRGB, output: outputDeseado }]);

  log(`Aprendido: ${colorHex} -> ${votoUsuario.toUpperCase()}`);

  // GUARDAMOS AUTOMÁTICAMENTE
  guardarCerebro();

  actualizarColor();
}

// --- FUNCIÓN EXTRA: RESETEAR CEREBRO ---
// (Puedes llamar a esto desde la consola o crear un botón si quieres)
function resetearCerebro() {
  localStorage.removeItem("cerebroOlympus");
  location.reload(); // Recarga la página
}
