const Gameboard = (function() {
  const container = document.querySelector(".container");
  container.addEventListener("click", setBoard);
  let board;

  function newBoard() {
    board = [];
    const rows = 3;
    const columns = 3;
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell);
      }
    }
    render();
  }

  function setBoard(e) {
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");
    board[row][column] = Player.getMarker();
  }

  function getBoard() {
    return board;
  }

  function render() {
    container.replaceChildren();
    for (let i = 0; i < board.length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      container.appendChild(row);
      for (let j = 0; j < board.length; j++) {
        const cell = document.createElement("div");
        cell.setAttribute("data-row", `${i}`);
        cell.setAttribute("data-column", `${j}`);
        cell.classList.add("cell");
        row.appendChild(cell);
      }
    }
    console.table(board);
  }

  return {
    newBoard,
    getBoard
  };
})();

const Cell = (function() {
  const container = document.querySelector(".container");
  container.addEventListener("click", render);

  function getMarker(e) {
    return e.target.textContent;
  }

  function render(e) {
    const currentPlayer = Player.getMarker();
    e.target.textContent = currentPlayer;
    console.table(Gameboard.getBoard());
  }

  return {
    getMarker
  };
})();

const Player = (function() {
  let marker = "X";

  function setMarker() {
    if (marker === "X") {
      marker = "O";
    }
    else {
      marker = "X";
    }
  }

  function getMarker() {
    return marker;
  }

  return {
    setMarker,
    getMarker
  };
})();

function Game() {
  const container = document.querySelector(".container");
  container.addEventListener("click", () => {
    Player.setMarker();
    Ender();
  });
  Gameboard.newBoard();
}

function Ender() {
  const board = Gameboard.getBoard();
  endGame(board);

  function endGame(board) {
    switch(true) {
      case rowWin(board):
      case columnWin(board):
      case diagonalWin(board):
        return "win";
      case gameTie(board):
        return "tie";
      default:
        return false;
    }
  }

  function rowWin(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].every(marker => marker !== "" && marker === board[i][0])) {
        return true;
      }
    }
    return false;
  }

  function columnWin(board) {
    for (let i = 0; i < board.length; i++) {
      const container = [];
      for (let j = 0; j < board.length; j++) {
        container.push(board[j][i]);
      }
      if (container.every(marker => marker !== "" && marker === container[0])) {
        return true;
      }
    }
    return false;
  }

  function diagonalWin(board) {
    if (board[1][1] === "") {
      return false;
    }

    const container1 = [];
    const container2 = [];

    for (let i = 0, j = 2; i < board.length; i++, j--) {
      container1.push(board[i][i]);
      container2.push(board[i][j]);
    }

    if (container1.every(marker => marker !== "" && marker === container1[0])) {
      return true;
    }
    
    if (container2.every(marker => marker !== "" && marker === container2[0])) {
      return true;
    }

    return false;
  }

  function gameTie(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].includes("")) {
        return false;
      }
    }
    return true;
  }
}

Game();