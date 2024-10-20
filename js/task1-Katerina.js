
document.addEventListener('DOMContentLoaded', loadTasks);

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskText = newTaskInput.value.trim();
    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    addTaskToDOM(task);
    saveTasksToLocalStorage();

    newTaskInput.value = '';
});

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', function() {
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTasksToLocalStorage();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        removeTask(task);
        taskList.removeChild(li);
        saveTasksToLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function loadTasks() {
    tasks.forEach(addTaskToDOM);
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    tasks = tasks.filter(t => t !== task);
}
