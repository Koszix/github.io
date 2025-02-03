import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import anime from 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';

// Firebase конфигурация
const firebaseConfig = {
    apiKey: "AIzaSyDKyhYxdcZUqz3HJC2NF97FLCuN7bndNH8",
    authDomain: "ninjatapp00.firebaseapp.com",
    projectId: "ninjatapp00",
    storageBucket: "ninjatapp00.firebasestorage.app",
    messagingSenderId: "253236416484",
    appId: "1:253236416484:web:db84e76d445fa7d1bdc1f1",
    measurementId: "G-PF0DESMGR9"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.ready();

// Получение данных пользователя из Telegram
const user = tg.initDataUnsafe.user;
const userId = user?.id || 'user_' + Math.random().toString(36).substr(2, 9);
let userName = user?.first_name || localStorage.getItem('userName');

// Получение или установка начального счета
let score = parseInt(localStorage.getItem('score')) || 0;
let comboMultiplier = 1;
let lastClickTime = 0;

document.getElementById('score').textContent = score;

// Функция сохранения данных пользователя
function saveUserData() {
    set(ref(db, 'users/' + userId), { name: userName, score: score });
}

// Проверка на первый вход
document.addEventListener('DOMContentLoaded', async () => {
    if (!userName) {
        document.getElementById('welcomeModal').classList.remove('hidden');
    } else {
        const userData = await get(ref(db, 'users/' + userId));
        if (userData.exists()) {
            score = userData.val().score || 0;
            document.getElementById('score').textContent = score;
        }
        alert(`С возвращением, ${userName}!`);
    }
});

// Сохранение имени пользователя
document.getElementById('saveNameButton').addEventListener('click', () => {
    const inputName = document.getElementById('userName').value.trim();
    if (!inputName) return alert("Введите ваше имя.");
    userName = inputName;
    localStorage.setItem('userName', userName);
    document.getElementById('welcomeModal').classList.add('hidden');
    alert(`Добро пожаловать, ${userName}!`);
    saveUserData();
});

// Логика кликов с комбо и сохранением в Firebase
document.getElementById('clickButton').addEventListener('click', () => {
    let now = Date.now();
    if (now - lastClickTime < 500) {
        comboMultiplier++;
    } else {
        comboMultiplier = 1;
    }
    lastClickTime = now;

    score += comboMultiplier;
    document.getElementById('score').textContent = score;
    document.getElementById('comboText').textContent = `Комбо: x${comboMultiplier}`;
    localStorage.setItem('score', score);
    saveUserData();

    anime({
        targets: '#clickButton img',
        scale: [1, 1.2, 1],
        duration: 200,
        easing: 'easeInOutQuad'
    });
});

// Анимированное открытие ТОП-100 с обновлением списка
document.getElementById('topButton').addEventListener('click', async () => {
    const topList = document.getElementById('topList');
    topList.innerHTML = '';

    const snapshot = await get(ref(db, 'users'));
    const users = [];

    snapshot.forEach(child => {
        const data = child.val();
        users.push({ name: data.name || "Аноним", score: data.score || 0 });
    });

    users.sort((a, b) => b.score - a.score);

    users.slice(0, 100).forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.textContent = `${index + 1}. ${user.name} - ${user.score} Катан`;
        userDiv.style.opacity = '0';
        topList.appendChild(userDiv);
    });

    document.getElementById('topModal').classList.remove('hidden');

    anime({
        targets: '#topList div',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100)
    });
});

// Закрытие ТОП-100
document.getElementById('closeTop').addEventListener('click', () => {
    document.getElementById('topModal').classList.add('hidden');
});
