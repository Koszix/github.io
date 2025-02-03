document.addEventListener("DOMContentLoaded", () => {
    let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
    const scoreElement = document.getElementById("score");
    const clickButton = document.getElementById("clickButton");
    const topButton = document.getElementById("topButton");
    const walletButton = document.getElementById("walletButton");
    const profileButton = document.getElementById("profileButton");
    const backToHome1 = document.getElementById("backToHome1");
    const backToHome2 = document.getElementById("backToHome2");
    const backToHome3 = document.getElementById("backToHome3");
    const topList = document.getElementById("topList");
    const profileScore = document.getElementById("profileScore");
    const playerName = document.getElementById("playerName");

    // Обновление счета на старте
    scoreElement.textContent = score;
    profileScore.textContent = score;

    // Мультитач клик
    clickButton.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        score++;
        scoreElement.textContent = score;
        profileScore.textContent = score;
        localStorage.setItem("score", score);

        anime({
            targets: "#clickButton",
            scale: [1, 1.1, 1],
            duration: 150,
            easing: "easeInOutQuad",
        });
    });

    // Функция переключения страниц
    function switchPage(showId) {
        document.querySelectorAll(".page").forEach(page => {
            page.classList.add("hidden");
        });
        document.getElementById(showId).classList.remove("hidden");
    }

    // Открытие вкладок
    topButton.addEventListener("click", () => {
        switchPage("topPage");
        updateTopList();
    });

    walletButton.addEventListener("click", () => {
        switchPage("walletPage");
    });

    profileButton.addEventListener("click", () => {
        switchPage("profilePage");
    });

    // Кнопки назад
    backToHome1.addEventListener("click", () => switchPage("homePage"));
    backToHome2.addEventListener("click", () => switchPage("homePage"));
    backToHome3.addEventListener("click", () => switchPage("homePage"));

    // Обновление ТОП-100
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