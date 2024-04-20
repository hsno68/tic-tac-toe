const Gameboard = (function() {
  const container = document.querySelector(".container");
  const button = document.querySelector("button");

  container.addEventListener("click", setBoard);
  button.addEventListener("click", () => {
    Cell.clearMarker();
    newBoard();
  });

  let board;
  const rows = 3;
  const columns = 3;

  function newBoard() {
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell.getMarker());
      }
    }
    render();
  }

  function setBoard(e) {
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");
    board[row][column] = Cell.getMarker();
    console.table(board);
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
    console.table(board);
  }

  return {
    newBoard,
    getBoard
  };
})();

const Cell = (function() {
  const container = document.querySelector(".container");

  container.addEventListener("click", (e) => {
    if (e.target.textContent !== "") {
      return;
    }
    setMarker();
    render(e);
  });

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

  function getMarker(e) {
    return marker;
  }

  function render(e) {
    e.target.textContent = marker;
  }

  return {
    clearMarker,
    setMarker,
    getMarker
  };
})();

const Ender = (function() {
  const container = document.querySelector(".container");
  
  container.addEventListener("click", () => {
    if (!endGame()) {
      return;
    }

    if (endGame() === "win") {
      console.log(`${Cell.getMarker()} is the winner!`)
    }

    if (endGame() === "tie") {
      console.log("It's a tie.");
    }
  });

  function endGame() {
    const board = Gameboard.getBoard();
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

  return {
    endGame
  }
})();