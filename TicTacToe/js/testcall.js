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

  player1Score: 0,
  player2Score: 0,


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



// TODO for more than 9 cells.
  winCheck: function () {
    for (var i = 0; i < this.winPos.length; i++) {
      const win = this.winPos[i];
      console.log(win);
      const first = win[0];
      const second = win[1];
      const third = win[2];
      const winArr = [first,second,third];
      console.log(this.board[first]);
      if (this.board[first] === 'X' && this.board[second] === 'X' && this.board[third] === 'X'){
        console.log(`Player1 wins!!`);
        this.gameOver = true;
        this.player1Score++;
        $('#winOne').text(`Player 1 Score: ${this.player1Score}`)
        console.log(this.player1Score);
        return 'X';
      } else if (this.board[first] === 'O' && this.board[second] === 'O' && this.board[third] === 'O'){
        console.log(`Palyer 2 wins!!`);
        this.gameOver = true;
        this.player2Score++;
        $('#winTwo').text(`Player 2 Score: ${this.player2Score}`)
        console.log(this.player2Score);
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
    setTimeout(,1000);
    $('.cell').html('');

    return;
  }

  ticTacToe.board[boardIndex] = ticTacToe.currentTurn;
  // $('#game').append('<img src="ticTacToe" />')
  // $(this).attr('src','ticTacToe.player1Icon' );
  //
  // if(ticTacToe.currentTurn ==='X'){
  //   $(this).css('background-image', `url(${ticTacToe.player1Icon})`); //or player2Icon?
  // } else {
  //   $(this).css('background-image', `url(${ticTacToe.player2Icon})`)
  // }

    const url = ticTacToe.icons[ ticTacToe.currentTurn ];
  $(this).css('background-image', `url(${ url })` );

  // console.log(ticTacToe.player1Icon);
  // console.log(ticTacToe.board);
  // at the end of the turn, switch players
    if(ticTacToe.currentTurn ==='X'){
      ticTacToe.currentTurn = 'O';
    }else {
      ticTacToe.currentTurn = 'X';
    };


  // check for win
  if(ticTacToe.move >= 5){
    const winner = ticTacToe.winCheck();
      if( winner ){
        // for(let i = 0; i < 3; i++){
        // $(`#${winArr[i]}`).css("background-color","green");
        // };
        $('#winMessage').html(`${winner} wins!!`).show();
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
  $('#mainGame').fadeOut();
  $('#game').fadeOut();
  $('#winMessage').fadeOut();
  // reset the game
});

// press start -> open modal -> press close modal -> main Game
$('#startGame').click(function(){
  $('#modal').css ("display", "block");
  $('.avatar1').show();
  $('.avatar2').show();
});

$('.closeModal').click(function(){
  $('#modal').css ("display", "none");
  $('#mainGame').show();
  $('#game').show();
  $('#cat').show();
});
//
// $('.avatar').click(function(e){
//   console.log(this.src);
//   ticTacToe.player1Icon = $('.avatar1').attr('src');
//
// });


$('#player1 img').click(function(){
  ticTacToe.icons.X = this.src;
  $('#player1 img').css("border","none");
  $(this).css("border","10px solid white");

});

$('#player2 img').click(function(){
  ticTacToe.icons.O = this.src;
  $('#player2 img').css("border","none");
  $(this).css("border","10px solid white");

});



// $('.avatar1').click(function(){
//   $('.avatar1').fadeOut();
//   // $('.avatar1').attr('src','images/totorserceau.gif');
//   ticTacToe.player1Icon = $('.avatar1').attr('src');
//   console.log(ticTacToe.player1Icon);
//   // store the url to ticTacToe.icons.X
// });
//
// $('.avatar2').click(function(){
//   $('.avatar2').fadeOut();
//   ticTacToe.player2Icon = $('.avatar2').attr('src');
//   console.log(ticTacToe.player1Icon);
//   // store the url to ticTacToe.icons.X
// });
//TODO turns
// TODO store images
// TODO count winners.
// TODO set color to the winning cells.
