document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    const scoreElement = document.getElementById("score");
    const clickButton = document.getElementById("clickButton");
    const welcomeModal = document.getElementById("welcomeModal");
    const userNameInput = document.getElementById("userName");
    const saveNameButton = document.getElementById("saveNameButton");
    const topModal = document.getElementById("topModal");
    const topList = document.getElementById("topList");
    const topButton = document.getElementById("topButton");
    const closeTopButton = document.getElementById("closeTop");

    // 🎴 Проверка имени пользователя
    if (!localStorage.getItem("userName")) {
        welcomeModal.classList.remove("hidden");
    } else {
        alert(`Привет, ${localStorage.getItem("userName")}!`);
    }

    // 💾 Сохранение имени
    saveNameButton.addEventListener("click", () => {
        const name = userNameInput.value.trim();
        if (name) {
            localStorage.setItem("userName", name);
            welcomeModal.classList.add("hidden");
            alert(`Добро пожаловать, ${name}!`);
        }
    });

    // ⚔️ Клик по ниндзя
    clickButton.addEventListener("click", () => {
        score++;
        scoreElement.textContent = score;

        // Анимация клика (Anime.js)
        anime({
            targets: "#clickButton",
            scale: [1, 1.2, 1],
            duration: 200,
            easing: "easeInOutQuad",
        });
    });

    // 🏆 Открытие ТОП-100
    topButton.addEventListener("click", () => {
        topModal.classList.remove("hidden");
        updateTopList();
    });

    // ❌ Закрытие ТОП-100
    closeTopButton.addEventListener("click", () => {
        topModal.classList.add("hidden");
    });

    // 🔄 Обновление ТОП-100
    function updateTopList() {
        topList.innerHTML = "<p>Загрузка...</p>";

        setTimeout(() => {
            topList.innerHTML = `
                <p>1. NinjaMaster - 9999 катан</p>
                <p>2. SamuraiX - 8765 катан</p>
                <p>3. ShogunY - 7654 катан</p>
            `;
        }, 1000);
    }
});