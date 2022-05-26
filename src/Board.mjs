export class Board {
  width;
  height;
 
  blocks =[];
 
  fallingBlock;

  horizontalCenterPosition;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.horizontalCenterPosition = this.calculateBoardHorizontalCenterPosition();
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
          let blockAtCurrentPosition = this.findBlock(allBlocks, i, j);
          if (blockAtCurrentPosition >= 0) {
              boardPrint = boardPrint+allBlocks[blockAtCurrentPosition].icon;
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
  console.log('boardprint:', boardPrint);
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
    //block.positionColumn = 1;
    //block.positionColumn = this.calculateBoardHorizontalCenterPosition(block)
    block.positionColumn = this.horizontalCenterPosition;
    block.calculatePositionsOnBoard(0, this.horizontalCenterPosition);

    //console.log(block.positionColumn)
    this.fallingBlock = block;
  };

  calculateBoardHorizontalCenterPosition() {
    let centerHorizontal = Math.floor(this.width/2);
    if (this.width%2 === 0) {
      centerHorizontal--;
    }
    return centerHorizontal;
  }

  hasFalling() {
    return this.fallingBlock ? true: false;
  }

  tick() {
    if (this.isThereSpaceBelowBlock()) {
      this.fallingBlock.positionRow += 1;
  
    //else if (!this.hasBlockReachedTheBottom()) {      
    }
    else {
      this.blocks.push(this.fallingBlock);
      this.fallingBlock = "";
    }
  };

  isThereSpaceBelowBlock() {
    if (!(this.findAnotherBlockJustBelow() >= 0) && 
      !this.hasReachedBottomBoardEdge()) {
    return true;
  }
    return false;
  }

  hasReachedBottomBoardEdge() {
    if (this.fallingBlock.positionRow < this.height-1) {
      return false;
    }
    return true;
  }

  findAnotherBlockJustBelow() {
    const ONE_BELOW = 1
    if (this.blocks.length > 0) {
      return this.findBlock(this.blocks, this.fallingBlock.positionRow+ONE_BELOW, this.fallingBlock.positionColumn) 
    }
  }

  findBlock(allBlocks, i, j) {
    for (let b=0; b<allBlocks.length; b++) {
      let block = allBlocks[b];
      if (block.positionRow === i && block.positionColumn === j) {        

      //if (block.boardPositions.get(i) && block.boardPositions.get(i) === j) {
        return b;
      }
    }
    return -1
  }

  //miten logiikka oikein menee?
  /* 
    -lasketaan koko shapen leveys?
    -lasketaan kok oshapen korkeus?
      -jos löytyy keskikohta leveydessä
          -

    -kelataan ekaksi sille riville kuvaajaan mistä löytyy tekstuuria.

    -keskitytään ainoastaan tekstuuriosaan shapessa?
      -lasketaan koko shapen leveys?
      -lasketaan koko shapen korkeus?

        -navigoidaan tekstuuriosan keskikohtaan ekalla sellaisella rivillä millä tekstuuria
      -oli shape mikä hyvänsä, niin potentiiaalisesti sen max leveyden ja max korkeuden
      kuutio voi sisältää tekstuuria missä vaan koordinaatissa
        -iteroidana korkeuden mukaan (tarvitana korkeus)
            -meillä on kuution leveys - sen alku ja loppupiste
              -jokaisella rivillä tarkistetaan kuutio leveydeältä tekstuurimatchit
                  -mihin matchi mäpätään boardilla?
                      -tiedetään boardin keskikohta mihin halutaan shapen keskikohta tulevan
                          -





  */

                          

  /*
  calculateBlockCoordinatesOnBoard(row, column, block) {
    if (block.matrix) {
      let shapePartFound = false;
      let matrix = block.matrix;
      for (let w = this.width-1; w>=0; w--) {
        for (let h = 0; h<this.height; h++) {
          shapePrint += m[h][w];
        }
     
      for (let i=0; i<matrix[])

    }
  }*/


    //block is instnace of RotatingShape
  //  block knows its own width, height and has matrix. Id corresponds to the "string pattern" the shape is made of.
  //  ...and by block width and height we mean the whole width and height of the shape including the nonsens ... dots
  // that have been used around the actual shape to make it a rectanglish shape.
  // but of course, we are basically only interested in the actual content of the shape drawn using the ID values.

  /*
  calculateWidthOfBlock(block) {


  }
  */

    /*
    this.calculateDropPosition(block) {
      let centerHorizontal = Math.floor(this.width/2);
      if (this.width%2 === 0) {
        centerHorizontal--;
      }
      return centerHorizontal;
    }
    */

  }

//}