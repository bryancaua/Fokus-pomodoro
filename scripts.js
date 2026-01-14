const html = document.querySelector(`html`);
const focoBt = document.querySelector(`.app__card-button--foco`);
const curtoBt = document.querySelector(`.app__card-button--curto`);
const longoBt = document.querySelector(`.app__card-button--longo`);
const banner = document.querySelector(`.app__image`);
const titulo = document.querySelector(`.app__title`);
const botoes = document.querySelectorAll(`.app__card-button`);
const startPauseBt = document.getElementById(`start-pause`);
const iniciarOuPausarBt = startPauseBt.querySelector(`span`);
const playPauseImg = document.querySelector(`.app__card-primary-butto-icon`);
const timer = document.getElementById(`timer`);

let temporizadorId = null;
let temporizadorAtivo = false; 
let tempoDecorridoEmSegundos = 1500;

const musicaFocoInput = document.getElementById(`alternar-musica`);
const musica = new Audio(`/sons/luna-rise-part-one.mp3`);
const playTimer = new Audio(`/sons/play.wav`);
const pauseTimer = new Audio(`/sons/pause.mp3`);
const beepTimer = new Audio(`/sons/beep.mp3`);

const temposObj = {
    "foco": 1500,
    "descanso-curto": 300,
    "descanso-longo": 900
};

musica.loop = true;

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
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar á superfície<br> <strong class="app__title-strong">Faça uma pausa longa</strong>`;
            break;
        default:
            break;
    }

    tempoDecorridoEmSegundos = temposObj[contexto];
    timerNaTela();
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        beepTimer.play();
        alert(`Tempo finalizado!`);
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    timerNaTela();
}

startPauseBt.addEventListener(`click`, iniciarOuPausar);

function iniciarOuPausar() {
    verificaEstado();
    temporizadorAtivo = !temporizadorAtivo;
    if(temporizadorId) { 
        zerar(); 
        return; 
    }
    temporizadorId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    playPauseImg.setAttribute("src", "/imagens/pause.png");
}

function zerar() {
    clearInterval(temporizadorId);
    iniciarOuPausarBt.textContent = "Começar";
    playPauseImg.setAttribute("src", "/imagens/play_arrow.png");
    temporizadorId = null;
}

function verificaEstado () {
    temporizadorAtivo === false ? playTimer.play() : pauseTimer.play();
} 

function timerNaTela() {
    const minutos = Math.floor(tempoDecorridoEmSegundos / 60);
    const segundos = tempoDecorridoEmSegundos % 60;
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    timer.value = tempoFormatado;
}

timer.addEventListener('change', () => {
    const valor = timer.value;
    const partes = valor.split(':');

    if(partes.length === 2) {
        const minutos = parseInt(partes[0]) || 0;
        const segundos = parseInt(partes[1]) || 0;
        tempoDecorridoEmSegundos = (minutos * 60) + segundos;

        // Atualiza o objeto do contexto atual
        const contextoAtual = html.getAttribute('data-contexto');
        temposObj[contextoAtual] = tempoDecorridoEmSegundos;

        // Reformata o display
        timerNaTela();
    }
});

// Formata enquanto o usuário digita
timer.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/[^0-9]/g, ''); // Remove tudo exceto números

    if(valor.length >= 2) {
        valor = valor.slice(0, 2) + ':' + valor.slice(2, 4);
    }

    e.target.value = valor;
});

// Inicializa
alterarContexto(`foco`);
