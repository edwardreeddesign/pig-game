'use strict'

// Assigning Elements
const player1El = document.querySelector('.player--0')
const player2El = document.querySelector('.player--1')
const score1El = document.getElementById('score--0')
const score2El = document.getElementById('score--1')
const current1El = document.getElementById('current--0')
const current2El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn-new')
const btnRoll = document.querySelector('.btn-roll')
const btnHold = document.querySelector('.btn-hold')

let scores, currentScore, activePlayer, playing

// Starting Conditions

const init = function () {
  scores = [0, 0]
  currentScore = 0
  activePlayer = 0
  playing = true

  score1El.textContent = 0
  score2El.textContent = 0
  current1El.textContent = 0
  current2El.textContent = 0

  diceEl.classList.add('hidden')
  player1El.classList.remove('player--winner')
  player2El.classList.remove('player--winner')
  player1El.classList.add('player--active')
  player2El.classList.remove('player--active')
}
init()

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  player1El.classList.toggle('player--active')
  player2El.classList.toggle('player--active')
}

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a Random Roll
    const dice = Math.trunc(Math.random() * 6) + 1

    // Display the Dice
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`

    // Check if rolled a 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      // Switch player
      btnRoll.classList.add('end-turn')
      btnRoll.disabled = true
      setTimeout(function () {
        btnRoll.disabled = false
        btnRoll.classList.remove('end-turn')
      }, 1200)
      switchPlayer()
    }
  }
})

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active players score
    scores[activePlayer] += currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]

    // Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the Game
      playing = false
      diceEl.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner', 'winner')
      setTimeout(function () {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('winner')
      }, 6200)

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
    } else {
      // Switch to the next player
      switchPlayer()
    }
  }
})

btnNew.addEventListener('click', init)

// Show Rules Modal
const modal = document.querySelector('.rules')
const btnShowModal = document.querySelector('.show-modal')
const btnCloseModal = document.querySelector('.close-modal')
const overlay = document.querySelector('.overlay')

const openModal = function () {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}
const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

btnShowModal.addEventListener('click', openModal)

btnCloseModal.addEventListener('click', closeModal)

overlay.addEventListener('click', closeModal)

window.onload = openModal

// Clear indicator when player looses. Change color of playe section when gets a 1.
// Button colors - i.e. Roll Btn = green - Hold = red
