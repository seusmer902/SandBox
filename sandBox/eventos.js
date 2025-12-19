document.addEventListener("keydown", function (evento) {
  let tecla = evento.key;
  let codigo = evento.code;
  let numero = evento.keyCode;

  if (tecla === " ") {
    tecla = "Espacio";
  }

  // Validamos si existe la pantalla de teclas antes de intentar escribir
  let pantalla = document.getElementById("teclaPresionada");

  if (pantalla) {
    pantalla.innerText = tecla;
    document.getElementById("teclaValor").innerText = tecla;
    document.getElementById("teclaCodigo").innerText = codigo;
    document.getElementById("teclaNumero").innerText = numero;

    let colorRandom = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector(".caja-tecla-gigante").style.borderColor =
      "#" + colorRandom;
  }
});
