actualizarReloj = function () {
  const ahora = new Date();

  // --- RELOJ ---
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();
  let segundos = ahora.getSeconds();

  let fase = "Madrugada";
  if (horas >= 6 && horas < 12) fase = "Mañana";
  else if (horas >= 12 && horas < 19) fase = "Tarde";
  else if (horas >= 19) fase = "Noche";

  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  // VALIDAMOS QUE EXISTAN LOS ELEMENTOS ANTES DE PINTAR
  // (Esto es importante por si borras el reloj del HTML algún día)
  let cajaReloj = document.getElementById("relojDigital");
  if (cajaReloj) {
    cajaReloj.innerText = horas + ":" + minutos + ":" + segundos;
    document.getElementById("faseDia").innerText = fase;
  }

  // --- FECHA ---
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let diaNombre = diasSemana[ahora.getDay()];
  let diaNumero = ahora.getDate();
  let mesNombre = meses[ahora.getMonth()];
  let anio = ahora.getFullYear();

  let cajaDia = document.getElementById("diaSemana");
  if (cajaDia) {
    cajaDia.innerText = diaNombre;
    document.getElementById("fechaCompleta").innerText =
      diaNumero + " de " + mesNombre + " de " + anio;
  }
};

// ACTIVAMOS EL INTERVALO AUTOMÁTICAMENTE
setInterval(actualizarReloj, 1000);
actualizarReloj();
