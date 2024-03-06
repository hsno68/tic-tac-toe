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

  function setBoard(player) {
    let rowMove;
    let columnMove;

    do {
      rowMove = prompt("Row");
    } while (rowMove === null || rowMove < 0 || rowMove > 2);

    do {
      columnMove = prompt("Column");
    } while (columnMove === null || columnMove < 0 || columnMove > 2);

    console.log({rowMove, columnMove});
    board[rowMove][columnMove] = player;
  }

  return {
    newBoard,
    getBoard,
    setBoard
  };
})();

const Player = (function() {
  let marker;

  function getMarker() {
    return marker;
  }

  function setMarker() {
    if (marker === "O") {
      marker = "X";
    }
    else {
      marker = "O";
    }
  }

  return {
    getMarker,
    setMarker
  }
})();

function Game() {
  const gameboard = Gameboard.newBoard();
  console.table(Gameboard.getBoard());
  Player.setMarker();
  Gameboard.setBoard(Player.getMarker());
  console.table(Gameboard.getBoard());
}