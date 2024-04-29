//Calculadora de Divisores de un número entero
//Trabajo de Javier Reyes

let numero;
let divisores = [];

do {
    numero = prompt("Por favor, ingresa un número entero mayor que cero:");

    if (numero.includes('.') || numero.includes(',') || isNaN(parseInt(numero, 10)) || parseInt(numero, 10) <= 0) {
        alert("Favor ingresar un número entero mayor que cero");
        numero = NaN;
    } else {
        numero = parseInt(numero, 10);
    }
} while (isNaN(numero) || numero <= 0);

for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
        divisores.push(i);
    }
}

for (let i = 0; i < divisores.length; i++) {
    let divisor = divisores[i];
    let multiplos = [];

    for (let j = divisor; j <= numero; j += divisor) {
        multiplos.push(j);
    }

    alert("Divisor: " + divisor + "\nMúltiplos: " + multiplos.join(", "));
}