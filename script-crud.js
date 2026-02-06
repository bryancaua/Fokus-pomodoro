const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const descricaoTarefaAndamento = document.querySelector('.app__section-active-task-description');
const apagarTarefasConcluidas = document.getElementById('btn-remover-concluidas');
const apagarTarefas = document.getElementById('btn-remover-todas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefa () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao__edicao = document.createElement('button');
    botao__edicao.classList.add('app_button-edit');

    botao__edicao.onclick = () => {
        const novaDescricaoTarefa = prompt("Qual sua nova tarefa?");
        if (novaDescricaoTarefa) {
            paragrafo.textContent = novaDescricaoTarefa;
            tarefa.descricao = novaDescricaoTarefa;
            atualizarTarefa();
        } 
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao__edicao.append(imagemBotao);

    li.appendChild(svg);
    li.appendChild(paragrafo);
    li.appendChild(botao__edicao);

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao__edicao.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active');
            });
            if(tarefaSelecionada == tarefa) {
                descricaoTarefaAndamento.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            descricaoTarefaAndamento.textContent = tarefa.descricao;

            li.classList.add('app__section-task-list-item-active');
        }
    }



    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

const limparFormulario = () => {
    textArea.value = '';  
    formAdicionarTarefa.classList.add('hidden');
}

btnCancelarTarefa.addEventListener('click', limparFormulario);

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa); //serve para CRIAR as tarefas e adicionar á ul e após isso são armazenadas no localStorage
    ulTarefas.append(elementoTarefa);
    atualizarTarefa();
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
})

tarefas.forEach(tarefa => { //serve para MOSTRAR as tarefas que foram criadas anteriormente e estão guardadas localmente ao recarregar a página.
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefa();
    }
})

const removerTarefas = (somenteCompletas) => {
    const seletorTarefas = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";
    document.querySelectorAll(seletorTarefas).forEach(tarefaConcluida => {
        tarefaConcluida.remove();
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefa();
}

apagarTarefasConcluidas.onclick = () => removerTarefas(true);
apagarTarefas.onclick = () => removerTarefas(false);

