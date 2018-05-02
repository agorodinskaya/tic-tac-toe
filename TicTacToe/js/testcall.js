/*
player1 &2
figures x and o,
turns start from 1.

one round:
- select figures:
  1. if player 1 has x player 2 has o.
  2. else if player1 has o player 2 has x
  3. Make the figures disappear once selected,
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
    else if last turn + 1, player2:
      fill selected figure in board[i] === null,
      check for win:
      go through possible winning positions and compare filled cells to the winning position cells.
      if match => display "win",
      else if last turn + 1, player1:
      fill selected figure in board[i] === null,
      check for win:
      go through possible winning positions and compare filled cells to the winning position cells.
      if match => display "win",
      else if last turn + 1, player2:
      fill selected figure in board[i] === null,
      check for win:
      go through possible winning positions and compare filled cells to the winning position cells.
      if match => display "win",

  next round : select figures and all the steps as above.


*/

console.log('linked!');


const ticTacToe = {

  currentTurn: 'X',

  players: ['player1', 'player2'],
  move:1,

  icons: {
    X: '',
    O: ''
  },

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

  gameOver : false,

  // TODO : be able to choose any value:

  setFig: function(a){
    if(a === icons.X){
      this.players.player2 = this.icons.O;
      return this.icons.X;
    }else if(a === icons.O){
      this.players.player2 = this.icons.X;
      return this.icons.O;
    }
  },


// TODO for more than 9 cells.
  winCheck: function () {
    for (var i = 0; i < this.winPos.length; i++) {
      const win = this.winPos[i];
      console.log(win);
      const first = win[0];
      const second = win[1];
      const third = win[2];
      console.log(this.board[first]);
      if (this.board[first] === 'X' && this.board[second] === 'X' && this.board[third] === 'X'){
        console.log('X win');
        this.gameOver = true;
        return 'X';
      } else if (this.board[first] === 'O' && this.board[second] === 'O' && this.board[third] === 'O'){
        console.log('O win');
        this.gameOver = true;
        return 'O';
      }
    }

    return false;
    // console.log(win);
  }

};



// JQuery:


$('.cell').click(function( ){

  const boardIndex = this.id;

  if( ticTacToe.board[boardIndex]!==null || ticTacToe.gameOver ){
    return;
  }

  ticTacToe.board[boardIndex] = ticTacToe.currentTurn;
  $(this).text(  ticTacToe.setFig(a) );
  console.log(ticTacToe.board);
  // at the end of the turn, switch players
  if(ticTacToe.currentTurn === ticTacToe.icons.X){
    ticTacToe.currentTurn = ticTacToe.icons.O;
  }else {
    ticTacToe.currentTurn = ticTacToe.icons.X;
  }

  // check for win
  if(ticTacToe.move >= 5){
    const winner = ticTacToe.winCheck();
      if( winner ){
        $('#winMessage').html(`${winner} win!`).show();

        ticTacToe.gameOver = true;
      } else if(ticTacToe.move === 9){
        $('#winMessage').html('Game Over').show();
        ticTacToe.gameOver = true;
        console.log('Game Over - draw');
      }
  }
  ticTacToe.move++;
});


$('#endGame').click(function(){
  // const $cells = $('.cell');
  // for(let i = 0; i< $cells.length; i++){
  //   $cells[i].innerText = '';
  // }
  $('.cell').text('');
  $('#selectFig').fadeOut();
  $('#game').fadeOut();
  $('#winMessage').fadeOut();
});


$('#startGame').click(function(){
  $('#selectFig').show();
  $('#game').show();
  $('#cat').show();
});
