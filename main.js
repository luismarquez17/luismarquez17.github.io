// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer =60;
let timerInicial = 60;
let tiempoRegresivoId = null;

let winAudio = new Audio("./sounds/win.wav");
let loseAudio = new Audio("./sounds/lose.wav");
let rightAudio = new Audio("./sounds/right.wav");
let wrongAudio = new Audio("./sounds/wrong.wav");

// apuntando a documento html
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");
let restartButton = document.createElement('button');

// generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

// funciones
function contarTiempo(){
 tiempoRegresivoId = setInterval(()=>{
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if(timer == 0){
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      loseAudio.play();
    }
    },1000)
}

function bloquearTarjetas(){
 for (let i = 0; i<=15; i++){
   let tarjetaBloqueada = document.getElementById(i);
   tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;
   tarjetaBloqueada.disabled = true;
 }
}


//funcion principal
function destapar(id){

  if(temporizador == false){
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

if(tarjetasDestapadas == 1){
  // mostrar el primer numero
  tarjeta1 = document.getElementById(id);
  primerResultado = numeros[id]
  tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;

  // deshabilitar el primer boton
  tarjeta1.disabled = true;
  }else if(tarjetasDestapadas == 2){
    // mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

    // deeshabilitar el segundo boton 
    tarjeta2.disabled = true;

    // incrementar numero de movientos
    movimientos++;
    mostrarMovimientos.innerHTML = `movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
        // encerar contador de tarjetas destapadas
        tarjetasDestapadas = 0;

        // aumentar aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `aciertos: ${aciertos}`;
        rightAudio.play();

    if(aciertos == 8){
      winAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `aciertos: ${aciertos} 😱`;
        mostrarTiempo.innerHTML = `Fantastico! 🎉 solo demoraste ${timerInicial - timer} segundos`;
        mostrarMovimientos.innerHTML = `movimientos: ${movimientos} 🤘😎`;
    }

    }else{
      wrongAudio.play();
        // mostrar momentaneamente valores y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = " ";
            tarjeta2.innerHTML = " ";
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },1000);
    }
  }
 
} 