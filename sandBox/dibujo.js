// 1. Variables de Estado
let dibujando = false; // ¿Tengo el clic presionado?
let x = 0;
let y = 0;

const lienzo = document.getElementById("miPizarra");
const contexto = lienzo.getContext("2d"); // Objeto que permite pintar

// 2. Eventos del Mouse
// Cuando presiono el botón
lienzo.addEventListener("mousedown", function (e) {
  x = e.offsetX;
  y = e.offsetY;
  dibujando = true;
});

// Cuando muevo el mouse
lienzo.addEventListener("mousemove", function (e) {
  if (dibujando === true) {
    dibujarLinea(contexto, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

// Cuando suelto el botón
window.addEventListener("mouseup", function (e) {
  if (dibujando === true) {
    dibujarLinea(contexto, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    dibujando = false;
  }
});

// 3. Función Mágica para Pintar
function dibujarLinea(contexto, x1, y1, x2, y2) {
  contexto.beginPath();
  contexto.strokeStyle = "black"; // Color del lápiz
  contexto.lineWidth = 3; // Grosor del lápiz
  contexto.moveTo(x1, y1);
  contexto.lineTo(x2, y2);
  contexto.stroke();
  contexto.closePath();
}

/* --- EXTRA: BOTÓN BORRAR --- */
const borrarPizarra = function () {
  contexto.clearRect(0, 0, lienzo.width, lienzo.height);
};
