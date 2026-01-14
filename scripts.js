const html = document.querySelector(`html`);
const focoBt = document.querySelector(`.app__card-button--foco`);
const curtoBt = document.querySelector(`.app__card-button--curto`);
const longoBt = document.querySelector(`.app__card-button--longo`);
const banner = document.querySelector(`.app__image`);
const titulo = document.querySelector(`.app__title`);
const botoes = document.querySelectorAll(`.app__card-button`);
const startPauseBt = document.getElementById(`start-pause`);

let temporizadorId = null;
let tempoDecorridoEmSegundos = 5; 

const musicaFocoInput = document.getElementById(`alternar-musica`);
const musica = new Audio(`/sons/luna-rise-part-one.mp3`);
const playTimer = new Audio(`/sons/play.wav`);
const pauseTimer = new Audio(`/sons/pause.mp3`);
const beepTimer = new Audio(`/sons/beep.mp3`);

musicaFocoInput.addEventListener(`change`, () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener(`click`, () => {
    alterarContexto(`foco`);
    focoBt.classList.add(`active`);
})

curtoBt.addEventListener(`click`, () => {
    alterarContexto(`descanso-curto`);
    curtoBt.classList.add(`active`);
})

longoBt.addEventListener(`click`, () => {
    alterarContexto(`descanso-longo`);
    longoBt.classList.add(`active`);
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove(`active`);
    })
    html.setAttribute(`data-contexto`, contexto);
    banner.setAttribute(`src`, `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
    
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta</strong>`
            
        break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar á superfície<br> <strong class="app__title-strong">Faça uma pausa longa</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        beepTimer.play();
        alert(`Tempo finalizado!`);
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    console.log(`Temporizador:` + tempoDecorridoEmSegundos);
}

startPauseBt.addEventListener(`click`, iniciarOuPausar);

function iniciarOuPausar() {
    verificaEstado();
    temporizadorAtivo = !temporizadorAtivo;
    if(temporizadorId) { zerar(); return; }
    temporizadorId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(temporizadorId);
    temporizadorId = null;
}

let temporizadorAtivo = false;

function verificaEstado () {
    temporizadorAtivo === false ? playTimer.play() : pauseTimer.play();
} 
