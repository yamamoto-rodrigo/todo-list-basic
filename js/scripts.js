// 1. SELEÇÃO DE ELEMENTOS (DOM)

const taskForm = document.querySelector("#task-form");
const taskNameInput = document.querySelector("#task-name");
const taskDateInput = document.querySelector("#task-date");
const taskPriorityInput = document.querySelector("#task-priority");
const taskList = document.querySelector("#task-list");

// 2. FUNÇÕES

function createTask(name, date, priority) {
    const brazilianDate = date.split("-").reverse().join("/");
    const newTask = document.createElement("li");

    newTask.classList.add("task-item", `priority-${priority.toLowerCase()}`);

    newTask.innerHTML = `
     <div class="task-info">
        <strong>${name}</strong>
        <span class="task-date">${brazilianDate}</span>
     </div>
     
     <div class="task-actions">
        <button class="btn btn-complete">Concluir</button>
        <button class="btn btn-delete">Excluir</button>
     </div>`;

    taskList.appendChild(newTask);
}

// 3. EVENTOS

taskForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
    createTask(taskNameInput.value, taskDateInput.value, taskPriorityInput.value);
    taskNameInput.value = "";
    taskDateInput.value = "";
    taskPriorityInput.value = "";
    taskNameInput.focus();
})