const winPath = "./assets/images/gifWin/";
const losePath = "./assets/images/gifLose/";

function strNoAccent(a) {
    return a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function fetchRandomWords() {
    let response = await fetch("https://trouve-mot.fr/api/random");
    let data = await response.json();
    let word = strNoAccent(data[0].name);
    word = word.toUpperCase();
    return Array.from(word);
}

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
const gif = document.querySelector("#gif");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomGif = (path) => {
    let gifPath = `${path}${getRandom(1, 10)}.gif`;
    return gifPath;
};

getRandomGif(losePath);

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
            falseCount = 0;
            goodCount = 0;
            restart("Vous avez gagné", getRandomGif(winPath));
        }
    } else {
        if (falseCount < 8) {
            displayHangman(falseCount);
            falseCount++;
        } else {
            displayHangman(falseCount);
            falseCount = 0;
            goodCount = 0;
            restart("Vous avez perdu", getRandomGif(losePath));
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

const restart = (msg, path) => {
    gif.src = path;
    restartWinMsg.innerHTML = msg;
    imgDiv.forEach((e) => e.classList.add("hidden"));
    keys.forEach((e) => {
        e.style.pointerEvents = "none";
        e.style.color = "lightgrey";
    });
    restartWin.classList.toggle("hidden");
    currentWord = [];
    restartButton.addEventListener(
        "click",
        () => {
            let secretWordAll = document.getElementById("secretWord");
            removeAllChildNodes(secretWordAll);
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

const game = async () => {
    currentWord = await fetchRandomWords();
    console.log(currentWord);
    displayWordPlaceholder(currentWord, "_");
};

startGame();
