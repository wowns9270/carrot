"use strick";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const Game_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const pop_up = document.querySelector(".pop-up");
const pop_up_message = document.querySelector(".pop-up__message");
const pop_up_btn = document.querySelector(".pop-up__refresh");

var audio1 = new Audio("./sound/bg.mp3");
var audio2 = new Audio("./sound/alert.wav");
var audio3 = new Audio("./sound/bug_pull.mp3");
var audio4 = new Audio("./sound/carrot_pull.mp3");
var audio5 = new Audio("./sound/game_win.mp3");

let started = false;
let score = 5;
let timer = undefined;

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

pop_up_btn.addEventListener("click", () => {
  audio2.play();
  pop_up.classList.add("pop-up--hide");

  field.innerHTML = "";

  gameBtn.style.visibility = "visible";

  const icon = gameBtn.querySelector(".fa-stop");
  icon.classList.add("fa-play");
  icon.classList.remove("fa-stop");

  gameTimer.style.visibility = "hidden";
  gameScore.style.visibility = "hidden";

  gameTimer.innerText = "0:5";
  score = 5;
});

function stopGame() {
  clearInterval(timer);
  pop_up_message.innerText = "REPLAY ?";
  pop_up.classList.remove("pop-up--hide");
  gameBtn.style.visibility = "hidden";
}

function startGame() {
  audio1.play();
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  gameTimer.innerText = `${minutes}:${seconds}`;
}

function startGameTimer() {
  let remainingTimeSec = Game_DURATION_SEC;

  timer = setInterval(() => {
    updateTimerText(remainingTimeSec);

    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      pop_up.classList.remove("pop-up--hide");
      pop_up_message.innerText = "FAIL";
      started = !started;
      audio2.play();
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function initGame() {
  field.innerHTML = "";
  gameScore.innerHTML = CARROT_COUNT;

  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;

  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * max + min;
}

field.addEventListener("click", (event) => {
  if (event.target.className === "carrot") {
    audio4.play();
    event.target.remove();
    score--;
    gameScore.innerText = score;

    if (score <= 0) {
      clearInterval(timer);
      pop_up.classList.remove("pop-up--hide");
      pop_up_message.innerText = "SUCCESS";
      started = !started;
      audio5.play();
    }
  }

  if (event.target.className === "bug") {
    audio3.play();
    clearInterval(timer);
    pop_up.classList.remove("pop-up--hide");
    pop_up_message.innerText = "FAIL";
    started = !started;
  }
});
