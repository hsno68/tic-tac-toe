const Gameboard = (function () {
  let board;

  function newBoard() {
    const rows = 3;
    const columns = 3;
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("0");
      }
    }
  }

  function getBoard() {
    return board;
  }

  return {
    newBoard,
    getBoard
  };
})();

Gameboard.newBoard();