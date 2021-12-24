const Gameboard = document.querySelector('.Gameboard');
const players = document.querySelectorAll('.player');
const rounds = document.querySelector('.rounds');
const startingButton = document.querySelector('.start__btn');
const playersNames = document.querySelectorAll('.player__name');
const roundsWon = document.querySelectorAll('.rounds__won');
const roundsCounter = document.querySelector('.rounds-counter');

let firstPlayer;
let secondPlayer;
let totalRounds = 0;
let counter = 0;

const game = (() => {
  startGame = () => {
    let turn;
    let gameBoard = [];
    let cells;
    roundsCounter.innerText = counter;
    firstPlayer = Player(players[0].value, 'x');
    secondPlayer = Player(players[1].value, 'o');
    totalRounds = rounds.value;
    playersNames[0].innerText = firstPlayer.name;
    playersNames[1].innerText = secondPlayer.name;
    roundsWon[0].innerText = firstPlayer.score;
    roundsWon[1].innerText = secondPlayer.score;
    startRound();
  }

  startRound = () => {
    roundsWon[0].innerText = firstPlayer.score;
    roundsWon[1].innerText = secondPlayer.score;
    counter++;
    if (counter > totalRounds) {
      setTimeout(game.endGame, 100);
    } else {
      roundsCounter.innerText = counter
      gameBoard = [];
      Gameboard.innerHTML = '';
      let count = 0;
      for (let i = 0; i < 9; i++) {
        gameBoard.push('')
      }
      for (let i = 0; i < gameBoard.length; i++) {
        Gameboard.innerHTML += `<div class="cell" id="${i}"></div>`;
      }
      cells = document.querySelectorAll('.cell');

      makeMove = cell => {
        if (cell.innerText == '') {
          turn = count % 2 == 0 ? firstPlayer : secondPlayer;
          gameBoard[cell.id] = turn.sign;
          cell.innerHTML = turn.sign;
          count++;
          setTimeout(game.endRound, 100)
        }
      }
      cells.forEach(cell => {
        cell.addEventListener('click', () => {
          makeMove(cell)
        })
      })
    }
  }

  endGame = () => {
    if (firstPlayer.score > secondPlayer.score) {
      alert(`${firstPlayer.name} won`);
    } else if (firstPlayer.score < secondPlayer.score) {
      alert(`${secondPlayer.name} won`);
    } else if (firstPlayer.score === secondPlayer.score) {
      alert("it's a tie");
    }
    counter = 0;
    roundsCounter.innerText = '';
    firstPlayer = undefined;
    secondPlayer = undefined;
    playersNames[0].innerText = '';
    playersNames[1].innerText = '';
    roundsWon[0].innerText = '';
    roundsWon[1].innerText = '';
    Gameboard.innerHTML = `<form action="" class="game__options">
                              <div class="players">
                                <input class="player" type="text" placeholder="Player 1">
                                <input class="player" type="text" placeholder="Player 2">
                              </div>
                              <input class="rounds" type="number" placeholder="Rounds quantity">
                              <button class="start__btn" type="button">start</button>
                            </form>`;
  }

  endRound = () => {
    if (gameBoard[0] == turn.sign && gameBoard[1] == turn.sign && gameBoard[2] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (gameBoard[3] == turn.sign && gameBoard[4] == turn.sign && gameBoard[5] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (gameBoard[6] == turn.sign && gameBoard[7] == turn.sign && gameBoard[8] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (gameBoard[0] == turn.sign && gameBoard[4] == turn.sign && gameBoard[8] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (gameBoard[2] == turn.sign && gameBoard[4] == turn.sign && gameBoard[6] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (gameBoard[0] == turn.sign && gameBoard[3] == turn.sign && gameBoard[6] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (gameBoard[1] == turn.sign && gameBoard[4] == turn.sign && gameBoard[7] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (gameBoard[2] == turn.sign && gameBoard[5] == turn.sign && gameBoard[8] == turn.sign) {
      turn.score++;
      game.startRound();
    } else if (!gameBoard.includes('')) {
      alert('tie');
      game.startRound();
    }
  }

  return { startGame, startRound, endRound, endGame }
})();

function Player(name, sign) {
  return { name, sign, score: 0 }
}

startingButton.addEventListener('click', () => {
  if (players[0].value !== '' && players[1].value !== '' && rounds.value !== '' && rounds.value > 0) game.startGame();
})