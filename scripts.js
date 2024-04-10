const container = document.querySelector(".container");

const Gameboard = (function() {
  let board;

  function newBoard() {
    container.replaceChildren();
    const rows = 3;
    const columns = 3;
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      const row = document.createElement("div");
      row.classList.add("row");
      container.appendChild(row);
      for (let j = 0; j < columns; j++) {
        board[i].push("");
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", `${i}`);
        cell.setAttribute("data-column", `${j}`);
        row.appendChild(cell);
      }
    }
    console.table(board);
  }

  function getBoard() {
    return board;
  }

  function placeMarker(player, row, column) {
    if (board[row][column] === "") {
      board[row][column] = player;
    }
    else {
      console.log(`Row: ${rowMove}, Column ${columnMove} is already filled and not valid`);
    }
  }

  return {
    newBoard,
    getBoard,
    placeMarker
  };
})();

const Player = (function() {
  let marker;

  function getMarker() {
    return marker;
  }

  function setMarker() {
    if (!marker) {
      marker = "X";
    }
    else if (marker === "X") {
      marker = "O";
    }
    else {
      marker = "X";
    }
  }

  return {
    getMarker,
    setMarker
  };
})();

const EventHandler = (function() {
  container.addEventListener("click", (e) => {
    playerPlaceMarkerEvent(e);
    checkEndEvent();
  });

  function playerPlaceMarkerEvent(e) {
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");
    console.log({row, column});
  }

  function checkEndEvent() {
    console.log(Ender.endGame());
  }
})();

const Ender = (function() {
  function endGame() {
    switch(true) {
      case rowWin():
      case columnWin():
      case diagonalWin():
        return true;
      case gameTie():
        return true;
      default:
        return false;
    }
  }

  function rowWin() {
    const board = Gameboard.getBoard();
    for (let i = 0; i < board.length; i++) {
      if (board[i].every(marker => marker !== "" && marker === board[i][0])) {
        return true;
      }
    }
    return false;
  }

  function columnWin() {
    const board = Gameboard.getBoard();
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

  function diagonalWin() {
    const board = Gameboard.getBoard();
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

  function gameTie() {
    const board = Gameboard.getBoard();
    for (let i = 0; i < board.length; i++) {
      if (board[i].includes("")) {
        return false;
      }
    }
    return true;
  }

  return {
    endGame
  };
})();

Gameboard.newBoard();