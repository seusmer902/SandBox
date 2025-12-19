//indes.js

sumaNumeros = function () {
  let n1 = recuperarFloat("valorNumeros1");
  let n2 = recuperarFloat("valorNumeros2");

  let suma = sumar(n1, n2);

  let R = "RESULTADO:ㅤ";

  let resultado = "RESULTADO: " + suma;

  if (isNaN(suma)) {
    mostrarTexto("resultadoNumeros", R);
  } else {
    mostrarTexto("resultadoNumeros", resultado);
  }
};

sumaLetras = function () {
  let n1 = recuperarTexto("valorLetras1");
  let n2 = recuperarTexto("valorLetras2");

  let num1 = LetraNumero(n1);
  let num2 = LetraNumero(n2);

  let suma = sumar(num1, num2);

  let R = "RESULTADO:ㅤ";

  let resultado = "RESULTADO: " + suma;

  if (0 == suma) {
    mostrarTexto("resultadoLetras", R);
  } else {
    mostrarTexto("resultadoLetras", resultado);
  }
};

accionVolumen = function (valor) {
  console.log("El volumen es: " + valor);
  let volumen = "VOLUMEN: " + valor;
  mostrarTexto("%Volumen", volumen);

  //Guardamos el valor
  guardarEnMemoria("volumenUsuario", valor);
};

accionColorBody = function (colorNuevo) {
  document.body.style.backgroundColor = colorNuevo;

  //Guardamos el color
  guardarEnMemoria("colorBodyUsuario", colorNuevo);
};

accionColorCaja = function (colorNuevo) {
  let caja = document.getElementById("miCajaPrincipal");
  caja.style.backgroundColor = colorNuevo;

  //Guardamos el color
  guardarEnMemoria("colorCajaUsuario", colorNuevo);
};

aplicarFiltro = function (tipo) {
  let imagen = document.getElementById("vistaPrevia");

  if (tipo === "gris") {
    imagen.style.filter = "grayscale(100%)";
  } else if (tipo === "sepia") {
    imagen.style.filter = "sepia(100%)";
  } else if (tipo === "invertir") {
    imagen.style.filter = "invert(100%)";
  } else {
    // Normal (quitamos los filtros)
    imagen.style.filter = "none";
  }
};

actualizarLargo = function (valor) {
  mostrarTexto("valorLargo", valor);

  guardarEnMemoria("largoPasswordUsuario", valor);
};

accionGenerarPass = function () {
  // a) Recuperamos qué largo quiere el usuario (usando tu función de utilitarios)
  let largo = recuperarInt("largoPass");

  // b) Llamamos a la lógica (indes.js)
  let claveNueva = generarClaveAleatoria(largo);

  // c) Mostramos el resultado en la caja negra
  mostrarTextoEnCaja("txtPassword", claveNueva);
};

// ACCION HABLAR
accionHablar = function () {
  hablarTexto("textoParaHablar");
};

window.onload = function () {
  // 1. RECUPERAR VOLUMEN
  let volGuardado = recuperarDeMemoria("volumenUsuario");
  if (volGuardado !== null) {
    // Ponemos el slider en su posición y actualizamos el texto
    document.getElementById("volumen").value = volGuardado;
    accionVolumen(volGuardado);
  }

  // 2. RECUPERAR COLOR DE FONDO
  let colorBodyGuardado = recuperarDeMemoria("colorBodyUsuario");
  if (colorBodyGuardado !== null) {
    // Ponemos el color en el input y pintamos el fondo
    document.getElementById("colorBody").value = colorBodyGuardado;
    accionColorBody(colorBodyGuardado);
  }

  // 3. RECUPERAR COLOR DE CAJA
  let colorCajaGuardado = recuperarDeMemoria("colorCajaUsuario");
  if (colorCajaGuardado !== null) {
    document.getElementById("colorCaja").value = colorCajaGuardado;
    accionColorCaja(colorCajaGuardado);
  }

  // 4. RECUPERAR LARGO PASSWORD
  let largoGuardado = recuperarDeMemoria("largoPasswordUsuario");
  if (largoGuardado !== null) {
    // 1. Ponemos el slider en su sitio
    document.getElementById("largoPass").value = largoGuardado;
    actualizarLargo(largoGuardado);
  }
};

accionUsuarioRandom = async function () {
  // 1. Cambiamos el texto del botón para que sepa que está cargando
  let nombre = document.getElementById("nombrePerfil");
  nombre.innerText = "Cargando...";

  try {
    // 2. PEDIMOS LOS DATOS A INTERNET
    // 'fetch' va a la URL y 'await' espera la respuesta
    const respuesta = await fetch("https://randomuser.me/api/");

    // 3. Convertimos la respuesta a JSON (formato legible)
    const datos = await respuesta.json();

    // La API nos devuelve un array 'results', tomamos el primero (0)
    const usuario = datos.results[0];

    // 4. USAMOS LOS DATOS PARA PINTAR EL HTML

    // Foto
    document.getElementById("imgPerfil").src = usuario.picture.large;

    // Nombre (La API lo da separado, lo unimos)
    let nombreCompleto = usuario.name.first + " " + usuario.name.last;
    document.getElementById("nombrePerfil").innerText = nombreCompleto;

    // Email y País
    document.getElementById("emailPerfil").innerText = usuario.email;
    document.getElementById("paisPerfil").innerText = usuario.location.country;
  } catch (error) {
    // Si se va el internet o falla algo, avisamos
    console.error("Hubo un error:", error);
    alert("No se pudo conectar con la API.");
  }
};

// DETECTOR DE TECLAS
document.addEventListener("keydown", function (evento) {
  // 1. Capturamos los datos del evento
  let tecla = evento.key; // Ej: "a", "Enter", " "
  let codigo = evento.code; // Ej: "KeyA", "Enter", "Space"
  let numero = evento.keyCode; // Ej: 65, 13, 32

  // 2. Si es la barra espaciadora, el texto sale vacío, así que lo corregimos para que se lea
  if (tecla === " ") {
    tecla = "Espacio";
  }

  // 3. Mostramos en la pantalla (Interfaz)

  // La tecla gigante
  document.getElementById("teclaPresionada").innerText = tecla;

  // Los detalles
  document.getElementById("teclaValor").innerText = tecla;
  document.getElementById("teclaCodigo").innerText = codigo;
  document.getElementById("teclaNumero").innerText = numero;

  // 4. EFECTO VISUAL EXTRA (Opcional)
  // Cambiamos el borde de la caja gigante aleatoriamente al teclear
  let colorRandom = Math.floor(Math.random() * 16777215).toString(16);
  document.querySelector(".caja-tecla-gigante").style.borderColor =
    "#" + colorRandom;
});

// OPCIONAL: Cargar uno automáticamente al iniciar la página
// (Puedes descomentar la línea de abajo si quieres que aparezca uno al entrar)
// accionUsuarioRandom();

//SUMAS
agregarEventoEnter("valorNumeros1", sumaNumeros);
agregarEventoEnter("valorNumeros2", sumaNumeros);

agregarEventoEnter("valorLetras1", sumaLetras);
agregarEventoEnter("valorLetras2", sumaLetras);

//SLIDERS
agregarEventoRango("volumen", accionVolumen);
agregarEventoRango("largoPass", actualizarLargo);

//COLORES
agregarEventoRango("colorBody", accionColorBody);
agregarEventoRango("colorCaja", accionColorCaja);

//IMAGENES
agregarEventoImagen("miInputArchivo", "vistaPrevia");
