let words = [
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

words = words.map((e) => e.toUpperCase());
let currentWord = [];

const play = document.querySelector("#playButton");
const startWin = document.querySelector("#startWin");
const secretWord = document.querySelector("#secretWord");
const keys = document.querySelectorAll(".key");
const lostRestartButton = document.querySelector("#lostRestartButton");
const lostWin = document.querySelector("#lostWin");
const imgDiv = document.querySelectorAll("#hangman div img");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const startGame = () => {
    play.addEventListener("click", () => {
        startWin.classList.toggle("hidden");
        game();
    });
};

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomWord = (array) => {
    let word = array[getRandom(0, array.length - 1)];
    return Array.from(word);
};

const displayHangman = (counter) => {
    imgDiv[counter].classList.remove("hidden");
};

const displayWordPlaceholder = (word, placeholderChar) => {
    word.map(() => {
        let chara = document.createElement("p");
        chara.innerHTML = placeholderChar;
        secretWord.appendChild(chara);
    });
};

const controller = new AbortController();
const { signal } = controller;
const checkKey = (word) => {
    let falseCount = 0;
    keys.forEach((elmt) => {
        elmt.style.color = "lightgrey";
        const checkEachkey = () => {
            elmt.style.color = "rgba(0, 0, 0, 0)";
            idx = word.indexOf(elmt.innerHTML);
            if (idx != -1) {
                while (idx != -1) {
                    console.log(elmt.innerHTML);
                    console.log(idx);
                    let charChange = document.querySelectorAll("#secretWord p");
                    charChange[idx].innerHTML = elmt.innerHTML;
                    idx = word.indexOf(elmt.innerHTML, idx + 1);
                }
            } else {
                if (falseCount < 8) {
                    displayHangman(falseCount);
                    falseCount++;
                } else {
                    displayHangman(falseCount);
                    falseCount = 0;
                    lostRestart();
                    // keys.forEach((e) => {
                    // });
                }
            }
        };
        elmt.addEventListener(
            "click",
            checkEachkey,
            { once: true },
            { signal },
        );
    });
};

const lostRestart = () => {
    controller.abort();
    imgDiv.forEach((e) => e.classList.add("hidden"));
    lostWin.classList.toggle("hidden");
    currentWord = [];
    let secretWordAll = document.getElementById("secretWord");
    removeAllChildNodes(secretWordAll);
    lostRestartButton.addEventListener(
        "click",
        () => {
            lostWin.classList.add("hidden");
            game();
        },
        { once: true },
    );
};
const game = () => {
    currentWord = getRandomWord(words);
    displayWordPlaceholder(currentWord, "_");
    console.log(currentWord);
    checkKey(currentWord);
};

startGame();
