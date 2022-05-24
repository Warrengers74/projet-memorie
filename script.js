// ! DECLARATION

let fruits = [];
let longueur;
let clicked = [];
let counterMatch = 0;

let intervalTimer = null;
const departMinutes = 5;
let temps = departMinutes * 60;
const timerElement = document.getElementById("timer");

const btnJouer = document.querySelector(".btn_jouer");
const btnScore = document.querySelectorAll(".btn_score");
const game = document.getElementById("game");
const firstScreen = document.getElementById("first_screen");

// ? FONCTIONS

// fonction pour créer les cartes des 18 fruits. Chaque carte sera poussé dans le tableau fruits.
function createCards() {
  for (i = 1; i < 19; i++) {
    const card = document.createElement("div");
    fruits.push(card);
    card.style.background = "center/cover no-repeat url(./emoji/" + i + ".png)";
    card.classList.add("grid-item");
    card.setAttribute("id", i);
  }
}

// fontion pour mélanger les cartes dans mon tableau.
function fisherYatesShuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}

// fonction qui prend chaque élément de mon tableau et l'ajoute en enfant de ma div #container.
function appendChild() {
  longueur = fruits.length;
  for (l = 1; l < longueur; l++) {
    fruits.forEach((card) => {
      document.querySelector("#container").appendChild(card);
    });
  }
}

// fonction au clique qui ajoute et retire un effet à mes cartes. Les cartes cliqués seront poussées dans le tableau clicked.
function cardsClicked() {
  const cards = document.querySelectorAll(".grid-item");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      clicked.push(card);
      card.classList.add("grid-item--click");
      card.classList.remove("grid-item");
      if (clicked.length === 2) {
        cards.forEach((card) => {
          card.classList.add("grid-item--block");
        });
        compare(card);
      }
    });
  });
}

// fonction pour comparer l'id des deux élements de mon tableau clicked.
function compare() {
  if (clicked[0].getAttribute("id") === clicked[1].getAttribute("id")) {
    setTimeout(() => {
      clicked[0].classList.remove("grid-item--click");
      clicked[0].classList.add("grid-item--found");
      clicked[1].classList.remove("grid-item--click");
      clicked[1].classList.add("grid-item--found");
    }, 1000);
    setTimeout(() => {
      clicked = [];
      fruits.forEach((card) => {
        card.classList.remove("grid-item--block");
      });
    }, 1100);
    counterMatch++;
    win();
  } else {
    setTimeout(() => {
      clicked[0].classList.remove("grid-item--click");
      clicked[0].classList.add("grid-item");
      clicked[1].classList.remove("grid-item--click");
      clicked[1].classList.add("grid-item");
    }, 1000);
    setTimeout(() => {
      clicked = [];
      fruits.forEach((card) => {
        card.classList.remove("grid-item--block");
      });
    }, 1100);
  }
}

// fonction de création du timer.
function timer() {
  let minutes = parseInt(temps / 60, 10);
  let secondes = parseInt(temps % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  secondes = secondes < 10 ? "0" + secondes : secondes;

  timerElement.innerText = `${minutes}m${secondes}s`;

  temps = temps <= 0 ? lose() : temps - 1;
}

// fonction pour démarrer le timer.
function startTimer() {
  intervalTimer = setInterval(timer, 1000);
}

// fonction pour arrêter le timer.
function stopTimer() {
  clearInterval(intervalTimer);
}

// fonction pour afficher l'écran gagné avec le score obtenu une fois toutes les paires trouvées et arrêter le timer.
function win() {
  
  if (counterMatch === 18) {
      stopTimer();
      let tempsRestant = temps;
      let tempsWin = departMinutes * 60 - tempsRestant;
      let minutes = parseInt(tempsWin / 60, 10);
      let secondes = parseInt(tempsWin % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      secondes = secondes < 10 ? "0" + secondes : secondes;
      console.log(minutes, secondes, tempsRestant);
      document.getElementById("result").innerHTML = `${minutes}m${secondes}s`;
      const win = document.getElementById("win_screen");
      win.classList.remove("hidden_screen");
      game.classList.add("hidden_screen");

      let score = new FormData()
      score.append('score', tempsWin)
      fetch("./score.php", {
      method: "POST",
      body: score, 
      });
  }
}

// fonction pour afficher l'écran perdu. Elle sera jouer dans le timer quand il arrivera à 0.
function lose() {
  const lose = document.getElementById("lose_screen");
  lose.classList.remove("hidden_screen");
  game.classList.add("hidden_screen");
}

// fonction pour créer entièrement le grid du jeu. Intègre plusieurs fonctions.
function createGrids() {
  createCards();
  createCards();
  fisherYatesShuffle(fruits);
  appendChild();
  cardsClicked();
}

// fonction pour révéler le grid du jeu au clique du bouton jouer et lancer le timer.
function btnJouerClicked() {
  btnJouer.addEventListener("click", () => {
    createGrids();
    firstScreen.classList.add("hidden_screen");
    game.classList.remove("hidden_screen");
    startTimer();
  });
}

// fonction pour retourner sur la première page des scores.
function btnScoreClicked() {
  btnScore.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.reload();
    });
  });
}

// * EXECUTION

btnJouerClicked();
btnScoreClicked();
