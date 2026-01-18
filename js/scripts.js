const UI = {
    taskForm: {
        form: document.querySelector("#task-form"),
        nameInput: document.querySelector("#task-name"),
        dateInput: document.querySelector("#task-date"),
        priorityInput: document.querySelector("#task-priority"),
    },
    tasksStats: {
        statsSection: document.querySelector("#task-stats-section"),
        total: document.querySelector("#total-tasks"),
        completed: document.querySelector("#completed-tasks"),
        pending: document.querySelector("#pending-tasks"),
    },
    taskList: document.querySelector("#task-list"),

    renderTasks: function() {
        this.taskList.innerHTML = "";
        if (app.tasks.length === 0) {
            this.updateTaskCount();
            return;
        }
        app.tasks.forEach(task => {
            app.createTask(task.id, task.name, task.date, task.priority, task.completed);
        });
    },

    updateTaskCount: function() {
        const totalTasks = this.taskList.children.length;
        const totalCompleted = this.taskList.querySelectorAll(".task-completed").length;
        const totalPending = totalTasks - totalCompleted;

        this.tasksStats.total.textContent = `${totalTasks}`;
        this.tasksStats.completed.textContent = `${totalCompleted}`;
        this.tasksStats.pending.textContent = `${totalPending}`;
    }
};

const LocalStorage = {
    getTasks: function() {
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : [];
    },
    saveTasks: function(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

const app = {
    tasks: [],
    //Inicialização
    init: function() {
        this.tasks = LocalStorage.getTasks();
        UI.renderTasks(this.tasks);
        this.setupEventListeners();
    },

    // Funções
    createTask: function(id, name, date, priority, completed) {
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

        UI.taskList.appendChild(newTask);
        UI.updateTaskCount();
    },
    deleteTask: function(taskDeleteBtn){
        const deleteChoice = window.confirm("Tem certeza que deseja excluir esta tarefa?");
        if(!deleteChoice) {
            return;
        }
        const taskItem = taskDeleteBtn.closest(".task-item");
        this.tasks = this.tasks.filter(task => task.id !== Number(taskItem.dataset.id));
        LocalStorage.saveTasks(this.tasks);
        UI.renderTasks(this.tasks);
    },
    completeTask: function(taskStatusBtn){
        const taskItem = taskStatusBtn.closest(".task-item");
        const taskID = Number(taskItem.dataset.id);
        const task = this.tasks.find(task => task.id === Number(taskID));
        task.completed = !task.completed;
        LocalStorage.saveTasks(this.tasks);
        UI.renderTasks(this.tasks);
    },
    clearAllTasks: function() {
        if (this.tasks.length === 0) return;

        const clearChoice = window.confirm("Tem certeza que deseja excluir todas as tarefas?");
        if (clearChoice) {
            this.tasks = [];
            LocalStorage.saveTasks(this.tasks);
            UI.renderTasks(this.tasks);
        }
    },
    clearCompletedTasks: function() {
        const hasCompleted = this.tasks.some(task => task.completed);
        if (!hasCompleted) return;

        const clearChoice = window.confirm("Tem certeza que deseja excluir todas as tarefas completas?");
        if (clearChoice) {
            this.tasks = this.tasks.filter(task => !task.completed);
            LocalStorage.saveTasks(this.tasks);
            UI.renderTasks(this.tasks);
        }
    },

    // Eventos
    setupEventListeners: function() {
        UI.taskForm.form.addEventListener("submit", (submitEvent) => {
            submitEvent.preventDefault();
            let newTask = {};
            newTask.id = Date.now();
            newTask.name = UI.taskForm.nameInput.value;
            newTask.date = UI.taskForm.dateInput.value;
            newTask.priority = UI.taskForm.priorityInput.value;
            newTask.completed = false;
            this.tasks.push(newTask);
            UI.renderTasks(this.tasks);
            UI.taskForm.nameInput.value = "";
            UI.taskForm.dateInput.value = "";
            UI.taskForm.priorityInput.value = "";
            UI.taskForm.nameInput.focus();
            LocalStorage.saveTasks(this.tasks);
        })

        UI.taskList.addEventListener("click", (clickEvent) => {
            const clickedItem = clickEvent.target;

            const taskDeleteBtn = clickedItem.closest(".btn-delete");
            if (taskDeleteBtn) {
                this.deleteTask(taskDeleteBtn);
                return;
            }

            const taskStatusBtn = clickedItem.closest(".btn-complete, .btn-undo");
            if (taskStatusBtn) {
                this.completeTask(taskStatusBtn);
            }

        })

        UI.tasksStats.statsSection.addEventListener("click", (clickEvent) => {
            const clickedItem = clickEvent.target;

            const clearAllTasksBtn = clickedItem.closest(".btn-clear-all-tasks");
            if (clearAllTasksBtn) {
                this.clearAllTasks(clearAllTasksBtn);
                return;
            }

            const clearCompletedTasksBtn = clickedItem.closest(".btn-clear-completed-tasks");
            if (clearCompletedTasksBtn) {
                this.clearCompletedTasks(clearCompletedTasksBtn);
            }
        })
    }

}

app.init();

