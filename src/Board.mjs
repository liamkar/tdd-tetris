import { Movement } from "../src/Movement.mjs";

export class Board {
  width;
  height;
 
  blocks =[];
 
  fallingBlock;
  fallingBlockId;
  fallingBlockPositions = new Map();

  horizontalCenterPosition;
  
  blockPositionsOnBoard = new Map();
  blockRotationsOnBoard = new Map();

  directions = Movement.Directions;

  highestYContainingShapePattern;
  lowestXContainingShapePattern;
  biggestXContainingShapePattern;

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


  tick(direction=this.directions.Down) {

    //do not even run tick if there is no falling block
    if (this.fallingBlock) {

    let nextShapePosition = this.pushShapeOneStep(direction);
    console.log('pushShapeOneStepDown',this.fallingBlock.icon, nextShapePosition)

    if (this.isThereSpaceToMove(nextShapePosition, direction)) {

      this.fallingBlockPositions = nextShapePosition;

        if (direction === this.directions.Right) {

          this.biggestXContainingShapePattern++  
          console.log('biggestXContainingShapePattern', this.biggestXContainingShapePattern)
        }
        else if (direction === this.directions.Down) {
          this.highestYContainingShapePattern++;
        }
        else { //left case
          this.lowestXContainingShapePattern--
        }
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

  isThereSpaceToMove(pushShapeOneStepDown, direction) {
    if (!(this.isAnotherBlockOnTheWay(pushShapeOneStepDown)) && 
        !this.hasReachedEdge(direction)) {
    return true;
  }
    return false;
  }

  hasReachedEdge(direction) {
    let edgeReached = false;
    if (direction === this.directions.Down) {
      if (this.highestYContainingShapePattern === this.height-1) {
        edgeReached =true;
      }
    }
    else if (direction === this.directions.Left) {
      if (this.lowestXContainingShapePattern === 0) {
        edgeReached = true;
      }
    }
    else {
      if (this.biggestXContainingShapePattern >= this.width-1) {
        edgeReached = true;
      }      
    }
    return edgeReached;
  }


  isAnotherBlockOnTheWay(pushShapeOneStepDown) {
    if (this.blocks.length > 0) {
      console.log('just before calling checkConflictWithAnotherShape')
      return this.checkConflictWithAnotherShape(pushShapeOneStepDown)
    }
  }


  checkConflictWithAnotherShape(nextBoardPositions) {
    let yCoordinates =[ ...nextBoardPositions.keys() ];
    console.log('yCoordinates', yCoordinates)
    let atLeastOneOtherShapePositionConflict =  yCoordinates.some(y => {
      let xCoordinates = nextBoardPositions.get(y);
      console.log('xCoordinates in some loop', xCoordinates)
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
  }

  findBlock(allBlocks, i, j) {
    for (let b=0; b<allBlocks.length; b++) {
      let block = allBlocks[b];
      if (this.blockIsAtThisPosition(i,j, b)) {
        return b;
      }
    }
    return -1
  }

  blockIsAtThisPosition(y,x, blockId) {
    let xCoordinatesAtY = null;
    let coordinates = this.blockPositionsOnBoard.get(blockId);
    if (coordinates) {
      xCoordinatesAtY= coordinates.get(y);
    }
    //if nothing was found with blockId try current falling block
    else {
      xCoordinatesAtY = this.fallingBlockPositions.get(y);
    }
    
    let isBlockPartlyAtThisPosition = false;
    if (xCoordinatesAtY && xCoordinatesAtY.includes(x)) {
      isBlockPartlyAtThisPosition= true;
    }
    
    return isBlockPartlyAtThisPosition
  }


  pushShapeOneStep(direction) {
    let oneStepPushPositions = new Map();
    this.fallingBlockPositions.forEach((value,key) => {

      let newYCoordinate = key;
      let newXCoordinates = value;
      if (direction === this.directions.Down) {
        newYCoordinate++;
      }
      else if (direction === this.directions.Left) {
        let leftPushedXCoordinates = value.map(xCoordinate => xCoordinate-1)
        newXCoordinates = leftPushedXCoordinates
      }
      else if (direction === this.directions.Right) {
        let rightPushedXCoordinates = value.map(xCoordinate => xCoordinate+1)
        newXCoordinates = rightPushedXCoordinates
      }
      oneStepPushPositions.set(newYCoordinate,newXCoordinates)
    })

    return oneStepPushPositions;
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
      this.lowestXContainingShapePattern = -1;
      this.biggestXContainingShapePattern = -1;

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

            if (this.lowestXContainingShapePattern < 0 || (this.lowestXContainingShapePattern >0 && boardXCoordinate < this.lowestXContainingShapePattern )){
              console.log('setting new lowest X:', boardXCoordinate)
              this.lowestXContainingShapePattern = boardXCoordinate;
            }


            if (this.biggestXContainingShapePattern < 0 || (this.biggestXContainingShapePattern > 0 && boardXCoordinate > this.biggestXContainingShapePattern )){
              console.log('setting new biggest X:', boardXCoordinate)
              this.biggestXContainingShapePattern = boardXCoordinate;
            }

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
  }