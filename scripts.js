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
  let currentPlayer;

  do {
    playerSetter();
    playRound();
  } while (checkWinner() === false);
  console.log(`${currentPlayer.getMarker()} is the winner!`);

  function playRound() {
    Gameboard.setMarker(currentPlayer.getMarker());
    console.table(Gameboard.getBoard());
  }

  function playerSetter() {
    if (!currentPlayer) {
      currentPlayer = playerOne;
    }
    else if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
    }
    else {
      currentPlayer = playerOne;
    }
  }

  function checkWinner() {
    const boardState = Gameboard.getBoard();

    switch(true) {
      case rowWin(boardState):
      case columnWin(boardState):
      case diagonalWin(boardState):
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

  function columnWin(board) {
    for (let i = 0; i < board.length; i++) {
      const container = [];
      for (let j = 0; j < board.length; j++) {
        container.push(board[j][i]);
      }
      if (container.every(element => element !== "_" && element === container[0])) {
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

    if (container1.every(element => element !== "_" && element === container1[0])) {
      return true;
    }
    
    if (container2.every(element => element !== "_" && element === container2[0])) {
      return true;
    }

    return false;
  }
}