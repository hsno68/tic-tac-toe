const Gameboard = (function() {
  let board;

  function newBoard() {
    const rows = 3;
    const columns = 3;
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("_");
      }
    }
  }

  function getBoard() {
    return board;
  }

  function placeMarker(player) {
    let rowMove;
    let columnMove;

    do {
      rowMove = prompt("Row");
    } while (rowMove === null || rowMove < 0 || rowMove > 2);

    do {
      columnMove = prompt("Column");
    } while (columnMove === null || columnMove < 0 || columnMove > 2);

    board[rowMove][columnMove] = player;
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

const Game = (function() {
  function init() {
    Gameboard.newBoard();

    do {
      Player.setMarker();
      Gameboard.placeMarker(Player.getMarker());
      DisplayController.displayBoard(Gameboard.getBoard());
    } while (GameController.checkWinner(Gameboard.getBoard()) === false);

    DisplayController.displayWinner(Player.getMarker());
  }
  
  return {
    init
  };
})();

const GameController = (function() {
  function checkWinner(board) {
    switch(true) {
      case rowWin(board):
      case columnWin(board):
      case diagonalWin(board):
        return true;
      default:
        return false;
    }
  }

  function rowWin(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].every(marker => marker !== "_" && marker === board[i][0])) {
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
      if (container.every(marker => marker !== "_" && marker === container[0])) {
        return true;
      }
    }
    return false;
  }

  function diagonalWin(board) {
    if (board[1][1] === "_") {
      return false;
    }

    const container1 = [];
    const container2 = [];

    for (let i = 0, j = 2; i < board.length; i++, j--) {
      container1.push(board[i][i]);
      container2.push(board[i][j]);
    }

    if (container1.every(marker => marker !== "_" && marker === container1[0])) {
      return true;
    }
    
    if (container2.every(marker => marker !== "_" && marker === container2[0])) {
      return true;
    }

    return false;
  }

  return {
    checkWinner
  };
})();

const DisplayController = (function() {
  function displayBoard(board) {
    console.table(board);
  }

  function displayWinner(player) {
    console.log(`${player} is the winner!`);
  }

  return {
    displayBoard,
    displayWinner
  };
})();