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
    //block.positionColumn = 1;
    //block.positionColumn = this.calculateBoardHorizontalCenterPosition(block)
    //block.positionColumn = this.horizontalCenterPosition;
    block.calculatePositionsOnBoard(0, this.horizontalCenterPosition);

    console.log('CALCULATED POSITIONS AFTER DROP:', block.boardPositions)

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

    let pushShapeOneStepDown = this.pushShapeOneStepDown(this.fallingBlock)
    console.log('pushShapeOneStepDown',pushShapeOneStepDown)
    if (this.isThereSpaceBelowBlock(pushShapeOneStepDown)) {
      //this.fallingBlock.positionRow += 1;
      this.fallingBlock.boardPositions = pushShapeOneStepDown;
      console.log('this.fallinbBlock.highestYContainingShapePattern',this.fallingBlock.highestYContainingShapePattern)
      this.fallingBlock.highestYContainingShapePattern++;
      console.log('this.fallinbBlock.highestYContainingShapePattern',this.fallingBlock.highestYContainingShapePattern)
      //this.fallingBlock = pushShapeOneStepDown;
  
    //else if (!this.hasBlockReachedTheBottom()) {      
    }
    else {
      console.log('BLOCK REACHED THE LIMIT')
      this.blocks.push(this.fallingBlock);
      this.fallingBlock = "";
    }
  };

  isThereSpaceBelowBlock(pushShapeOneStepDown) {
    //if (!(this.findAnotherBlockJustBelow(pushShapeOneStepDown) >= 0) && 
    if (!(this.findAnotherBlockJustBelow(pushShapeOneStepDown)) && 
      !this.hasReachedBottomBoardEdge()) {
      //!this.hasReachedBottomBoardEdge(pushShapeOneStepDown)) {
    return true;
  }
    return false;
  }

  hasReachedBottomBoardEdge() {
  //hasReachedBottomBoardEdge(pushShapeOneStepDown) {
    //pushShapeOneStepDown.boardPositions.keys()
    //let keys =[ ...pushShapeOneStepDown.boardPositions.keys() ];
    //const max = Math.max(...arr);

    //if (this.fallingBlock.positionRow < this.height-1) {
    //we add +1 here to check against the next y coordinate if shape would drop one step down.
    //if (this.fallingBlock.highestYContainingShapePattern+1 < this.height-1) {
    console.log('this.fallingBlock at bottom check',this.fallingBlock)
    if (this.fallingBlock.highestYContainingShapePattern < this.height-1) {
    //if (this.fallingBlock.boardPositionspositionRow < this.height-1) {
      return false;
    }
    return true;
  }

  findAnotherBlockJustBelow(pushShapeOneStepDown) {
    /*
    const ONE_BELOW = 1
    if (this.blocks.length > 0) {
      return this.findBlock(this.blocks, this.fallingBlock.positionRow+ONE_BELOW, this.fallingBlock.positionColumn) 
    }
    */
    if (this.blocks.length > 0) {
      console.log('just before calling checkConflictWithAnotherShape')
      return this.checkConflictWithAnotherShape(pushShapeOneStepDown)
    }
  }

  //checkConflictWithAnotherShape(shapeInNextPosition) {
  checkConflictWithAnotherShape(nextBoardPositions) {
    //let nextBoardPositions = shapeInNextPosition

    //let yCoordinates =[ ...pushShapeOneStepDown.boardPositions.keys() ];
    let yCoordinates =[ ...nextBoardPositions.keys() ];
    console.log('yCoordinates', yCoordinates)
    let atLeastOneOtherShapePositionConflict =  yCoordinates.some(y => {
      let xCoordinates = nextBoardPositions.get(y);
      console.log('xCoordinates in some loop', xCoordinates)
      //return xCoordinates.some(x => {
      let foundOne = xCoordinates.some(x => {
        console.log('THE OTHER FALLEN BLOCK: ',this.blocks[0].boardPositions)
        return (this.findBlock(this.blocks, y, x) >= 0)
      })
      console.log('foundOne', foundOne)
      return foundOne;
    });

    console.log('atLeastOneOtherShapePositionConflict', atLeastOneOtherShapePositionConflict)
    return atLeastOneOtherShapePositionConflict
/*
    nextBoardPositions.forEach((xCoordinates, y) => {
      xCoordinates.forEach(x => {
        this.findBlock(this.blocks, y, x) {
        }      
      })
    });
*/
  }

  findBlock(allBlocks, i, j) {
    for (let b=0; b<allBlocks.length; b++) {
      let block = allBlocks[b];
      //if (block.positionRow === i && block.positionColumn === j) {        

      //if (block.boardPositions.get(i) && block.boardPositions.get(i) === j) {
      //if  (block.blockIsAtThisPosition(i, j)) {
      if (this.blockIsAtThisPosition(i,j, block)) {
        return b;
        //return 
      }
    }
    return -1
  }

  //blockIsAtThisPosition(x,y, block) {
  blockIsAtThisPosition(y,x, block) {
    //console.log("at blockis at this positions");
    //console.log(block.boardPositions)

    //return (block.boardPositions.get(x) && block.boardPositions.get(x) === y)
    let xCoordinatesAtY = block.boardPositions.get(y);
    //console.log("xCoordinatesAtY", xCoordinatesAtY)

    //let isBlockPartlyAtThisPosition = (xCoordinatesAtY && xCoordinatesAtY.includes(x));
    let isBlockPartlyAtThisPosition = false;
    if (xCoordinatesAtY && xCoordinatesAtY.includes(x)) {
      isBlockPartlyAtThisPosition= true;
    }
    //console.log('isBlockPartlyAtThisPosition', isBlockPartlyAtThisPosition)
    
    return isBlockPartlyAtThisPosition
  }

  findAnotherShapeJustBelow() {
    //const ONE_BELOW = 1
    if (this.blocks.length > 0) {
      return this.findBlock(this.blocks, this.fallingBlock.positionRow+ONE_BELOW, this.fallingBlock.positionColumn) 
    }
  }

  
  pushShapeOneStepDown(block) {
    let oneStepDownPositions = new Map();
    //block.boardPositions.forEach((value,key,map) => {
    block.boardPositions.forEach((value,key) => {
      //oneStepDownBlock.set(key, value +1)
      //const newArr = value.map(xCoordinate => xCoordinate + 1);
      oneStepDownPositions.set(key+1, value)
    })

    //console.log(block.boardPositions)
    return oneStepDownPositions;
  }

  /*
  boardContainsBlockOnPosition(block, x, y) {

  }
  */

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