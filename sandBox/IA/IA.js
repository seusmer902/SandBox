/* ==========================================
   CEREBRO OLYMPUS v-10.01
   Red Neuronal para Contraste de Color
   ========================================== */

// 1. Configuración de la Red
// Usamos brain.NeuralNetwork que viene del archivo brain.js
const redNeuronal = new brain.NeuralNetwork();

const divLogs = document.getElementById("logs");
const cajaMuestra = document.getElementById("cajaMuestra");
const textoMuestra = document.getElementById("textoMuestra");
const prediccionLabel = document.getElementById("prediccionIA");

// Función para escribir en la consola verde
function log(mensaje) {
  divLogs.innerHTML += `> ${mensaje}<br>`;
  divLogs.scrollTop = divLogs.scrollHeight; // Bajar scroll automáticamente
}

// 2. Inicialización
document.addEventListener("DOMContentLoaded", function () {
  if (typeof brain !== "undefined") {
    log("Librería Brain.js detectada.");
    log("Red Neuronal activada. Esperando datos...");

    // Entrenamos con 2 datos básicos para que no empiece en cero absoluto
    redNeuronal.train([
      { input: { r: 0, g: 0, b: 0 }, output: { blanco: 1 } }, // Negro -> Texto Blanco
      { input: { r: 1, g: 1, b: 1 }, output: { negro: 1 } }, // Blanco -> Texto Negro
    ]);

    actualizarColor(); // Para predecir el color inicial
  } else {
    log("ERROR: No se encontró brain.js");
  }
});

// 3. Convertir Hex (#000000) a RGB Normalizado (0 a 1)
// Las redes neuronales prefieren números entre 0 y 1
function hexToRgb(hex) {
  // Quitamos el #
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255, // Dividimos por 255 para tener 0-1
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

// 4. Actualizar Visualización y PREDECIR
function actualizarColor() {
  let colorHex = document.getElementById("colorInput").value;
  let colorRGB = hexToRgb(colorHex);

  // Pintamos la caja
  cajaMuestra.style.backgroundColor = colorHex;

  // --- AQUÍ OCURRE LA MAGIA DE LA IA ---
  // Le preguntamos a la red: "¿Qué opinas de este color?"
  let resultado = redNeuronal.run(colorRGB);

  // El resultado es algo como: { blanco: 0.98, negro: 0.02 }
  // Ordenamos para ver cuál gana
  let probabilidadBlanco = resultado.blanco || 0;
  let probabilidadNegro = resultado.negro || 0;

  let textoPrediccion = "";

  if (probabilidadBlanco > probabilidadNegro) {
    textoPrediccion = "BLANCO (" + Math.floor(probabilidadBlanco * 100) + "%)";
    // Visualmente mostramos lo que la IA piensa
    cajaMuestra.style.color = "white";
    textoMuestra.style.color = "white";
  } else {
    textoPrediccion = "NEGRO (" + Math.floor(probabilidadNegro * 100) + "%)";
    cajaMuestra.style.color = "black";
    textoMuestra.style.color = "black";
  }

  prediccionLabel.innerText = textoPrediccion;
}

// 5. Entrenar (El usuario enseña)
function entrenar(votoUsuario) {
  let colorHex = document.getElementById("colorInput").value;
  let colorRGB = hexToRgb(colorHex);

  // Creamos el objeto de salida deseada
  // Si el usuario dice "negro", le enseñamos { negro: 1 }
  let outputDeseado = {};
  if (votoUsuario === "negro") {
    outputDeseado = { negro: 1 };
  } else {
    outputDeseado = { blanco: 1 };
  }

  // ¡ENTRENAMIENTO!
  // Le pasamos el color actual y la respuesta correcta
  redNeuronal.train([{ input: colorRGB, output: outputDeseado }]);

  log(`Aprendido: Fondo ${colorHex} -> Texto ${votoUsuario.toUpperCase()}`);

  // Volvemos a predecir para ver si cambió de opinión
  actualizarColor();
}
