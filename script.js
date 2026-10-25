
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-task");

let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function updateCounts() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("total-count").textContent = total;
    document.getElementById("pending-count").textContent = pending;
    document.getElementById("completed-count").textContent = completed;
}
searchInput.addEventListener("input", renderTasks);
function renderTasks() {
    taskList.innerHTML = "";

    
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText) ||
        task.subject.toLowerCase().includes(searchText)
    );

    if (filteredTasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty-message">No tasks yet. Add your first task!</p>';
        updateCounts();
        return;
    }

           filteredTasks.forEach(task => {
              
    
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + task.subject;

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + task.date;

        const priority = document.createElement("p");
        priority.className = "priority";
        priority.textContent = "Priority: " + task.priority;

        taskInfo.append(title, subject, dueDate, priority);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
         });  
        

         
const editButton = document.createElement("button");
editButton.className = "edit-btn";
editButton.textContent = "Edit";

editButton.addEventListener("click", () => {
    const newTitle = prompt("Enter new task title:", task.title);

    if (newTitle === null) return;

    if (newTitle.trim() === "") {
        alert("Task title cannot be empty.");
        return;
    }

    const newSubject = prompt("Enter new subject:", task.subject);

    if (newSubject === null) return;

    if (newSubject.trim() === "") {
        alert("Subject cannot be empty.");
        return;
    }

    const newDate = prompt(
        "Enter new due date (YYYY-MM-DD):",
        task.date
    );

    if (newDate === null) return;

    if (newDate.trim() === "") {
        alert("Due date cannot be empty.");
        return;
    }

    task.title = newTitle.trim();
    task.subject = newSubject.trim();
    task.date = newDate.trim();

    saveTasks();
    renderTasks();
    });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        actions.append(completeButton,editButton, deleteButton);
        taskItem.append(taskInfo, actions);
        taskList.appendChild(taskItem);
    });

    updateCounts();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    const subject = document.getElementById("task-subject").value.trim();
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;

    if (!title || !subject || !date) {
        alert("Please fill in all required fields.");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        subject: subject,
        date: date,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
    taskForm.reset();
});

searchInput.addEventListener("input", renderTasks);
renderTasks();
