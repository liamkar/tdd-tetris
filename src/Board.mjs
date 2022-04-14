export class Board {
  width;
  height;
 
  block;
  blockPositionRow;
  blockPositionColumn;
 
  fallingBlock=true;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    
    const NEW_LINE = "\n";

    let boardPrint =""
    for (let i=0; i<this.height; i++) {
      for (let j=0; j<this.width; j++) {
        if (this.block) {
          if (this.blockPositionRow === i && this.blockPositionColumn === j) {
            boardPrint = boardPrint+this.block.icon;
          }
          else {
            boardPrint = this.addTextureToBoardPrint(boardPrint);
          }
        }
        else {
          boardPrint = this.addTextureToBoardPrint(boardPrint);
        }        
    }
    boardPrint = boardPrint+NEW_LINE;
  }
  return boardPrint;
}
  addTextureToBoardPrint(boardPrint) {
    const TEXTURE = ".";
    boardPrint = boardPrint+TEXTURE;
    return boardPrint;
  }

  drop(block) {
    if (this.block) throw("already falling");
    this.block = block;
    this.blockPositionRow = 0;
    this.blockPositionColumn = 1;
    this.fallingBlock = true;
  };

  hasFalling() {
    return this.fallingBlock;
  }

  tick(block) {
    if (this.blockPositionRow < this.height-1) {
      this.blockPositionRow +=1;
    }
    else {
      this.fallingBlock = false;
    }
  };

  

}