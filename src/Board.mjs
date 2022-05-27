export class Board {
  width;
  height;
 
  blocks =[];
 
  fallingBlock;
  fallingBlockId;
  fallingBlockPositions = new Map();

  horizontalCenterPosition;

  
  blockPositionsOnBoard = new Map();

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

    //bugger, what is this situation. Seems like tests are unfortunately not dropping new instances of blocks
    //but a static - common - block and thus modification to one are carried over to next one, f.e.
    //related to positions, what can we even do here to get through this terrible mess?

    //block.calculatePositionsOnBoard(0, this.horizontalCenterPosition);
    //let numberOfBlock = blocks.length;
    //this.fallingBlockId = numberOfBlock;
    this.fallingBlockId = this.blocks.length;

    //let boardPositionsForOneBlock = this.calculatePositionsOnBoard(0, block)
    this.fallingBlockPositions = this.calculatePositionsOnBoard(0, block)
    
    //console.log('CALCULATED POSITIONS AFTER DROP:', block.boardPositions)
    console.log('CALCULATED POSITIONS AFTER DROP:', this.fallingBlockPositions)
    //this.blockPositionsOnBoard.set(numberOfBlock, boardPositionsForOneBlock)

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

    //do not even run tick if there is no falling block
    if (this.fallingBlock) {

    //console.log('board positions of falling block before pushing donw',this.fallingBlock.boardPositions)
    //console.log('board positions of falling block before pushing donw', boardPositions.get())
    console.log('board positions of falling block before pushing donw', this.fallingBlockPositions)
    let pushShapeOneStepDown = this.pushShapeOneStepDown(this.fallingBlock)
    console.log('pushShapeOneStepDown',this.fallingBlock.icon, pushShapeOneStepDown)
    if (this.isThereSpaceBelowBlock(pushShapeOneStepDown)) {
      //this.fallingBlock.positionRow += 1;
      
      //this.fallingBlock.boardPositions = pushShapeOneStepDown;
      this.fallingBlockPositions = pushShapeOneStepDown;

      //console.log('this.fallinbBlock.highestYContainingShapePattern',this.fallingBlock.highestYContainingShapePattern)
      //this.fallingBlock.highestYContainingShapePattern++;
      this.highestYContainingShapePattern++;
      //console.log('this.fallinbBlock.highestYContainingShapePattern',this.fallingBlock.highestYContainingShapePattern)
      //this.fallingBlock = pushShapeOneStepDown;
  
    //else if (!this.hasBlockReachedTheBottom()) {      
    }
    else {
      console.log('BLOCK REACHED THE LIMIT')
      //i think we should make a copy of this object - seems like this is a static common object and without any extra
      //tweaks we would be overriding data related to this later when starting to handle the next "instance" of a shape...
      //alright, probably the purpose of the tests was to guide us developers to not mix boardpositions data with shapes
      //and not to implement such terrible mess i have been producing all week long. 
      //so...lets see if boardpositios could be somehow refactored to board and away from shape....
      this.blocks.push(this.fallingBlock);
      this.fallingBlock = "";    
      this.blockPositionsOnBoard.set(this.fallingBlockId, this.fallingBlockPositions);
      this.fallingBlockId = "";
    }
  }
  };


  tickLeft() {
    if (this.fallingBlock) {
      this.fallingBlockPositions = this.pushShapeOneStepLeft();
    }
  }

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
    //if (this.fallingBlock.highestYContainingShapePattern < this.height-1) {
    if (this.highestYContainingShapePattern < this.height-1) {
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
        console.log('how many other fallen blocks: ',this.blocks.length)
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
      //if (this.blockIsAtThisPosition(i,j, block)) {
      if (this.blockIsAtThisPosition(i,j, b)) {
        return b;
        //return 
      }
    }
    return -1
  }

  //blockIsAtThisPosition(x,y, block) {
  //blockIsAtThisPosition(y,x, block) {
  blockIsAtThisPosition(y,x, blockId) {
    //console.log("at blockis at this positions");
    //console.log(block.boardPositions)

    //return (block.boardPositions.get(x) && block.boardPositions.get(x) === y)
    //let block = 
    //let xCoordinatesAtY = block.boardPositions.get(y);
    //console.log("BEFORE ERROR:",this.blockPositionsOnBoard.get(blockId))
    //console.log()
    let xCoordinatesAtY = null;
    let coordinates = this.blockPositionsOnBoard.get(blockId);
    if (coordinates) {
      xCoordinatesAtY= coordinates.get(y);
    }
    //if nothing was found with blockId try current falling block
    else {
      xCoordinatesAtY = this.fallingBlockPositions.get(y);
    }
    
    //console.log("xCoordinatesAtY", xCoordinatesAtY)

    //let isBlockPartlyAtThisPosition = (xCoordinatesAtY && xCoordinatesAtY.includes(x));
    let isBlockPartlyAtThisPosition = false;
    if (xCoordinatesAtY && xCoordinatesAtY.includes(x)) {
      isBlockPartlyAtThisPosition= true;
    }
    //console.log('isBlockPartlyAtThisPosition', isBlockPartlyAtThisPosition)
    
    return isBlockPartlyAtThisPosition
  }

  /*
  findAnotherShapeJustBelow() {
    //const ONE_BELOW = 1
    if (this.blocks.length > 0) {
      return this.findBlock(this.blocks, this.fallingBlock.positionRow+ONE_BELOW, this.fallingBlock.positionColumn) 
    }
  }
*/
  
  pushShapeOneStepDown() {
    let oneStepDownPositions = new Map();
    //block.boardPositions.forEach((value,key,map) => {
    //block.boardPositions.forEach((value,key) => {
    this.fallingBlockPositions.forEach((value,key) => {
      //oneStepDownBlock.set(key, value +1)
      //const newArr = value.map(xCoordinate => xCoordinate + 1);
      oneStepDownPositions.set(key+1, value)
    })

    //console.log(block.boardPositions)
    return oneStepDownPositions;
  }

  pushShapeOneStepLeft() {
    let oneStepLeftPositions = new Map();
    //block.boardPositions.forEach((value,key,map) => {
    //block.boardPositions.forEach((value,key) => {
    this.fallingBlockPositions.forEach((value,key) => {
      //oneStepDownBlock.set(key, value +1)
      //const newArr = value.map(xCoordinate => xCoordinate + 1);
      let leftPushedXCoordinates = value.map(xCoordinate => xCoordinate-1)
      //oneStepLeftPositions.set(key, value-1)
      oneStepLeftPositions.set(key, leftPushedXCoordinates)
    })

    //console.log(block.boardPositions)
    return oneStepLeftPositions;
  }



    /**
     * TODO:this does not work at all with those bloody Ts that contain even number of textures and 
     * .f.e. this bloody  .** does not work at all seemingly?
     *                    .**
     *                    ...
     * @param {*} row how many steps down has shape already fallen since drop. If just dropped this value is zero.
     * @param {*} boardHorizontalCenter 
     */
    //calculatePositionsOnBoard(row, boardHorizontalCenter) {
    calculatePositionsOnBoard(row, block) {
      //for (let w = this.width-1; w>=0; w--) {
      let howManyEmptyRowsBeforeShapeContent = 0;
      let atLeastOneResultOnLine = false;

      //let highestYContainingShapePattern = 0;
      this.highestYContainingShapePattern = 0;

      let boardPositions = new Map();
      //console.log("this boardpositions before calculating them on drop",this.boardPositions)
      //initialize boardpositions as it seems like otherwise these gets messed up between "different" blocks
      //as tests seem not to create a new instance of a block when "a new" block is being dropped....
      //..but this would clear data from prev T ....not working solution either....
      //this.boardPositions = new Map();
      //for (let h = 0; h<this.height; h++) {

      for (let h = 0; h<block.height; h++) {
        atLeastOneResultOnLine = false;

        //for (let w = 0; w<this.width; w++) {
        for (let w = 0; w<block.width; w++) {
          //TODO:but this does not work either i guess? We would be manipulating common static matrix here, so this might
          //be related to previous T state?...oh what a mess...so we would need to extract this data to board as well or some
          //other refa, oh bugger.
          //if (this.matrix[h][w] === this.icon) {
          if (block.matrix[h][w] === block.icon) {
            
            console.log("atLeastOneResultOnLine")
            atLeastOneResultOnLine = true
            
            let boardXCoordinate;
            //let shapeXCoordinate = w+1;
            //let distanceToCenter = this.shapeHorizontalCenter - (w+1)
            //let distanceToCenter = this.shapeHorizontalCenter - w
            let distanceToCenter = block.shapeHorizontalCenter - w

            //if (distanceToCenter > 0 ) {
            //this works as when distanceToCenter is negative, there will be double negative, making it a + operation,
            if (distanceToCenter !== 0 ) {
              //boardXCoordinate = boardHorizontalCenter-distanceToCenter
              boardXCoordinate = this.horizontalCenterPosition-distanceToCenter
            }
            else {
              //boardXCoordinate = boardHorizontalCenter;
              boardXCoordinate = this.horizontalCenterPosition;
            }
            //we have to do some nonsense plumbing as test shape strings containt those bloody nonsense dots around those real shape patterns.
            let boardYCoordinate = row+(h-howManyEmptyRowsBeforeShapeContent)

            //this.highestYContainingShapePattern = boardYCoordinate
            this.highestYContainingShapePattern = boardYCoordinate

            //let xCoordinates = this.boardPositions.get(boardYCoordinate)
            //let xCoordinates = block.boardPositions.get(boardYCoordinate)
            let xCoordinates = boardPositions.get(boardYCoordinate)
            if (!xCoordinates)  {
              xCoordinates = []
            }

            xCoordinates.push(boardXCoordinate)
            //boardPositions.set(boardYCoordinate, boardXCoordinate)
            //this.boardPositions.set(boardYCoordinate, xCoordinates)
            //block.boardPositions.set(boardYCoordinate, xCoordinates)
            console.log('pushing this to board positions:', boardYCoordinate, boardXCoordinate)
            boardPositions.set(boardYCoordinate, xCoordinates)
          }        
        }
        if (!atLeastOneResultOnLine) {
          howManyEmptyRowsBeforeShapeContent++
        }
      }

      //console.log("READY boardpositoins at rotating shape:"+this.boardPositions)
      //console.log("READY boardpositoins at rotating shape:",this.boardPositions)
      //console.log("READY boardpositoins at rotating shape:",block.boardPositions)
      console.log("READY boardpositoins at rotating shape:",boardPositions)

      return boardPositions;
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