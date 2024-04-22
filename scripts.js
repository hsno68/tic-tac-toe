const Gameboard = (function() {
  const container = document.querySelector(".container");

  let board;
  const rows = 3;
  const columns = 3;

  function newBoard() {
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("");
      }
    }
    render();
  }

  function setBoard(row, column, currentPlayer) {
    board[row][column] = currentPlayer;
    render();
  }

  function getBoard() {
    return board;
  }

  function render() {
    container.replaceChildren();
    for (let i = 0; i < rows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      container.appendChild(row);
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", `${i}`);
        cell.setAttribute("data-column", `${j}`);
        cell.textContent = board[i][j];
        row.appendChild(cell);
      }
    }
  }

  return {
    newBoard,
    setBoard,
    getBoard
  };
})();

const Cell = (function() {
  let marker = "";

  function clearMarker() {
    marker = "";
  }

  function setMarker() {
    if (marker === "") {
      marker = "X";
    }
    else if (marker === "X") {
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
    clearMarker,
    setMarker,
    getMarker
  };
})();

const Announcer = (function() {
  const announcer = document.querySelector(".announcer");

  function setMessage(message) {
    announcer.textContent = message;
  }
  
  return {
    setMessage
  };
})();

const Game = (function() {
  const button = document.querySelector("button");
  const container = document.querySelector(".container");

  button.addEventListener("click", () => {
    Cell.clearMarker();
    Gameboard.newBoard();
    Announcer.setMessage("");
    Cell.setMarker();
  });

  container.addEventListener("click", (e) => {
    const board = Gameboard.getBoard();
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");

    if (board[row][column] !== "") {
      return;
    }

    const currentPlayer = Cell.getMarker();
    Gameboard.setBoard(row, column, currentPlayer);
    Announcer.setMessage(`${currentPlayer}'s turn. Placing marker at Row: ${+row + 1}, Column: ${+column + 1}.`);

    if (!endGame(board)) {
      Cell.setMarker();
    }
    else if (endGame(board) === "win") {
      Announcer.setMessage(`${currentPlayer} wins!`);
    }
    else if (endGame(board) === "tie") {
      Announcer.setMessage("It's a tie.");
    }

    console.table(board);
  });

  Gameboard.newBoard();
  Cell.setMarker();

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
})();