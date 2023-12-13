const GameBoard = (function () {
  //DOM elements
  const cells = document.querySelectorAll(".cell");
  // const resettBtn = document.getElementById("reset");
  const startGameBtn = document.getElementById("new-game");
  const gameStatus = document.getElementById("status");
  let spaces = Array(9).fill(null);
  var currentPlayer;

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
    },
    startGame: () => {
      Gamestate.resetGame();
      currentPlayer = playerOne;
      cells.forEach((cell) => cell.addEventListener("click", Gamestate.gamePlay));
      displayController.startGame();
    },

    stopGame: () => {
      cells.forEach((cell) => cell.removeEventListener("click", Gamestate.gamePlay));
    },

    gamePlay: (e) => {
      const id = e.target.getAttribute("cellindex");
      if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer.mark;
        if (checkForWin() || checkForDraw()) {
          console.log("game stop");
        } else {
          currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
          displayController.turn();
        }

        checkForWin();
        checkForDraw();

        function checkForWin() {
          for (const combo of Gamestate.winCombos) {
            const [a, b, c] = combo;
            if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
              winConditon();
              return true;
            }
          }
          return false; // No winner yet
        }

        function checkForDraw() {
          if (spaces.every((space) => space !== null) && !checkForWin()) {
            console.log("It's a draw!");
            displayController.draw();
            Gamestate.stopGame();
            return true;
          }
          return false; // Not Draw
        }
      }
      function winConditon() {
        Gamestate.stopGame();
        displayController.win();
      }
    },
  };

  startGameBtn.addEventListener("click", Gamestate.startGame);

  //Player Factory
  const player = (name, mark) => {
    return { name, mark };
  };

  //Creates player objects
  const playerOne = player("Anish", "X", false);
  const playerTwo = player("Shilpa", "O", false);

  const displayController = {
    startGame: function () {
      gameStatus.textContent = `${currentPlayer.name}'s Turn with ${currentPlayer.mark}`;
      startGameBtn.textContent = "Reset";
    },

    turn: function () {
      gameStatus.textContent = `${currentPlayer.name}'s Turn with ${currentPlayer.mark}`;
    },
    win: () => {
      gameStatus.textContent = `${currentPlayer.name}'s Wins`;
      console.log("win");
      startGameBtn.textContent = "Play Again?";
    },

    draw: () => {
      gameStatus.textContent = `Game is a Draw`;
      startGameBtn.textContent = "Play Again?";
    },
  };

  return { playerOne, playerTwo, spaces, currentPlayer };
})();
