import { Movement } from "../src/Movement.mjs";
import { Utils } from "./Utils.mjs";

export class Board {
  width;
  height;
 
  blocks =[];
 
  fallingBlock;
  fallingBlockId;
  fallingBlockPositions = new Map();

  horizontalCenterPosition;
  
  blockPositionsOnBoard = new Map();
  

  directions = Movement.Directions;

  highestYContainingShapePattern;
  lowestXContainingShapePattern;
  biggestXContainingShapePattern;

  //the x, y co
  fallingBlockTopLeftCornerCoordinatesOnBoard = []
  //blockRotationsOnBoard = new Map();

  constructor(width, height) {
    this.width = width;
    this.height = height;
    //this.horizontalCenterPosition = this.calculateBoardHorizontalCenterPosition();
    this.horizontalCenterPosition = Utils.calculateItemHorizontalCenterPosition(this.width);
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
    //this.fallingBlockPositions = this.calculatePositionsOnBoard(0,0, block)
    let xCoordinateDrawStartPoint = this.initializeFallingBlockTopLeftCornerXCoordinateOnBoard(block)
    this.fallingBlockPositions = this.calculatePositionsOnBoard(0, xCoordinateDrawStartPoint, block)

    let minMaxData = this.readMinMaxXYCoordinatesInBlockPrint(this.fallingBlockPositions);
    this.setMinMaxXYCoordinates(minMaxData)

    this.fallingBlockTopLeftCornerCoordinatesOnBoard = [0,xCoordinateDrawStartPoint]
    
    //console.log('CALCULATED POSITIONS AFTER DROP:', block.boardPositions)
    console.log('CALCULATED POSITIONS AFTER DROP:', this.fallingBlockPositions)
    //this.blockPositionsOnBoard.set(numberOfBlock, boardPositionsForOneBlock)

    //console.log(block.positionColumn)
    this.fallingBlock = block;
  };

  setMinMaxXYCoordinates(coordinates) {
    this.lowestXContainingShapePattern = coordinates.lowestXContainingShapePattern;
    this.biggestXContainingShapePattern = coordinates.biggestXContainingShapePattern;
    this.highestYContainingShapePattern = coordinates.highestYContainingShapePattern;
  }

  readMinMaxXYCoordinatesInBlockPrint(blockPositions) {
    //blockPositions.keys().
    
    let minMaxCoordinates = {}

    //this.highestYContainingShapePattern = Math.max(...blockPositions.keys());
    minMaxCoordinates.highestYContainingShapePattern = Math.max(...blockPositions.keys());

    /*
    //blockPositions.values
    let tempValues = blockPositions.values()
    console.log('tempValues', tempValues)
    let allValues = Array.from(...blockPositions.values())
    //let allValues = blockPositions.values()
    //let allvalues = (...[].concat(...blockPositions.values()))

    allValues.
    */

    let minX;
    let minXDefined = false;
    let maxX;
    let maxXDefined = false;


    blockPositions.forEach(value => {
      //console.log(value);
      value.forEach(x => {
        //console.log(x);
        if (!minXDefined || x < minX) {
          minXDefined = true;
          minX = x;
        }
        if (!maxXDefined || x > maxX) {
          maxXDefined = true;
          maxX = x;
        }
      })

    })

    /*
    console.log('allValues', allValues)
    let minX;
    let minXDefined = false;
    let maxX;
    let maxXDefined = false;
    //allValues.forEach(xCoordinates => {
    allValues.forEach(x => {
      //console.log('xCoordinates:', xCoordinates)
      //xCoordinates.forEach(x => {
        if (!minXDefined || x < minX) {
          minXDefined = true;
          minX = x;
        }
        if (!maxXDefined || x > maxX) {
          maxXDefined = true;
          maxX = x;
        }
      //})
    })
*/
    /*
    this.lowestXContainingShapePattern;
    this.biggestXContainingShapePattern;
    */

    minMaxCoordinates.lowestXContainingShapePattern = minX;
    minMaxCoordinates.biggestXContainingShapePattern = maxX;

    return minMaxCoordinates;
  }

  initializeFallingBlockTopLeftCornerXCoordinateOnBoard(block) {
    //let xCoordinate = this.horizontalCenterPosition - block.width;


    console.log('this.horizontalCenterPosition',this.horizontalCenterPosition)
    console.log('block.shapeHorizontalCenter',block.shapeHorizontalCenter)
    let xCoordinate = this.horizontalCenterPosition - block.shapeHorizontalCenter;
    return xCoordinate;
  }

  updateFallingBlockTopLeftCornerCoordinatesOnBoard(direction) {
    //let xCoordinate = this.horizontalCenterPosition - block.width;
    let y = this.fallingBlockTopLeftCornerCoordinatesOnBoard[0];
    let x = this.fallingBlockTopLeftCornerCoordinatesOnBoard[1];
    if (direction === Movement.Directions.Down) {
      this.fallingBlockTopLeftCornerCoordinatesOnBoard[0] = y+1;
    }
    if (direction === Movement.Directions.Right) {
      this.fallingBlockTopLeftCornerCoordinatesOnBoard[1] = x+1;
    }
    if (direction === Movement.Directions.Left) {
      this.fallingBlockTopLeftCornerCoordinatesOnBoard[1] = x-1;
    }
  }

  rotate(direction) {
    //dont do rotation if no actual rotations can happen for the shape.
    console.log("fallingBlockPositions before rotate:",this.fallingBlockPositions);
    if (this.fallingBlock.orientationCount > 0) {
      let nextRotation = this.fallingBlock.rotate(direction);
      //TODO:but how on earth we connect this to the current position on board?
      //well, I guess, we have to keep track somehow where our block is - yes we already have the dots in store
      //that we have to draw, but we also need to store x y coordinate on board for fallingBlock to be able to reach
      //for that position to be able the re-draw it after rotate.
      //so, let's first try start storing this x,y coordinate

      console.log('nextRotation:',nextRotation.toString());

            //calculate new board printing coordinates according to new rotation
            let yCoordinate = this.fallingBlockTopLeftCornerCoordinatesOnBoard[0];
      
            //let xCoordinate = this.fallingBlockTopLeftCornerCoordinatesOnBoard[1];
            //basically, shouldnt we initialize the x after rotate?...but we can't...it might be moved by user as well
            //actually, we should adjust it based on the difference cause by rotation, oh bugger this is getting hard.
            //other alternative might be to adjust situation at drawing phase, but how would it work?
            //...let's leave it here for now, its just getting way too complicated.
            let xCoordinate = this.fallingBlockTopLeftCornerCoordinatesOnBoard[1];
      


      console.log('JUST BEFORE CALCULATING NEW POSITIONS AFTER ROTATE')
      let rotatedBlockPositionsOnBoard = this.calculatePositionsOnBoard(yCoordinate, xCoordinate, nextRotation);
      let minMaxData = this.readMinMaxXYCoordinatesInBlockPrint(rotatedBlockPositionsOnBoard);
      //setMinMaxXYCoordinates(minMaxData)

      console.log('just before check has rotation broke over edges')
      console.log(this.lowestXContainingShapePattern)
      console.log(this.fallingBlockPositions);
      console.log('minMaxData',minMaxData)
      if (!this.hasBrokenOutOfEdge(minMaxData)) {
        console.log('ROTATION FITS TO BOARD!',minMaxData)


      //if (this.lowestXContainingShapePattern >= 0 && this.high)

      //lets clear previous board print coordinates after rotation 
      //this.blockPositionsOnBoard.delete(this.fallingBlockId);


      
      console.log('rotatedBlockPositionsOnBoard', rotatedBlockPositionsOnBoard)
      //this.blockPositionsOnBoard.set(this.fallingBlockId, rotatedBlockPositionsOnBoard);
      this.fallingBlockPositions = rotatedBlockPositionsOnBoard;
      this.fallingBlock = nextRotation;
      //this.falligBlockRo
      this.setMinMaxXYCoordinates(minMaxData)
      }
  }

     

  }

  /*
  calculateBoardHorizontalCenterPosition() {
    let centerHorizontal = Math.floor(this.width/2);
    if (this.width%2 === 0) {
      centerHorizontal--;
    }
    return centerHorizontal;
  }
  */

  hasFalling() {
    return this.fallingBlock ? true: false;
  }


  //by default tick moves one step down
  tick(direction=this.directions.Down) {

    //do not even run tick if there is no falling block
    if (this.fallingBlock) {

    let nextShapePosition = this.pushShapeOneStep(direction);
    console.log('next shep position after tick',this.fallingBlock.icon, nextShapePosition)

    if (this.isThereSpaceToMove(nextShapePosition, direction)) {

      this.fallingBlockPositions = nextShapePosition;
      this.updateFallingBlockTopLeftCornerCoordinatesOnBoard(direction);

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

      //move block from falling status to falled status only if the operation reaching the end was Down-movement.
      //so let's NOT stop falling if reached the edges of the area.
      if (direction === this.directions.Down) {
        this.blocks.push(this.fallingBlock);
        this.fallingBlock = "";    
        this.blockPositionsOnBoard.set(this.fallingBlockId, this.fallingBlockPositions);
        this.fallingBlockId = "";
      }
    }
  }
  };

  isThereSpaceToMove(pushShapeOneStepDown, direction) {
    //if (!(this.isAnotherBlockOnTheWay(pushShapeOneStepDown)) && 
        //!this.hasReachedEdge(direction)) {
    let spaceAvailable = true;
    if (this.isAnotherBlockOnTheWay(pushShapeOneStepDown) || this.hasReachedEdge(direction)) {
      spaceAvailable = false;
    }
    return spaceAvailable;
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

  hasBrokenOutOfEdge(minMaxCoordinates) {
    /*
    if (this.highestYContainingShapePattern >= this.height ||
      this.lowestXContainingShapePattern < 0 ||
      this.biggestXContainingShapePattern >= this.width)
    {
      */

    console.log(this.height)
    console.log(this.width)
    if (minMaxCoordinates.highestYContainingShapePattern >= this.height ||
      minMaxCoordinates.lowestXContainingShapePattern < 0 ||
      minMaxCoordinates.biggestXContainingShapePattern >= this.width) {
      return true;
    }
    return false;
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

  fallingBlockTopLeftCornerCoordinatesOnBoard

    /**
     * TODO:this does not work at all with those bloody Ts that contain even number of textures and 
     * .f.e. this bloody  .** does not work at all seemingly?
     *                    .**
     *                    ...
     * @param {*} row how many steps down has shape already fallen since drop. If just dropped this value is zero.
     * @param {*} boardHorizontalCenter 
     */
    //calculatePositionsOnBoard(row, boardHorizontalCenter) {
    //calculatePositionsOnBoard(row, block) {
    calculatePositionsOnBoard(row, column, block) {
      console.log('row', row)
      console.log('column', column)
      //for (let w = this.width-1; w>=0; w--) {
      
      let howManyEmptyRowsBeforeShapeContent = 0;
            
      let atLeastOneResultOnLine = false;

/*
      //let highestYContainingShapePattern = 0;
      this.highestYContainingShapePattern = 0;
      let lowestXDefined = false;

      //i guess defining these here is bad coding pratice: functino does more than one thing now..
      this.lowestXContainingShapePattern = -1;
      this.biggestXContainingShapePattern = -1;
*/

      let boardPositions = new Map();

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
            
            
            let boardXCoordinate = column+w
            
            /*
            let boardXCoordinate;
            let distanceToCenter = block.shapeHorizontalCenter - w
            if (distanceToCenter !== 0 ) {
              boardXCoordinate = column-distanceToCenter
            }
            else {             
              boardXCoordinate = column;
            }
*/
            /*
            let boardXCoordinate;
            //let shapeXCoordinate = w+1;
            //let distanceToCenter = this.shapeHorizontalCenter - (w+1)
            //let distanceToCenter = this.shapeHorizontalCenter - w
            let distanceToCenter = block.shapeHorizontalCenter - w

            //if (distanceToCenter > 0 ) {
            //this works as when distanceToCenter is negative, there will be double negative, making it a + operation,
            if (distanceToCenter !== 0 ) {
              //boardXCoordinate = boardHorizontalCenter-distanceToCenter
              //boardXCoordinate = this.horizontalCenterPosition-distanceToCenter
              boardXCoordinate = column-distanceToCenter
            }
            else {
              //boardXCoordinate = boardHorizontalCenter;
              //boardXCoordinate = this.horizontalCenterPosition;
              boardXCoordinate = column;
            }
            */
            //we have to do some nonsense plumbing as test shape strings containt those bloody nonsense dots around those real shape patterns.
            //strips out the empty rows in RotatingShape Object and starts
            let boardYCoordinate = row+(h-howManyEmptyRowsBeforeShapeContent)
            //let boardYCoordinate = row+h
            //let boardYCoordinate = row - howManyEmptyRowsBeforeShapeContent



/*
            //this.highestYContainingShapePattern = boardYCoordinate
            this.highestYContainingShapePattern = boardYCoordinate

            //if (this.lowestXContainingShapePattern < 0 || (this.lowestXContainingShapePattern >0 && boardXCoordinate < this.lowestXContainingShapePattern )){
            if (!lowestXDefined || boardXCoordinate < this.lowestXContainingShapePattern ){
              console.log('setting new lowest X:', boardXCoordinate)
              this.lowestXContainingShapePattern = boardXCoordinate;
              lowestXDefined= true;
            }


            if (this.biggestXContainingShapePattern < 0 || (this.biggestXContainingShapePattern > 0 && boardXCoordinate > this.biggestXContainingShapePattern )){
              console.log('setting new biggest X:', boardXCoordinate)
              this.biggestXContainingShapePattern = boardXCoordinate;
            }
*/



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