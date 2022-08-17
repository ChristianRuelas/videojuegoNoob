const ken = document.querySelector('.ken');
const pipe = document.querySelector('.pipe');
const tablero = document.querySelector('.game-board');
let shot = 0;//variable para ver si has perdido
let score = 0;//variable para el marcador
const musicBack = new Audio('streetsong.mp3');
const colisionsong = new Audio('gameover.mp3');

musicBack.loop = true;//repetir el sonido
const jump = () => {
    musicBack.play();//empezar a reproducir sonido
    //unicamente se salta con la tecla SPACE
    if (event.code == "Space" && shot == 0) {
        document.getElementById('p1').src = "img/ken-jumpu.gif";//cambiar la imagen en salto
        //document.getElementById('p1').style.height="250px";
        ken.classList.add('jump');
        setTimeout(() => {
            if (shot == 0) {

                ken.classList.remove('jump');
                document.getElementById('p1').src = "img/ken.gif";//volver a la imagen de ken corriendo
                document.getElementById('p1').style.width = "150px";
            }

        }, 800);
    }
}
//funcion para el marcador
var scoreInterval = setInterval(() => {
    score++;
   
    document.getElementById('score').innerText = score;
    if (score == 20) {

        document.getElementById('poder').src = "img/rasengan.png";//cambiar poder 
        //pipe.style.animation=' pipe-animation 1.7s infinite linear';
    }


}, 1000);
//coliciones
var loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const kenPosition = window.getComputedStyle(ken).bottom.replace('px', '');
    //console.log(kenPosition);

    if (pipePosition <= 200 && pipePosition > 0 && kenPosition < 100 && shot == 0) {
        musicBack.pause();
        colisionsong.play();
        pipe.style.animation = 'stop';//detener la animacion del hoduken
        tablero.style.animation = 'stop';
        pipe.style.left = `${pipePosition}px`;
        crash();
        clearInterval(loop);
        clearInterval(scoreInterval);
    }
}, 10);
//funcion para cuando se colicione
function crash() {
    document.getElementById('p1').src = "img/ken-twist.gif";
    ken.style.left = '130px';
    shot = 1;
    document.getElementById('cloud').src = "img/gameover.png";

    setTimeout(() => {
        document.getElementById('p1').src = "img/ken-ts-stance.gif";
        pipe.style.left = `-200px`;
        // pipe.style.animation = 'stop';//detener la animacion del hoduken
        // pipe.style.left = `${pipePosition}px`;
    }, 2000);
}

document.addEventListener('keydown', jump);
//recargar la pagina
function restart() {
    window.location.reload();
}