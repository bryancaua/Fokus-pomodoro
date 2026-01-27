const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

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

    const botao = document.createElement('p');
    botao.classList.add('app_button-edit');

    botao.onclick = ()  => {
        const novaDescricaoTarefa = prompt("Qual sua nova tarefa?");
        paragrafo.textContent = novaDescricaoTarefa;
        tarefa.descricao = novaDescricaoTarefa;
        atualizarTarefa();
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);

    li.appendChild(svg);
    li.appendChild(paragrafo);
    li.appendChild(botao);

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

tarefas.forEach(tarefa => { //serve para mostrar as tarefas que foram criadas e estão guardadas localmente ao recarregar a página.
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});


