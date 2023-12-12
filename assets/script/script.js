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

const play = document.querySelector("#playButton");
const startWin = document.querySelector("#startWin");
const secretWord = document.querySelector("#secretWord");
const keys = document.querySelectorAll(".key");

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
    imgDiv = document.querySelectorAll("#hangman div img");
    imgDiv[counter].classList.remove("hidden");
};

const checkKey = (word) => {
    let falseCount = 0;
    keys.forEach((elmt) => {
        elmt.addEventListener(
            "click",
            () => {
                elmt.style.color = "rgba(0, 0, 0, 0)";
                idx = word.indexOf(elmt.innerHTML);
                if (idx != -1) {
                    while (idx != -1) {
                        console.log(elmt.innerHTML);
                        console.log(idx);
                        let charChange =
                            document.querySelectorAll("#secretWord p");
                        charChange[idx].innerHTML = elmt.innerHTML;
                        idx = word.indexOf(elmt.innerHTML, idx + 1);
                    }
                } else {
                    if (falseCount < 8) {
                        displayHangman(falseCount);
                        falseCount++;
                    } else {
                        displayHangman(falseCount);
                        setTimeout(() => {
                            alert("vous avez perdu");
                        }, 1000);
                    }
                }
            },
            { once: true },
        );
    });
};

const game = () => {
    currentWord = getRandomWord(words);
    console.log(currentWord);
    currentWord.map(() => {
        let chara = document.createElement("p");
        chara.innerHTML = "_";
        secretWord.appendChild(chara);
    });
    checkKey(currentWord);
};

startGame();
