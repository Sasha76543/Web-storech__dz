// Створіть просту форму з полями вводу і кнопкою, яка зберігає дані в localStorage.
//  При наступному завантаженні сторінки зчитайте збережені дані з localStorage та відобразіть їх у відповідних полях вводу.
// Створіть форму з полями для вводу логіна та пароля. Зберігайте дані про користувача в localStorage
// та перевіряйте, чи є користувач з таким логіном та паролем при вході на сторінку.

function saveUserData(login, password) {
    const user = {
        login: login,
        password: password
    };
    localStorage.setItem('userData', JSON.stringify(user));
}


function loadUserData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        const user = JSON.parse(savedData);
        document.getElementById('login').value = user.login;
        document.getElementById('password').value = user.password;
    }
}


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    saveUserData(login, password);
    alert('Дані збережено у localStorage');
});

window.onload = function() {
    loadUserData();
};