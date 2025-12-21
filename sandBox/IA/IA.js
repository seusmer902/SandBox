/* ==========================================
   CEREBRO OLYMPUS v-1.1 (Con Memoria Persistente)
   ========================================== */

const redNeuronal = new brain.NeuralNetwork();

// Elementos del DOM
const divLogs = document.getElementById("logs");
const cajaMuestra = document.getElementById("cajaMuestra");
const textoMuestra = document.getElementById("textoMuestra");
const prediccionLabel = document.getElementById("prediccionIA");

// --- 1. FUNCIONES DE MEMORIA (LocalStorage) 💾 ---

function guardarCerebro() {
  // Convertimos la red neuronal a texto JSON
  const jsonCerebro = redNeuronal.toJSON();
  const textoCerebro = JSON.stringify(jsonCerebro);

  // Guardamos en el navegador
  localStorage.setItem("cerebroOlympus", textoCerebro);
}

function cargarCerebro() {
  const textoCerebro = localStorage.getItem("cerebroOlympus");

  if (textoCerebro) {
    // Si existe memoria, la cargamos
    const jsonCerebro = JSON.parse(textoCerebro);
    redNeuronal.fromJSON(jsonCerebro);
    log("💾 Memoria restaurada: Olympus recuerda su entrenamiento.");
    return true;
  } else {
    return false;
  }
}

function resetearCerebro() {
  // Borramos la memoria y recargamos
  localStorage.removeItem("cerebroOlympus");
  location.reload();
}

// --- 2. UTILIDADES ---

function log(mensaje) {
  divLogs.innerHTML += `> ${mensaje}<br>`;
  divLogs.scrollTop = divLogs.scrollHeight; // Auto-scroll
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255, // Normalizamos a 0-1
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

// --- 3. INICIO DEL SISTEMA ---

document.addEventListener("DOMContentLoaded", function () {
  if (typeof brain !== "undefined") {
    log("Sistema Olympus en línea.");

    // Intentamos recuperar la memoria
    if (!cargarCerebro()) {
      log("Memoria vacía. Inicializando con datos básicos...");
      // Entrenamiento inicial para que no empiece en cero
      redNeuronal.train([
        { input: { r: 0, g: 0, b: 0 }, output: { blanco: 1 } }, // Negro -> Texto Blanco
        { input: { r: 1, g: 1, b: 1 }, output: { negro: 1 } }, // Blanco -> Texto Negro
      ]);
    }

    actualizarColor(); // Primera predicción
  } else {
    log("ERROR: No se cargó la librería brain.js");
  }
});

// --- 4. LÓGICA PRINCIPAL ---

function actualizarColor() {
  let colorHex = document.getElementById("colorInput").value;
  let colorRGB = hexToRgb(colorHex);

  // Pintamos la caja visual
  cajaMuestra.style.backgroundColor = colorHex;

  // PREDECIMOS
  let resultado = redNeuronal.run(colorRGB);

  let probBlanco = resultado.blanco || 0;
  let probNegro = resultado.negro || 0;

  let textoPrediccion = "";

  // Decidimos el ganador
  if (probBlanco > probNegro) {
    textoPrediccion = "BLANCO (" + Math.floor(probBlanco * 100) + "%)";
    cajaMuestra.style.color = "white";
    // Forzamos el color del texto de la muestra también
    if (textoMuestra) textoMuestra.style.color = "white";
  } else {
    textoPrediccion = "NEGRO (" + Math.floor(probNegro * 100) + "%)";
    cajaMuestra.style.color = "black";
    if (textoMuestra) textoMuestra.style.color = "black";
  }

  prediccionLabel.innerText = textoPrediccion;
}

function entrenar(votoUsuario) {
  let colorHex = document.getElementById("colorInput").value;
  let colorRGB = hexToRgb(colorHex);

  // Definimos qué es lo correcto según el usuario
  let outputDeseado = votoUsuario === "negro" ? { negro: 1 } : { blanco: 1 };

  // Entrenamos
  redNeuronal.train([{ input: colorRGB, output: outputDeseado }]);

  log(`Aprendido: ${colorHex} -> Texto ${votoUsuario.toUpperCase()}`);

  // GUARDAMOS AUTOMÁTICAMENTE
  guardarCerebro();

  // Volvemos a predecir para ver el cambio inmediato
  actualizarColor();
}
