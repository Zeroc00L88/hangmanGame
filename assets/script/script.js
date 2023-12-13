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
let falseCount = 0;
let goodCount = 0;

const play = document.querySelector("#playButton");
const startWin = document.querySelector("#startWin");
const secretWord = document.querySelector("#secretWord");
const keys = document.querySelectorAll(".key");
const restartButton = document.querySelector("#restartButton");
const restartWin = document.querySelector("#restartWin");
const restartWinMsg = document.querySelector("#restartWin h2");
const imgDiv = document.querySelectorAll("#hangman div img");
const vkbd = document.querySelector("#vkbd p");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

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

const checkEachkey = (elmt) => {
    elmt.style.color = "rgba(0,0,0,0)";
    elmt.style.pointerEvents = "none";
    idx = currentWord.indexOf(elmt.innerHTML);
    if (idx != -1) {
        while (idx != -1) {
            goodCount++;
            let charChange = document.querySelectorAll("#secretWord p");
            charChange[idx].innerHTML = elmt.innerHTML;
            idx = currentWord.indexOf(elmt.innerHTML, idx + 1);
        }
        if (goodCount == currentWord.length) {
            goodCount = 0;
            restart("Vous avez gagné");
        }
    } else {
        if (falseCount < 8) {
            displayHangman(falseCount);
            falseCount++;
        } else {
            displayHangman(falseCount);
            falseCount = 0;
            restart("Vous avez perdu");
        }
    }
};

const checkKey = () => {
    keys.forEach((elmt) => {
        elmt.style.color = "lightgrey";
        elmt.addEventListener("click", function eventkey() {
            checkEachkey(elmt);
        });
    });
};

const restart = (msg) => {
    restartWinMsg.innerHTML = msg;
    imgDiv.forEach((e) => e.classList.add("hidden"));
    keys.forEach((e) => {
        e.style.pointerEvents = "none";
        e.style.color = "lightgrey";
    });
    restartWin.classList.toggle("hidden");
    currentWord = [];
    let secretWordAll = document.getElementById("secretWord");
    removeAllChildNodes(secretWordAll);
    restartButton.addEventListener(
        "click",
        () => {
            keys.forEach((e) => {
                e.style.pointerEvents = "auto";
            });
            restartWin.classList.add("hidden");
            game();
        },
        { once: true },
    );
};

const startGame = () => {
    play.addEventListener("click", () => {
        startWin.classList.toggle("hidden");
        game();
        checkKey();
    });
};

const game = () => {
    currentWord = getRandomWord(words);
    displayWordPlaceholder(currentWord, "_");
};

startGame();
