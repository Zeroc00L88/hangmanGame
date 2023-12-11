const words = [
    "Avion",
    "Banjo",
    "Barbe",
    "Bruit",
    "Chien",
    "Essai",
    "Livre",
    "Pomme",
    "Rugby",
    "Valse",
    "Agneau",
    "Aviron",
    "Bouche",
    "Grelot",
    "Hochet",
    "Limite",
    "Poulpe",
    "Puzzle",
    "Quartz",
    "Tomate",
];

const play = document.querySelector("#playButton");
const startWin = document.querySelector("#startWin");
const secretWord = document.querySelector("#secretWord");
const keys = document.querySelectorAll(".key");

const startGame = () => {
    play.addEventListener("click", () => {
        startWin.classList.toggle("hidden");
    });
    game();
};

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomWord = (array) => {
    let word = array[getRandom(0, array.length - 1)];
    return Array.from(word);
};

const checkKey = () => {
    keys.forEach((elmt) => {
        elmt.addEventListener("click", () => {
            console.log(elmt.innerHTML);
            elmt.style.color = "rgba(0, 0, 0, 0)";
        });
    });
};

const game = () => {
    getRandomWord(words).forEach((elmt) => {
        let chara = document.createElement("p");
        chara.innerHTML = "_";
        secretWord.appendChild(chara);
    });
};

game();

// startGame();
