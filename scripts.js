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

function createPlayer(marker) {
  function getMarker() {
    return marker;
  }

  return {
    getMarker
  };
}

function Game() {
  Gameboard.newBoard();
  const playerOne = createPlayer("X");
  const playerTwo = createPlayer("O");

  function checkWinner() {
    const boardState = Gameboard.getBoard();

    switch(true) {
      case rowWin(boardState):
        return true;
      default:
        return false;
    }
  }

  function rowWin(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].every(element => element !== "_" && element === board[i][0])) {
        return true;
      }
    }
    return false;
  }
}