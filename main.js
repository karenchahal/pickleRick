const portals = document.querySelectorAll(".portal");
const scoreBoard = document.querySelector(".score");
const pickleRicks = document.querySelectorAll(".pickle");
let lastPortal;
let timeUp = false;
let score = 0;

randTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

randomPortal = portals => {
  const idx = Math.floor(Math.random() * portals.length);
  const portal = portals[idx];
  if (portal === lastPortal) {
    console.log("Same portal mate");
    return randomPortal(portals);
  }
  lastPortal = portal;
  return portal;
};

peep = () => {
  const time = randTime(100, 2000);
  const portal = randomPortal(portals);
  portal.classList.add("up");
  setTimeout(() => {
    portal.classList.remove("up");
    if (!timeUp) peep();
  }, time);
};

startGame = () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = scoreBoard.textContent = localStorage.getItem("score");
  peep();
  setTimeout(() => (timeUp = true), 15000);
};

function hit(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

pickleRicks.forEach(pickle => pickle.addEventListener("click", hit));

saveScore = () => {
  localStorage.setItem("score", scoreBoard.textContent);
};

loadScore = () => {
  scoreBoard.textContent = localStorage.getItem("score");
};
