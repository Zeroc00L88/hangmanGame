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

let keyPressed;

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
    return word;
};

const anonymisedWord = (word) => {
    let arrayWord = Array.from(word);
    let anonArray = arrayWord.map((e) => (e = "_"));
    return anonArray;
};

const getKeyValue = () => {
    keys.forEach((elmt) => {
        elmt.addEventListener("click", () => {
            keyPressed = elmt.innerHTML;
        });
    });
};
const game = () => { };

// startGame();
