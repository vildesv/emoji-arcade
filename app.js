// 🎮 Emoji Arcade – Memory Game
const emojis = ["🐱", "🐶", "🐸", "🐵", "🦊", "🐼"];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const winMessage = document.getElementById("winMessage");
const newGameBtn = document.getElementById("newGameBtn");

// 🔊 Lyd (valgfritt – legg mp3 i prosjektmappen)
const flipSound = new Audio("flip.mp3");
const matchSound = new Audio("match.mp3");
const winSound = new Audio("win.mp3");

// 🎯 Start ny runde
newGameBtn.addEventListener("click", startGame);

function startGame() {
  // Nullstill state
  board.innerHTML = "";
  winMessage.classList.add("hidden");
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  movesDisplay.textContent = 0;
  matchesDisplay.textContent = 0;

  // Stokk kortene og bygg brettet
  const shuffled = shuffle([...emojis, ...emojis]);
  cards = shuffled.map((emoji, index) => createCard(emoji, index));
  cards.forEach(card => board.appendChild(card));
}

// 🃏 Lag kort-element
function createCard(emoji, index) {
  const card = document.createElement("button");
  card.classList.add("card");
  card.setAttribute("data-emoji", emoji);
  card.setAttribute("aria-label", "Skjult kort");
  card.addEventListener("click", flipCard);
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipCard.call(card);
    }
  });
  return card;
}

// 🔀 Stokk kortene
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 🔄 Vend kort
function flipCard() {
  // Ikke la spilleren flippe mer enn to kort
  if (flippedCards.length === 2 || this.classList.contains("flipped")) return;

  // Spill lyd
  if (flipSound) {
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
  }

  // Vend kort
  this.textContent = this.dataset.emoji;
  this.classList.add("flipped");
  flippedCards.push(this);

  // Hvis to kort er vendt – sjekk match
  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

// ✅ Sjekk om par matcher
function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.emoji === card2.dataset.emoji;

  if (isMatch) {
    // Spill lyd og marker match
    if (matchSound) {
      matchSound.currentTime = 0;
      matchSound.play().catch(() => {});
    }

    card1.classList.add("matched");
    card2.classList.add("matched");

    matchedPairs++;
    matchesDisplay.textContent = matchedPairs;
    flippedCards = [];

    // Sjekk om spillet er vunnet
    if (matchedPairs === emojis.length) {
      showWin();
    }
  } else {
    // Vent litt, så snu tilbake
    setTimeout(() => {
      card1.textContent = "";
      card2.textContent = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

// 🏆 Seier!
function showWin() {
  winMessage.classList.remove("hidden");

  if (winSound) {
    winSound.currentTime = 0;
    winSound.play().catch(() => {});
  }

  // Legg til blink-animasjon
  winMessage.style.animation = "glow 1.2s infinite alternate";
}

// 🚀 Start første runde
startGame();