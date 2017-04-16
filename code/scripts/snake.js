var Snake = function(name) {
  this.name = name;
  this.top = 0;
  this.left = 0;
  this.direction= 'N';
};

Snake.prototype.goForward = function() {
  switch(this.direction) {
    case 'N':
      this.top--;
      break;
    case 'E':
      this.left++;
      break;
    case 'S':
      this.top++;
      break;
    case 'W':
      this.left--;
      break;
  }
};

Snake.prototype.goBackward = function() {
  switch(this.direction) {
    case 'N':
      this.top++;
      break;
    case 'E':
      this.left--;
      break;
    case 'S':
      this.top--;
      break;
    case 'W':
      this.left++;
      break;
  }
};

Snake.prototype.turnLeft = function(){
  switch(this.direction) {
    case 'N':
      this.direction = "W";
      break;
    case 'E':
      this.direction = "N";
      break;
    case 'S':
      this.direction = "E";
      break;
    case 'W':
      this.direction = "S";
      break;
  }
};

Snake.prototype.turnRight = function(){
  switch(snake.direction) {
    case 'N':
      this.direction = "E";
      break;
    case 'E':
      this.direction = "S";
      break;
    case 'S':
      this.direction = "W";
      break;
    case 'W':
      this.direction = "N";
      break;
  }
};

Snake.prototype.moveLeft = function() {
    this.turnLeft();
    this.moveForward();
};

Snake.prototype.moveRight = function() {
  this.turnRight();
  this.moveForward();
};

Snake.prototype.updatePosition = function(x,y) {
  this.top = y;
  this.left = x;
};
