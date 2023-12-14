const GameBoard = (function () {
  //DOM elements
  const cells = document.querySelectorAll(".cell");
  const newGameBtn = document.getElementById("new-game");
  const gameStatus = document.getElementById("status");
  const startGameBtn = document.getElementById("player-box-button");
  let spaces = Array(9).fill(null);
  var currentPlayer;
  let wombocombo = null;

  //Player Factory
  const player = (name, mark) => {
    return { name, mark };
  };
  //Initalize players
  let playerOne = player("p1", "X");
  let playerTwo = player("p2", "O");

  //Game logic Controller
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
      cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("won-cell");
      });
      spaces = Array(9).fill(null);
    },

    newGame: () => {
      document.querySelector(".modal").style.visibility = "visible";
    },
    playerDetails: () => {},

    startGame: () => {
      document.querySelector(".modal").style.visibility = "hidden";
      playerOne.name = document.querySelector("#playerone").value;
      playerTwo.name = document.querySelector("#playertwo").value;
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
              GameBoard.wombocombo = { l1: a, l2: b, l3: c };
              winConditon();

              return true;
            }
          }
          return false; // No winner yet
        }

        function checkForDraw() {
          if (spaces.every((space) => space !== null) && !checkForWin()) {
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
  newGameBtn.addEventListener("click", Gamestate.newGame);

  // Display Controller
  const displayController = {
    startGame: function () {
      gameStatus.textContent = `${currentPlayer.name}'s Turn with ${currentPlayer.mark}`;
    },

    turn: function () {
      gameStatus.textContent = `${currentPlayer.name}'s Turn with ${currentPlayer.mark}`;
    },
    win: () => {
      gameStatus.textContent = `${currentPlayer.name} Wins`;
      startGameBtn.textContent = "Play Again?";
      displayController.colorCells();
    },

    draw: () => {
      gameStatus.textContent = `Game is a Draw`;
      startGameBtn.textContent = "Play Again?";
    },

    colorCells: () => {
      GameBoard.cells[GameBoard.wombocombo.l1].classList.add("won-cell");
      GameBoard.cells[GameBoard.wombocombo.l2].classList.add("won-cell");
      GameBoard.cells[GameBoard.wombocombo.l3].classList.add("won-cell");
    },
  };

  return { playerOne, playerTwo, wombocombo, currentPlayer, cells };
})();
