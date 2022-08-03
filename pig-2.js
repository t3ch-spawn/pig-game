'use strict';

// Selecting elements(By defining them)
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const instructions = document.querySelector('.instructions');
const instructWindow = document.querySelector('.instruct-window');
const scoreLimit = document.querySelector('.score-limit');
const scoreWindow = document.querySelector('.score-window');
const btnClose = document.querySelectorAll('.close');
const overlay = document.querySelector('.overlay');

let scores, currentScore, activePlayer, playing;

// initialization function containing starting conditions
function init() {
  // resetting state variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // resetting scores to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // resetting colors/graphics
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}

init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  // if (activePlayer === 0) {
  //   activePlayer = 1;
  // } else {
  //   activePlayer = 0;
  // }
};

// Rolling the dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for a 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Holding the dice functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    // adding current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if total score <= 100
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      alert(`player ${activePlayer + 1} WINS!!`);
    } else {
      // switch players
      switchPlayer();
    }
  }
});

// New game button functionality
btnNew.addEventListener('click', () => {
  init();
});

// enabling instructions
instructions.addEventListener('click', () => {
  instructWindow.classList.toggle('hidden');
  overlay.classList.remove('hidden');
});

// enabling score-limit
scoreLimit.addEventListener('click', () => {
  scoreWindow.classList.add('active');
  overlay.classList.remove('hidden');
});

// enabling close button
for (let i = 0; i < btnClose.length; i++) {
  btnClose[i].addEventListener('click', () => {
    instructWindow.classList.add('hidden');
    overlay.classList.toggle('hidden');
    scoreWindow.classList.remove('active');
  });
}

// enabling overlay click
overlay.addEventListener('click', () => {
  instructWindow.classList.add('hidden');
  overlay.classList.add('hidden');
  scoreWindow.classList.remove('active');
});
