
var snake = new Snake("S");
var board = new Board(40,30);
var bounds = true;
var playOn = false;
var timeID, snakeTimeID;

var Fruit = function(name) {
  this.name = name;
  this.direction = name;
  this.top = 0;
  this.left = 0;
  this.id = 0;
};

var fruits = [];

window.onload=init;

function init() {
  var btnStart = document.getElementById("Start");
  var btnBounds = document.getElementById("switchBounds");
  var divMsg = document.getElementById("msg");
  btnStart.onclick = switchPlayOn;
  btnBounds.onclick = switchBounds;
  document.addEventListener("onkeyup", getKeyChar);

  snake = new Snake("S");
  board = new Board(30,40);
  board.init();
}

//Move a snake with options
function moveSnake(moveOption, snake) {
//Store pre-position
  preCoordY = snake.top;
  preCoordX = snake.left;
//Make the move
  switch (moveOption) {
    case "F":
      snake.goForward();
      break;
    case "R":
      snake.turnRight();
      break;
    case "L":
      snake.turnLeft();
      break;
    default:
  }

  //If move
  if (moveOption==="F" || moveOption==="B") {
    switch (board.getItemAtPosition(snake.left,snake.top)) {
      case "*":
        board.placeItemAtEmpty(snake, snake.left, snake.top);
        board.map[preCoordY][preCoordX]="*";
        break;
      case "X":
        eventEatAFruit(snake.left, snake.top);
        break;
      case "OUTERLIMITS":
        gameOver();
        break;
      default:
        snake.top = preCoordY;
        snake.left = preCoordX;
    }
  //If only change direction
  } else {
    board.map[snake.top][snake.left] = snake.direction;
  }
  //printBoard(board);
}

function eventEatAFruit (x,y) {
  board.removeItem(x,y);
  for (var i = 0; fruits.length; i++){
    if (fruits[i].top === y && fruits[i].left === x) {
        fruits.splice(i,1);
        break;
    }
  }
}

//Move the Rover with cursors
function getKeyChar (event){
  var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
  var userMove;
  //alert ("keyCode: " + event.keyCode + " Unicode charcode: " + chCode + " StringFrom charcode: "+ String.fromCharCode(chCode));
  switch (event.keyCode) {
    case 38: //up     keycode(70)=F
      //userMove="F";
      break;
    case 40: //down   keycode(66)=B
      //userMove="B";
      break;
    case 39: //right  keycode(82)=R
      userMove="R";
      break;
    case 37: //left   keycode(77)=L
      userMove="L";
      break;
    default:
      userMove = String.fromCharCode(chCode).toUpperCase();
      break;
  }
  moveSnake(userMove, snake);
}

/* Init a empty board and place some obstacles */
function initBoard (snake, board){
  //Place the snake
  snake.top = 15;
  snake.left = 2;
  snake.direction = "E";
  board.map[snake.top][snake.left] = snake.direction;

  //Place the fruits
  var fruits = [new Fruit("X"),new Fruit("X")];
  for (i=0; i < fruits.length; i++) {
    var x,y;
    do {
      x = Math.floor(Math.random() * board.width);
      y = Math.floor(Math.random() * board.height);
    } while (!board.placeItemAtEmpty(fruits[i], x, y));
  }
}

//Draw board at console and browser
function printBoard() {
  var consoleMap="";
  var surface = document.getElementById('surface');
  surface.innerHTML = "";
  for (i=0; i < board.height -1; i++) {
    for (j=0; j < board.width -1; j++) {
      switch (board.getItemAtPosition(j,i)) {
        case "N":
        case "S":
        case "E":
        case "W":
        console.log("vovimiento" +board.getItemAtPosition(j,i));
          surface.innerHTML += "<img id='"+snake.name+"' src='./images/" + snake.name + snake.direction + ".png' style='top: "+ (snake.top * 20) + "px ;left: "+(snake.left * 20)+ "px;'/>";
          break;
        case "X":
          surface.innerHTML += "<img class='obstacle' style='top: "+ (i*20) +"px; left: "+ (j*20) +"px;' src='./images/stone.png' alt=''/>";
          break;
        default:
      }
      consoleMap += board.map[i][j];
    }
    consoleMap += "\n";
  }
  console.log(consoleMap);
  surface.innerHTML += '<div id="board"><pre>'+consoleMap+'</pre></div>';
}


/* On-Off a random movement snake Start Game*/
function switchPlayOn() {
  initBoard(snake, board);
  if (playOn) {
    playOn = false;
    gameOver();
  } else {
    playOn = true;
    //var timeID = setInterval(printBoard, 33);
    var snakeTimeID = setInterval(snakeAutoMove, 250);
  }
}

/*Switch On-Off Bounds on Click*/
function switchBounds() {
  if (board.bounds) {
    board.bounds = false;
    document.getElementById('switchBounds').style.backgroundColor = "red";
  } else {
    board.bounds = true;
    document.getElementById('switchBounds').style.backgroundColor = "green";
  }
}

function gameOver(){
  playOn = false;
  //clearInterval(timeID);
  clearInterval(snakeTimeID);
  alert("GAME OVER");
}

function snakeAutoMove(){
  if (playOn) printBoard();
  if (playOn) moveSnake("F", snake);
}
