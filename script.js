const GameBoard = (function () {
  //DOM elements
  const cells = document.querySelectorAll(".cell");
  const resettBtn = document.getElementById("reset");
  const startGameBtn = document.getElementById("new-game");
  const gameStatus = document.getElementById("status");
  let spaces = Array(9).fill(null);

  const Gamestate = {
    winCombos: [
      [0, 1, 2],
      [0, 3, 6],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [0, 4, 8],
    ],
    resetGame: () => {
      cells.forEach((cell) => (cell.innerHTML = ""));
      spaces = Array(9).fill(null);
      currentPlayer = playerOne;
      displayController.resetGame();
    },
    startGame: () => {
      Gamestate.resetGame();
      cells.forEach((cell) => cell.addEventListener("click", Gamestate.gamePlay));
      displayController.startGame();
      console.log("i was clicked");
    },

    gamePlay: (e) => {
      const id = e.target.getAttribute("cellindex");
      if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer.mark;
        // currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;

        displayController.turn();
        checkForWin();
        checkForDraw();
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;

        function checkForWin() {
          for (const combo of Gamestate.winCombos) {
            const [a, b, c] = combo;
            if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
              winConditon();
            }
          }
          return false; // No winner yet
        }
        function checkForDraw() {
          if (spaces.every((space) => space !== null) && !checkForWin()) {
            console.log("It's a draw!");
            displayController.draw();
          }
        }
      }
      function winConditon() {
        console.log(currentPlayer.name, "wins");
        cells.forEach((cell) => cell.removeEventListener("click", Gamestate.gamePlay));
        gameStatus.textContent = `${currentPlayer.name} Wins!`;
      }
    },
  };

  resettBtn.addEventListener("click", Gamestate.resetGame);
  startGameBtn.addEventListener("click", Gamestate.startGame);

  //Player Factory
  const player = (name, mark) => {
    return { name, mark };
  };

  //Creates player objects
  const playerOne = player("Anish", "X", false);
  const playerTwo = player("Shilpa", "O", false);
  var currentPlayer;

  const displayController = {
    startGame: function () {
      this.turn();
    },

    resetGame: function () {
      gameStatus.textContent = "Board has been reset, Click 'New Game' to Start";
    },
    turn: function () {
      gameStatus.textContent = `${currentPlayer.name}'s Turn with ${currentPlayer.mark}`;
    },

    draw: () => {
      gameStatus.textContent = `Game is a Draw`;
    },
  };

  // return { playerOne, playerTwo, spaces, currentPlayer };
})();
