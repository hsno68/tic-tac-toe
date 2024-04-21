const Gameboard = (function() {
  const container = document.querySelector(".container");
  const button = document.querySelector("button");

  button.addEventListener("click", newBoard);

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

  function setBoard(row, column) {
    board[row][column] = Cell.getMarker();
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
        row.appendChild(cell);
      }
    }
    console.table(board);
  }

  newBoard();

  return {
    newBoard,
    setBoard,
    getBoard
  };
})();

const Cell = (function() {
  const container = document.querySelector(".container");
  const button = document.querySelector("button");

  container.addEventListener("click", (e) => {
    if (e.target.textContent !== "") {
      return;
    }
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");
    Gameboard.setBoard(row, column);
    render(e);
    if (!Ender.endGame()) {
      Announcer.setMessage(getMarker(), row, column);
      setMarker();
    }
    else {
      
    }
  });

  button.addEventListener("click", clearMarker);

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
    e.target.textContent = getMarker();
    console.table(Gameboard.getBoard());
  }

  setMarker();

  return {
    getMarker
  };
})();

const Announcer = (function() {
  const announcer = document.querySelector(".announcer");

  function setMessage(marker, row, column) {
    if (!Ender.endGame()) {
      announcer.textContent = `${marker}'s turn, placing it at Row: ${row}, Column: ${column}`;
      return;
    }
  }

  return {
    setMessage
  }
})();

const Ender = (function() {
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