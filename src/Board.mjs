export class Board {
  width;
  height;
 
  blocks =[];
 
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    
    const NEW_LINE = "\n";

    let boardPrint =""

    let allBlocks = this.blocks;
    if (this.fallingBlock) {
      allBlocks = this.blocks.concat([this.fallingBlock])
    }

    for (let i=0; i<this.height; i++) {
      for (let j=0; j<this.width; j++) {
        if (allBlocks.length > 0) {
          for (let b=0; b<allBlocks.length; b++) {
            let block = allBlocks[b];
            if (block.positionRow === i && block.positionColumn === j) {
              boardPrint = boardPrint+block.icon;
            }
            else {
              boardPrint = this.addTextureToBoardPrint(boardPrint);
            }
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
    if (this.fallingBlock) throw("already falling");
    block.positionRow = 0;
    block.positionColumn = 1;
    this.fallingBlock = block;
  };

  hasFalling() {
    return this.fallingBlock ? true: false;
  }

  tick() {
    if (this.fallingBlock.positionRow < this.height-1) {
      this.fallingBlock.positionRow += 1;
    }
    else {
      this.blocks.push(this.fallingBlock);
      this.fallingBlock = "";
    }
  };

}