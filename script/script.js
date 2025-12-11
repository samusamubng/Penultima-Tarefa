const lista = document.getElementById("lista");
const taskInput = document.getElementById("task");
const count = document.getElementById("count");
let tasks = [], filtro = 'todas';

document.getElementById("filtro").innerHTML += '<button id="limpar">Limpar Concluídas</button>';

document.getElementById("adicionar-tarefa").addEventListener("click", addTask);
taskInput.addEventListener('keypress', e => e.key === 'Enter' && addTask());

lista.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = parseInt(li.dataset.id);
    if (e.target.type === 'checkbox') toggleTask(id);
    else if (e.target.classList.contains('editar')) editTask(id, li);
    else if (e.target.classList.contains('excluir')) deleteTask(id);
});

document.getElementById("filtro").addEventListener('click', e => {
    if (e.target.id === 'Pendentes') filtro = 'pendentes';
    else if (e.target.id === 'Concluidas') filtro = 'concluidas';
    else if (e.target.id === 'Todas') filtro = 'todas';
    else if (e.target.id === 'limpar') {
        tasks = tasks.filter(t => !t.completed);
        updateCount();
    }
    render();
});

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text, completed: false });
        taskInput.value = '';
        localStorage.setItem("Tarefa", JSON.stringify(tasks));
        render();
        updateCount();
    }

}

function render() {
    lista.innerHTML = '';
    const dados = JSON.parse(localStorage.getItem("Tarefa"));

    dados.filter(t => {
        if (filtro === 'pendentes') return !t.completed;
        if (filtro === 'concluidas') return t.completed;
        return true;
    }).forEach(t => {
        const li = document.createElement('li');
        li.dataset.id = t.id;
        li.innerHTML = `<input type="checkbox" ${t.completed ? 'checked' : ''}>
                       <span class="${t.completed ? 'completed' : ''}">${t.text}</span>
                       <button class="editar">Editar</button>
                       <button class="excluir">Excluir</button>`;
        lista.appendChild(li);
    });
}

function editTask(id, li) {
    const task = d.find(t => t.id === id);
    if (!task) return;

    const span = li.querySelector('span');
    const input = document.createElement('input');
    input.value = task.text;

    span.replaceWith(input);
    input.focus();

    const save = () => {
        task.text = input.value.trim() || task.text;
        render();
    };

    input.addEventListener('blur', save);
    input.addEventListener('keypress', e => e.key === 'Enter' && save());
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
    updateCount();
}

function toggleTask(id) {
    const storage = JSON.parse(localStorage.getItem("Tarefa"));
    const listaStore = storage;

    const task = listaStore.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        render();
        updateCount();
    }
}

let novaLista = [];

listaStore.forEach(element => {
    if (element.id === id) {
        novaLista.push(tasks);
    } else {
        novaLista.push(element);
    }
});

localStorage.setItem("task", JSON.stringify(novaLista));
console.log(novaLista, "nova");



function updateCount() {
    count.textContent = tasks.filter(t => !t.completed).length;
}

updateCount();