window.onload = function () {
    renderTasks();
};

function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();
    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    const tasks = getTasks();
    // Add to the beginning using unshift
    tasks.unshift(task);
    saveTasks(tasks);
    renderTasks();

    input.value = "";
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = getTasks();
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", () => {
            toggleTask(index);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTask(index) {
    let tasks = getTasks();

    // Toggle completed status
    tasks[index].completed = !tasks[index].completed;

    // Move completed to end or uncompleted to front
    const [toggledTask] = tasks.splice(index, 1);
    if (toggledTask.completed) {
        tasks.push(toggledTask); // move to end using push
    } else {
        tasks.unshift(toggledTask); // move to front using unshift
    }

    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    let tasks = getTasks();

    if (index === 0) {
        tasks.shift(); // remove first
    } else if (index === tasks.length - 1) {
        tasks.pop(); // remove last
    } else {
        tasks.splice(index, 1); // remove middle
    }

    saveTasks(tasks);
    renderTasks();
}
