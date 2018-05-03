/*
player1 &2
figures x and o,
turns start from 1.

one round:
- select figures:
  1. if player 1 has x player 2 has o.
  2. else if player1 has o player 2 has x
- start the game:
  player1 plays turn = 1:
    fill selected figure in board[i] === null,
  player2 plays turn +1:
    fill selected figure in board[i] === null,
  player1 plays (turn +1) +1:
    fill selected figure in board[i] === null,
  player2 plays (turn + 2) +1:
    fill selected figure in board[i] === null,
  player1 plays (turn + 3) +1:
    fill selected figuer in board[i] === null,
    check for win :
    go through possible winning positions and compare filled cells to the winning position cells.
    if match => display "win",
    else last turn + 1, player2:
      fill selected figure in board[i] === null,
      check for win:
      go through possible winning positions and compare filled cells to the winning position cells.
      if match => display "win",
      else last turn + 1 - player1:
      idem above.

  next round :

*/

console.log('linked!');


const ticTacToe = {

  currentTurn: 'X',

  players: ['player1', 'player2'],
  move:1,


  board: [
    null, null, null,
    null, null, null,                 // board[ 4 ] = 'X';
    null, null, null
  ],



  winPos : [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ],


winCheck: function () {
  for (var i = 0; i < this.winPos.length; i++) {
    const win = this.winPos[i];
    const first = win[0];
    const second = win[1];
    const third = win[2];
    if (this.board[first] === 'X' && this.board[second] === 'X' && this.board[third] === 'X'){
      return 'Win';
    } else if (this.board[first] === 'O' && this.board[second] === 'O' && this.board[third] === 'O') {
      return 'Win';
    }
  }
  console.log(win);
},

};


// ticTacToe.setFig()
// JQuery:


$('.cell').click(function( ){

  const boardIndex = this.id;

  if(ticTacToe.board[boardIndex]!==null){
    return;
  }

  ticTacToe.board[boardIndex] = ticTacToe.currentTurn;
  $(this).text(  ticTacToe.currentTurn );
  console.log(ticTacToe.board);
  // at the end of the turn, switch players
  if(ticTacToe.currentTurn === 'X'){
    ticTacToe.currentTurn = 'O';
  }else {
    ticTacToe.currentTurn = 'X';
  }

  // check for win
  if(ticTacToe.move >= 5){
    const winner = ticTacToe.winCheck();
      if( winner ){
        $('#winMessage').html(`${winner} win!`).show();
        console.log(winner);
        ticTacToe.gameOver = true;
      } else if(ticTacToe.move === 9){
        $('#winMessage').html('Game Over').show();
        ticTacToe.gameOver = true;
        console.log('Game Over - draw');
      }
  }


  ticTacToe.move++;

});
