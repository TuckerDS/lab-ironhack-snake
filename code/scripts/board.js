var Board = function(height, width){
  this.height = height;
  this.width = width;
  this.emptyCell = "*";
  this.map = [];
  this.bounds = true;
};

Board.prototype.init = function(){
  for (i=0; i < this.height; i++) {
    this.map[i] = [];
    for (j=0; j< this.width; j++) {
      this.map[i][j] = "*";
    }
  }
};

Board.prototype.placeItemAtEmpty = function(item,x,y){

  if (!bounds) {
    if (x > this.width) x = 0;
    if (x < 0) x = this.width;
    if (y > this.height) y = 0;
    if (y < 0) y = this.width;
  }
  if (this.map[y][x] == "*") {

    this.map[y][x] = item.direction;
    item.top = y;
    item.left = x;
    return true;
  } else {
    return false;
  }
};

//mode: random | fixed
Board.prototype.removeItem = function(x,y){
  this.map[y][x] = "*";
};

Board.prototype.validMovement = function(x,y){
  return ( (((x>=0) && (x<this.width)) && ((y>=0) && (y<this.height))) && (this.map[y][x] === "*") ) ? true : false;
};


Board.prototype.getItemAtPosition = function(x,y){
  if (!bounds) {
    if (x > this.width) x = 0;
    if (x < 0) x = this.width;
    if (y > this.height) y = 0;
    if (y < 0) y = this.width;
  }
  if (this.validMovement(y,x)) {
    return this.map[y][x];
  } else {
    return "OUTERLIMITS";
  }

};
