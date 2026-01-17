// 1. SELEÇÃO DE ELEMENTOS (DOM)

const taskForm = document.querySelector("#task-form");
const taskNameInput = document.querySelector("#task-name");
const taskDateInput = document.querySelector("#task-date");
const taskPriorityInput = document.querySelector("#task-priority");
const taskList = document.querySelector("#task-list");
const totalTasksSpan = document.querySelector("#total-tasks");
const totalCompletedSpan = document.querySelector("#completed-tasks");
const totalPendingSpan = document.querySelector("#pending-tasks");

let tasks = [];
// 2. FUNÇÕES

function createTask(id, name, date, priority, completed) {
    const brazilianDate = date.split("-").reverse().join("/");
    const newTask = document.createElement("li");

    newTask.classList.add("task-item", `priority-${priority.toLowerCase()}`);

    newTask.setAttribute('data-id', id);
    const buttonText = completed ? "Desfazer" : "Concluir";
    const statusClass = completed ? "btn-undo" : "btn-complete";

    if (completed){
        newTask.classList.add("task-completed");
    }

    newTask.innerHTML = `
     <div class="task-info">
        <strong>${name}</strong>
        <span class="task-date">${brazilianDate}</span>
     </div>
     
     <div class="task-actions">
        
        <button class="btn ${statusClass}">${buttonText}</button>
        <button class="btn btn-delete">Excluir</button>
     </div>`;

    taskList.appendChild(newTask);
    updateTaskCount();
}

function renderTasks() {
    taskList.innerHTML = "";
    if(tasks.length === 0) {
        updateTaskCount();
        return;
    }
    tasks.forEach(task => {
        createTask(task.id, task.name, task.date, task.priority, task.completed);
    })
}

function updateTaskCount() {
    const totalTasks = taskList.children.length;
    const totalCompleted = taskList.querySelectorAll(".task-completed").length;
    const totalPending = totalTasks - totalCompleted;

    totalTasksSpan.textContent = `${totalTasks}`;
    totalCompletedSpan.textContent = `${totalCompleted}`;
    totalPendingSpan.textContent = `${totalPending}`;
}

function  deleteTask(taskDeleteBtn) {
    const deleteChoice = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if(!deleteChoice) {
        return;
    }
    const taskItem = taskDeleteBtn.closest(".task-item");
    tasks = tasks.filter(task => task.id !== Number(taskItem.dataset.id));
    saveTasks();
    renderTasks();
}

function completeTask(taskStatusBtn) {
    const taskItem = taskStatusBtn.closest(".task-item");
    const taskID = Number(taskItem.dataset.id);
    const task = tasks.find(task => task.id === Number(taskID));
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}
// 3. EVENTOS

taskForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
    let newTask = {};
    newTask.id = Date.now();
    newTask.name = taskNameInput.value;
    newTask.date = taskDateInput.value;
    newTask.priority = taskPriorityInput.value;
    newTask.completed = false;
    tasks.push(newTask);
    renderTasks();
    taskNameInput.value = "";
    taskDateInput.value = "";
    taskPriorityInput.value = "";
    taskNameInput.focus();
    saveTasks();
})

taskList.addEventListener("click", (clickEvent) => {
    const clickedItem = clickEvent.target;
    const taskDeleteBtn = clickedItem.closest(".btn-delete");

    if(taskDeleteBtn) {
        deleteTask(taskDeleteBtn);
        return;
    }

    const taskStatusBtn = clickedItem.closest(".btn-complete, .btn-undo");
    if(taskStatusBtn) {
        completeTask(taskStatusBtn);
    }
})

loadTasks();
renderTasks();