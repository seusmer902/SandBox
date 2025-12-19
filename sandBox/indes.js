//indes.js

sumar = function (n1, n2) {
  let suma = n1 + n2;
  return suma;
};

LetraNumero = function (n1) {
  let numero = n1.length;
  return numero;
};

//  LÓGICA DE CONTRASEÑAS
generarClaveAleatoria = function (longitud) {
  // 1. Definimos todos los caracteres posibles
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  let resultado = "";

  // 2. Hacemos un bucle que se repita tantas veces como la 'longitud'
  for (let i = 0; i < longitud; i++) {
    // Elegimos un número al azar entre 0 y el total de caracteres
    let azar = Math.floor(Math.random() * caracteres.length);

    // Agregamos la letra correspondiente a nuestro resultado
    resultado += caracteres.charAt(azar);
  }

  return resultado;
};
