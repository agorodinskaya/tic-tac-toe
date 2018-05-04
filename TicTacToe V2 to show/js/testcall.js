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



  // players: ['player1', 'player2'],
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
      // const winArr = [first,second,third];
      console.log(this.board[first]);
      if (this.board[first] === 'X' && this.board[second] === 'X' && this.board[third] === 'X'){
        console.log(`Player1 wins!!`);
        this.gameOver = true;
        this.player1Score++;
        $('#winOne').text(`Player 1 Score: ${this.player1Score}`)
        console.log(this.player1Score);
        return 'Player1';
      } else if (this.board[first] === 'O' && this.board[second] === 'O' && this.board[third] === 'O'){
        console.log(`Palyer 2 wins!!`);
        this.gameOver = true;
        this.player2Score++;
        $('#winTwo').text(`Player 2 Score: ${this.player2Score}`)
        console.log(this.player2Score);
        return 'Player2';
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
    // setTimeout(function() {
    //  code to run after timeout
    // } ,500);
      $('#modal').fadeIn(1000);
      $('.cell').text('');
      $('').text()

    return;
  }



  ticTacToe.board[boardIndex] = ticTacToe.currentTurn;


    const url = ticTacToe.icons[ ticTacToe.currentTurn ];
  $(this).css('background-image', `url(${ url })` );

    if(ticTacToe.currentTurn ==='X'){
      ticTacToe.currentTurn = 'O';
    }else {
      ticTacToe.currentTurn = 'X';
    };


  // check for win
  if(ticTacToe.move >= 5){
    const winner = ticTacToe.winCheck();
      if( winner ){
        $('#winMessage').addClass('animated rubberBand');
        $('#winMessage').html(`${winner} wins!!`).show().animateCss('rubberBand');
        // $('#winMessage').html(`${winner} wins!!`).show();

        // $('#winMessage').animateCss('bounce');
        ticTacToe.gameOver = true;

      } else if(ticTacToe.move === 9){
        $('#winMessage').addClass('animated rubberBand');
        $('#winMessage').html('Game Over').show().animateCss('rubberBand');
        ticTacToe.gameOver = true;
        console.log('Game Over - draw');
      }
  }
  ticTacToe.move++;
});




$('#endGame').click(function(){
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
// $('# mainGame pl1 img').css('background-image', `url(${ url })`);

$('.closeModal').click(function(){
  $('#modal').css ("display", "none");
  $('#mainGame').show();
  $('#game').show();

});

$('#player1 img').click(function(){
  ticTacToe.icons.X = this.src;
  $('#player1 img').css("border","none");
  $(this).css("border","10px solid white");
  $('#mainGame .pl1 img').css('background-image',`url(${ url })`);


});

$('#player2 img').click(function(){
  ticTacToe.icons.O = this.src;
  $('#player2 img').css("border","none");
  $(this).css("border","10px solid white");
  $('#mainGame > pl2 img').css('background-image',`url(${ url })`);

});




// TODO store images on the game page.
// TODO count wins.

//============
// TODO rework the buttons start / set figures.
// TODO make the modal appear automatically on the screen before the game starts and a few secs after the game is finished.
