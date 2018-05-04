
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
  onclick1: false,
  onclick2: false,

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
        console.log(`Player 2 wins!!`);
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
$('#beginGame').hide();
let url = '';

$('.cell').click(function( ){

  const boardIndex = this.id;

  if( ticTacToe.board[boardIndex]!==null || ticTacToe.gameOver ){

    return;
  }



  ticTacToe.board[boardIndex] = ticTacToe.currentTurn;


  url = ticTacToe.icons[ ticTacToe.currentTurn ];
  $(this).css('background-image', `url(${ url })` );
    console.log(url);

    if(ticTacToe.currentTurn ==='X'){
      ticTacToe.currentTurn = 'O';
    }else {
      ticTacToe.currentTurn = 'X';
    };


  // check for win
  if(ticTacToe.move >= 5){
    const winner = ticTacToe.winCheck();
      if( winner ){
        gameOverModal( `${winner} wins!!` );
      } else if(ticTacToe.move === 9){
        gameOverModal( 'Game Over' );
      }
  }
  ticTacToe.move++;
});

const gameOverModal = function ( message ) {
  $('#winMessage').addClass('animated rubberBand');
  $('#winMessage').html( message ).show();
  $('.cell').fadeOut(1000);

  window.setTimeout(function () {
    $('#modal').fadeIn(1000);
  }, 2000);

  $('#beginGame').hide();
  ticTacToe.onclick1 = false;
  ticTacToe.onclick2 = false;

  ticTacToe.gameOver = true;
};

// $('#endGame').click(function(){
//   $('.cell').text('');
//   $('#mainGame').fadeOut();
//   $('#game').fadeOut();
//   $('#winMessage').fadeOut();
//   // reset the game
// });

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
  $('#startGame').hide();

});



$('#beginGame').click(function(){
  $('#modal').hide();
  $('#mainGame').show();
  $('#game').show();
  $('#winMessage').fadeOut();
  $('#startGame').hide();
  $('.cell').css('background-image', 'none').show();
  ticTacToe.gameOver = false;
  ticTacToe.move = 1;
  ticTacToe.board = [
    null, null, null,
    null, null, null,
    null, null, null
  ];
})


$('#player1 img').click(function(){
  ticTacToe.icons.X = this.src;
  console.log(ticTacToe.icons.X);

  $('#player1 img').css("border","none");
  $(this).css("border","10px solid white");
  console.log(this.src);
  $('.pl1').css('background-image',`url(${ this.src })`);
  ticTacToe.onclick1 = true;
  checkonclick();
});

$('#player2 img').click(function(){
  ticTacToe.icons.O = this.src;
  $('#player2 img').css("border","none");
  $(this).css("border","10px solid white")
  $('.pl2').css('background-image',`url(${ this.src })`);
  ticTacToe.onclick2 = true;
  checkonclick();
});

checkonclick = function(){
  if(ticTacToe.onclick1 && ticTacToe.onclick2 ){
    $('#beginGame').show();
  }
}
