let secuenciaMaquina = [];
let secuenciaJugador = [];
let jugadas = 1;


document.querySelector('#empezar').onclick= comenzarJuego;


function comenzarJuego()
{
    secuenciaMaquina = [];
    secuenciaJugador = [];
    jugadas = 1;
    let $recuadro = document.querySelector('#recuadro');
    $recuadro.style.backgroundColor = "#009CD2";
    $recuadro.style.opacity = 0.5;
    gestionarJuego();
}

function gestionarJuego()
{  
    let retraso
    let $turno = document.querySelector('#texto');
    $turno.textContent = "Ronda: " + jugadas + "   Turno de la PC";
    
    bloquearJugador();
    jugadaMaquina();
    console.log("Jugada: "+ jugadas);

    retraso = (secuenciaMaquina.length + 1) * 1500;
    
    setTimeout(function() { 
        let $turno = document.querySelector('#texto');
        $turno.textContent = "Ronda: " + jugadas + "   Turno del jugador/a";   
        turnoJugador();      
      }, retraso); //espera a que se termine de mostrar la secuencia de la máquina, si no se espera, el input se habilita durante el turno de la máquina
   
}


function turnoJugador()
{
    document.querySelectorAll('.col-4').forEach(function($cuadrante) { //se seleccionan todos los cuadrantes y se los recorre con un foreach
        $cuadrante.onclick = (e)=> { //cuando se haga click sobre un cuadrante...
            let indice;
            let $input = e.target; //obtengo el cuadrante al cual se le hizo click
            
            resaltarCuadrante($input);
            secuenciaJugador.push(traducirInput($input)); //traduzco el input (lo llevo de cuadrante a número) y lo agrego a la secuencia del jugador

            indice = secuenciaJugador.length - 1; //guardo en indice la ultima jugada

            if(secuenciaJugador[indice] !== secuenciaMaquina[indice])
            {
                perder();
                bloquearJugador();
                return;
            }
            
            if(secuenciaJugador.length == secuenciaMaquina.length)
            {
                setTimeout(()=>{
                    secuenciaJugador = [];
                    jugadas++;
                    gestionarJuego();
                },1500);   
            }
        };
      });
  
}

function perder()//recuadro texto pasa a rojo e informa que el jugador perdió el juego
{
    let $recuadro = document.querySelector('#recuadro');
    let $turno = document.querySelector('#texto');
   
    $recuadro.style.backgroundColor = "red";
    $recuadro.style.opacity = 0.5;

    $turno.textContent = "Perdiste!! Tocá empezar para volver a jugar...";
}


function resaltarCuadrante(cuadrante)
{
    cuadrante.style.opacity = 1; 
    setTimeout(function(){
        cuadrante.style.opacity = 0.7;
    }, 500); //resalto el color del cuadrante por medio segundo
}

function traducirInput(nodo) //devuelve el nro correspondiente al nodo pasado por parámetro
{
    if(nodo.id == "c1")
        return 1;
    else if(nodo.id == "c2")
        return 2;
    else if(nodo.id == "c3")
        return 3;
    else if(nodo.id == "c4")
        return 4;
}

function bloquearJugador() //se seleccionan los cuadros y cuando se hace click en ellos se llama a una función vacía para que no pase nada
{
    document.querySelectorAll('.col-4').forEach(function($cuadrante){
        $cuadrante.onclick = function()
        {

        };
    });
}

function jugadaMaquina()
{
    secuenciaMaquina.push(crearAleatorio()); //agrega nro aleatorio al array
    mostrarSecuencia(); //prende y apaga los cuadros correspondientes a la secuencia
}

function mostrarSecuencia()
{
    for(let i =0; i<secuenciaMaquina.length;i++)
    {
        let $cuadrante = seleccionarNodo(secuenciaMaquina[i]);
        let retraso = (i + 1) * 1500;
        setTimeout(function(){
            resaltarCuadrante($cuadrante);
        },retraso)  
    }
}

function crearAleatorio() //crea y devuelve nro aleatorio entre 1 y 4 
{
    let numero = Math.floor(Math.random() * (5-1)+1);
    return numero;
}

function seleccionarNodo(numero) //devuelve el cuadrante correspondiente al numero recibido por parámetro
{
    let $nodo;

    switch(numero)
    {
        case 1:
            $nodo = document.querySelector("#c1");
            break;
        case 2:
            $nodo = document.querySelector("#c2");
            break;
        case 3:
            $nodo = document.querySelector("#c3");
            break;
        case 4:
            $nodo = document.querySelector("#c4");
            break;
    }
    return $nodo;

}
