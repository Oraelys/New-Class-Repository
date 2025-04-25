window.onload = function () {
    renderTasks();
};

let tasks = [];

function renderTasks() {
    const tasklist = document.getElementById("taskList");
    tasklist.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <label for="task-${index}">${task.text}</label>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        tasklist.appendChild(li);
    });

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
            <label for="task-${i}">${tasks[i].text}</label>
            <button onclick="deleteTask(${i})">Delete</button>
        `;
    }
}


function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;
    const task = {
        text: taskText,
        completed: false
    };

    const tasks = getTasks();
    tasks.unshift(task); // Add to the beginning of the array
    console.log(tasks);
    renderTasks();

    input.value = "";
}

addbtn = document.getElementById("addTaskBtn");
addbtn.addEventListener("click", function () {
    addTask();
});

function deleteTask(index) {
    let tasks = getTasks();
    console.log(tasks);

    if (index === 0) {
        tasks.shift(); // Remove the first task
    }
    else if (index === tasks.length - 1) {
        tasks.pop(); // Remove the last task
    }
    else {
        tasks.splice(index, index + 1); // Remove the task at the specified index
    }
    renderTasks();
}


// function toggleTask(index) {
//     let tasks = getTasks();

//     // Toggle the completed status of the task 
//     tasks[index].completed = !tasks[index].completed;
//     console.log(tasks)
//     // Move completed tasks to the end of the array or uncompleted tasks to the beginning
//     if (toggleTask.completed) {
//         tasks.push(toggleTask); // Move to the end
//     }
//     else {
//         tasks.unshift(toggleTask);

//     }
//     renderTasks();
// }


function getTasks() {
    return tasks;
}
