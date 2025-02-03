import anime from 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';

let score = parseInt(localStorage.getItem('score')) || 0;
let comboMultiplier = 1;
let lastClickTime = 0;
let userName = localStorage.getItem('userName') || '';

document.getElementById('score').textContent = score;

// Проверка на первый вход
document.addEventListener('DOMContentLoaded', () => {
    if (!userName) {
        document.getElementById('welcomeModal').classList.remove('hidden');
    } else {
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
});

// Логика кликов с комбо
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

    anime({
        targets: '#clickButton img',
        scale: [1, 1.2, 1],
        duration: 200,
        easing: 'easeInOutQuad'
    });
});

// Анимированное открытие ТОП-100
document.getElementById('topButton').addEventListener('click', async () => {
    const topList = document.getElementById('topList');
    topList.innerHTML = '';

    // Заглушка данных (замени на запрос к Firebase)
    const users = [
        { name: "Сенсей", score: 9999 },
        { name: "Тень", score: 8500 },
        { name: "Самурай", score: 7500 }
    ];
    
    users.forEach((user, index) => {
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
