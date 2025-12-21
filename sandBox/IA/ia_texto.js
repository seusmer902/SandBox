console.log("Cerebro de Texto listo para ser programado.");
function analizarTexto() {
  alert("¡Aún no tengo cerebro! Enséñame pronto.");
}

/* ==========================================
   CEREBRO DE TEXTO OLYMPUS (LSTM) v1.2
   Modo: Memoria Persistente (LocalStorage)
   ========================================== */

const redNeuronal = new brain.recurrent.LSTM();

// Elementos del HTML
const divLogs = document.getElementById("logs");
const entradaTexto = document.getElementById("entradaTexto");
const resultadoEmocion = document.getElementById("resultadoEmocion");
const detalleEmocion = document.getElementById("detalleEmocion");

// --- BASE DE DATOS POR DEFECTO ---
const datosBase = [
  { input: "estoy feliz", output: "feliz" },
  { input: "que buen dia", output: "feliz" },
  { input: "me siento genial", output: "feliz" },
  { input: "amo esto", output: "feliz" },
  { input: "estoy triste", output: "triste" },
  { input: "que mal dia", output: "triste" },
  { input: "me duele", output: "triste" },
  { input: "odio esto", output: "triste" },
];

// Variable que usaremos para entrenar (puede crecer)
let datosDeEntrenamiento = [];

function log(mensaje) {
  divLogs.innerHTML += `> ${mensaje}<br>`;
  divLogs.scrollTop = divLogs.scrollHeight;
}

// --- 1. GESTIÓN DE MEMORIA 💾 ---
function cargarMemoria() {
  const memoriaGuardada = localStorage.getItem("memoriaTextoOlympus");

  if (memoriaGuardada) {
    datosDeEntrenamiento = JSON.parse(memoriaGuardada);
    log(
      "💾 Memoria cargada: " +
        datosDeEntrenamiento.length +
        " frases conocidas."
    );
  } else {
    // Si es la primera vez, usamos la base
    datosDeEntrenamiento = [...datosBase]; // Copiamos la base
    log("🆕 Iniciando memoria desde cero.");
  }
}

function guardarMemoria() {
  localStorage.setItem(
    "memoriaTextoOlympus",
    JSON.stringify(datosDeEntrenamiento)
  );
}

function resetearCerebroTexto() {
  localStorage.removeItem("memoriaTextoOlympus");
  location.reload();
}

// --- 2. ENTRENAMIENTO ---
function ejecutarEntrenamiento() {
  log("🧠 Entrenando... (Esto toma unos segundos)");

  setTimeout(() => {
    // Entrenamos con TODOS los datos (los viejos y los nuevos)
    redNeuronal.train(datosDeEntrenamiento, {
      iterations: 60,
      log: false,
    });

    log("✅ ¡Olympus Text está lista!");

    // Si hay algo escrito, lo analizamos de una vez
    if (entradaTexto.value.trim() !== "") {
      analizarTexto();
    }
  }, 100);
}

// --- 3. ANÁLISIS ---
function analizarTexto() {
  let frase = entradaTexto.value.toLowerCase().trim();

  if (frase === "") {
    alert("Escribe algo primero.");
    return;
  }

  const resultado = redNeuronal.run(frase);

  if (resultado === "feliz") {
    resultadoEmocion.innerText = "😃";
    detalleEmocion.innerText = "Detecto: FELICIDAD";
    resultadoEmocion.style.color = "#4caf50";
  } else if (resultado === "triste") {
    resultadoEmocion.innerText = "😢";
    detalleEmocion.innerText = "Detecto: TRISTEZA";
    resultadoEmocion.style.color = "#f44336";
  } else {
    resultadoEmocion.innerText = "😐";
    detalleEmocion.innerText = "Confuso / Neutro";
    resultadoEmocion.style.color = "white";
  }
}

// --- 4. APRENDIZAJE ACTIVO (ENSEÑAR) ---
function entrenarNuevaFrase(emocionCorrecta) {
  let frase = entradaTexto.value.toLowerCase().trim();

  if (frase === "") return;

  // Agregamos a la lista
  datosDeEntrenamiento.push({
    input: frase,
    output: emocionCorrecta,
  });

  log(`📝 Aprendido: "${frase}" es ${emocionCorrecta.toUpperCase()}`);

  // GUARDAMOS Y RE-ENTRENAMOS
  guardarMemoria();
  ejecutarEntrenamiento();
}

// --- INICIO ---
document.addEventListener("DOMContentLoaded", function () {
  if (typeof brain !== "undefined") {
    cargarMemoria(); // 1. Cargar datos
    setTimeout(ejecutarEntrenamiento, 500); // 2. Entrenar red
  }
});
