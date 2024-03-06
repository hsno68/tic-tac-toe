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

  function setBoard(player = "test") {
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

function Game() {
  const gameboard = Gameboard.newBoard();
  console.table(Gameboard.getBoard());
  Gameboard.setBoard();
  console.table(Gameboard.getBoard());
}