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

  function setMarker(player) {
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
    setMarker
  };
})();

const Player = (function() {
  let marker = "X";

  function getMarker() {
    return marker;
  }

  function changeMarker() {
    if (marker === "O") {
      marker = "X";
    }
    else {
      marker = "O";
    }
  }

  return {
    getMarker,
    changeMarker
  }
})();

function Game() {
  Gameboard.newBoard();
  Player.changeMarker();
  Gameboard.setMarker(Player.getMarker());
}