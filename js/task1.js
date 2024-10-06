// При завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadTasks);

// Отримуємо елементи DOM
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

// Масив для збереження завдань
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Додаємо нове завдання
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

    newTaskInput.value = ''; // Очистити поле вводу
});

// Відображаємо завдання в DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add('completed');
    }

    // Позначаємо як виконане або невиконане
    li.addEventListener('click', function() {
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTasksToLocalStorage();
    });

    // Кнопка для видалення завдання
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Не змінювати статус виконання
        removeTask(task);
        taskList.removeChild(li);
        saveTasksToLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Завантажуємо завдання з localStorage
function loadTasks() {
    tasks.forEach(addTaskToDOM);
}

// Зберігаємо завдання в localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Видаляємо завдання
function removeTask(task) {
    tasks = tasks.filter(t => t !== task);
}
