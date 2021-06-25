'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');

const winningScore = 50;

// Start Rule Alert for Pig Game
alert(`
Rules of Pig Game: 

1. You need two players.
2. Rolling a 1 is bad. It will reset your score.
3. Make sure to make smart decisions when to hold the dice.
4. First player to ${winningScore} points wins!

Good Luck!`);
// End Rule Alert
let scores, currentScore, activePlayer, playing;

// Reset init function
const init = function(){
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}
init();


const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};



// Rolling Dice Function
btnRoll.addEventListener('click', function () {
  if(playing) {
  // 1. Generate random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. Display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // 3. Check for a rolled 1: If true, switch to the next player

  if (dice !== 1) {
    //Add Dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    //Change to next player
    switchPlayer();
  }
}
});

btnHold.addEventListener('click', function () {

  if(playing){
  // 1. Add current score to active players score
  scores[activePlayer] += currentScore;
  // scores[1] = scores[1] + currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  // 2. Check if players score is >= 20

  if (scores[activePlayer] >= (`${winningScore}`)) {
    // Finish the game
    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  }

  // Switch to next player
  switchPlayer();
  }
});

// Reset the game 
btnNew.addEventListener('click', init);

