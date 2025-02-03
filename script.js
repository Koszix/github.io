document.addEventListener("DOMContentLoaded", () => {
    let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
    const scoreElement = document.getElementById("score");
    const clickButton = document.getElementById("clickButton");
    const topButton = document.getElementById("topButton");
    const topModal = document.getElementById("topModal");
    const topList = document.getElementById("topList");
    const closeTopButton = document.getElementById("closeTop");

    // 🔄 Обновление счета на старте
    scoreElement.textContent = score;

    // ⚔️ Клик (поддержка мультитач)
    clickButton.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        score++;
        scoreElement.textContent = score;
        localStorage.setItem("score", score);

        // Анимация клика (Anime.js)
        anime({
            targets: "#clickButton",
            scale: [1, 1.1, 1],
            duration: 150,
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
                <p>4. RoninD - 5000 катан</p>
                <p>5. ShadowZ - 3500 катан</p>
            `;
        }, 1000);
    }
});