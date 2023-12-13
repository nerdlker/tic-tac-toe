const GameBoard = (function () {
  //DOM elements
  const cells = document.querySelectorAll(".cell");
  const resettBtn = document.getElementById("reset");
  const startGameBtn = document.getElementById("new-game");
  const gameStatus = document.getElementById("status");
  let spaces = Array(9).fill(null);

  resettBtn.addEventListener("click", resetGame);
  startGameBtn.addEventListener("click", startGame);

  const player = (name, mark) => {
    return { name, mark };
  };

  const playerOne = player("Steve", "X", false);
  const playerTwo = player("Mike", "O", false);
  var currentPlayer;

  const winCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
  ];

  function startGame() {
    resetGame();
    cells.forEach((cell) => cell.addEventListener("click", gamePlay));
    displayController.startGame();
  }
  function resetGame() {
    cells.forEach((cell) => (cell.innerHTML = ""));
    spaces = Array(9).fill(null);
    currentPlayer = playerOne;
    displayController.resetGame();
  }

  function gamePlay(e) {
    const id = e.target.getAttribute("cellindex");
    if (!spaces[id]) {
      spaces[id] = currentPlayer;
      console.log(spaces[id]);
      e.target.innerText = currentPlayer.mark;
      currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
      checkForWin();
      //   if (playerWins) {
      //     gameStatus.innerText = `${currentPlayer.name} has one the game!`;
      //   }
      function checkForWin() {
        for (const combo of winCombos) {
          const [a, b, c] = combo;
          if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            winConditon();
          }
        }
        return false; // No winner yet
      }
    }
    function winConditon() {
      console.log(currentPlayer.name, "wins");
      cells.forEach((cell) => cell.removeEventListener("click", gamePlay));
      gameStatus.textContent = `${currentPlayer.name} Wins!`;
    }
  }

  const displayController = {
    startGame: function () {
      gameStatus.textContent = "Game Started";
    },

    resetGame: function () {
      gameStatus.textContent = "Board has been reset \n Click New Game to Start";
    },
  };

  return { playerOne, playerTwo, spaces, currentPlayer };
})();
