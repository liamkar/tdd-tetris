export class Board {
  width;
  height;
 
  block;
  blockPositionRow;
  blockPositionColumn;
 

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
    this.block = block;
    this.blockPositionRow = 0;
    this.blockPositionColumn = 1;
  };

  tick(block) {
    this.blockPositionRow +=1;
  }
}