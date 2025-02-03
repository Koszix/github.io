import anime from 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';

let score = 0;
let comboMultiplier = 1;
let lastClickTime = 0;

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

    anime({
        targets: '#clickButton img',
        scale: [1, 1.2, 1],
        duration: 200,
        easing: 'easeInOutQuad'
    });
});

document.getElementById('collectBonus').addEventListener('click', () => {
    score += 100;
    document.getElementById('score').textContent = score;
    document.getElementById('dailyBonus').classList.add('hidden');
});

document.getElementById('closeEvent').addEventListener('click', () => {
    document.getElementById('eventBanner').classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('dailyBonus').classList.remove('hidden');
    }, 2000);

    setTimeout(() => {
        document.getElementById('eventBanner').classList.remove('hidden');
    }, 5000);
});
