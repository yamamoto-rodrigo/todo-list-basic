// 1. SELEÇÃO DE ELEMENTOS (DOM)

const taskForm = document.querySelector("#task-form");
const taskNameInput = document.querySelector("#task-name");
const taskDateInput = document.querySelector("#task-date");
const taskPriorityInput = document.querySelector("#task-priority");
const taskList = document.querySelector("#task-list");
const totalTasksSpan = document.querySelector("#total-tasks");
const totalCompletedSpan = document.querySelector("#completed-tasks");
const totalPendingSpan = document.querySelector("#pending-tasks");

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
    updateTaskCount();
}

function updateTaskCount() {
    const totalTasks = taskList.children.length;
    const totalCompleted = taskList.querySelectorAll(".task-completed").length;
    const totalPending = totalTasks - totalCompleted;

    totalTasksSpan.textContent = `${totalTasks}`;
    totalCompletedSpan.textContent = `${totalCompleted}`;
    totalPendingSpan.textContent = `${totalPending}`;
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

taskList.addEventListener("click", (clickEvent) => {
    const clickedItem = clickEvent.target;
    const deleteButton = clickedItem.closest(".btn-delete");

    if(deleteButton) {
        const deleteChoice = window.confirm("Tem certeza que deseja excluir esta tarefa?");
        if(deleteChoice) {
            const taskItem = deleteButton.closest(".task-item");
            taskItem.remove();
            updateTaskCount();
            return;
        }
    }

    const completeButton = clickedItem.closest(".btn-complete");
    if(completeButton) {
        const taskItem = completeButton.closest(".task-item");
        taskItem.classList.toggle("task-completed");
        completeButton.innerHTML = taskItem.classList.contains("task-completed") ? "Desfazer" : "Concluir";
        updateTaskCount();
    }
})

updateTaskCount();