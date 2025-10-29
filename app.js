// 🎮 Emoji Arcade – Memory Game
const emojiSets = {
  lett: ["🐱", "🐶", "🐸", "🐵", "🦊", "🐼"],
  middels: ["🐱", "🐶", "🐸", "🐵", "🦊", "🐼", "🐰", "🐯"],
  vanskelig: ["🐱", "🐶", "🐸", "🐵", "🦊", "🐼", "🐰", "🐯", "🐮", "🐷"]
};

let emojis = emojiSets.lett;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const winMessage = document.getElementById("winMessage");
const newGameBtn = document.getElementById("newGameBtn");
const difficultySelect = document.getElementById("difficultySelect");

// 🎯 Start ny runde
newGameBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);

function startGame() {
  const level = difficultySelect.value;
  emojis = emojiSets[level];

  // Nullstill
  board.innerHTML = "";
  winMessage.classList.add("hidden");
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  movesDisplay.textContent = 0;
  matchesDisplay.textContent = `0/${emojis.length}`;

  // Stokk og bygg
  const shuffled = shuffle([...emojis, ...emojis]);
  cards = shuffled.map((emoji, index) => createCard(emoji, index));
  cards.forEach(card => board.appendChild(card));

  // Oppdater grid
  const columns = Math.ceil(Math.sqrt(emojis.length * 2));
  board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

// 🃏 Lag kort
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

// 🔀 Stokk
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 🔄 Vend kort
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains("flipped")) return;

  this.textContent = this.dataset.emoji;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

// ✅ Sjekk par
function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.emoji === card2.dataset.emoji;

  if (isMatch) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    matchesDisplay.textContent = `${matchedPairs}/${emojis.length}`;
    flippedCards = [];

    if (matchedPairs === emojis.length) {
      showWin();
    }
  } else {
    setTimeout(() => {
      card1.textContent = "";
      card2.textContent = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

// 🏆 Seier
function showWin() {
  winMessage.classList.remove("hidden");
  winMessage.style.animation = "glow 1.2s infinite alternate";
}

// 🚀 Start første runde
difficultySelect.value = "lett";
startGame();