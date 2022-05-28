//import { times } from "lodash";

import { Movement } from "./Movement.mjs";

export class RotatingShape {
    shape;

    height;
    width;

    matrix;
    id;
    orientations = new Array(2);
    orientationCount;

    //the starting point of the shape
    //positionRow;
    //positionColumn;
    boardPositions = new Map();

    maxWidth;
    maxHeight;
    shapeHorizontalCenter;
    highestYContainingShapePattern;

    constructor(shape, id, orientationCount, maxWidth, maxHeight, currentOrientation=0, oldShape) {
    //constructor(shape, id, orientationCount, currentOrientation=0, oldShape) {
      this.shape = shape;
      let trimmedShape = this.shape.replaceAll(" ", "")
      let rowSplits = trimmedShape.split("\n");
      this.height = rowSplits.length;
      this.matrix = rowSplits.map(i => i.split(""))
      this.width = this.matrix[0].length;
      this.id = id;
      this.icon = id;
      this.currentOrientation = currentOrientation;
      this.orientationCount = orientationCount;
      this.orientations[currentOrientation] = shape;

      this.orientations[(currentOrientation ? 0 :1)] = oldShape;

      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;
      this.shapeHorizontalCenter = this.calculateShapeHorizontalCenterPosition();
    }

    /* console says this is not a function, WTF?
    blockIsAtThisPosition(x,y) {
      return (this.boardPositions.get(x) && this.boardPositions.get(x) === y)
    }
    */
    

    //TODO: mostly copy paste from Board - lets refa to some util class if really needed in multiple places.
    calculateShapeHorizontalCenterPosition() {
      let centerHorizontal = Math.floor(this.maxWidth/2);
      if (this.maxWidth%2 === 0) {
        centerHorizontal--;
      }
      return centerHorizontal;
    }

    /*äh, dont calculate, why not get these as init values?
    calculateMaxWidthAndHeightOfActualShape() {
      let maxWidth = 0;
      let maxHeight = 0;
      for (let w = 0; w<this.width; w++) {
        let atLeastOneMatchInRow = false;
        for (let h = 0; h<this.height; h++) {
          //shapePrint += m[h][w];
          if (m[w][h] === this.icon) {
            console.log()
            atLeastOneMatchInRow = true;
          }
        }
    }
    */

  
    /**
     * TODO:this does not work at all with those bloody Ts that contain even number of textures and 
     * .f.e. this bloody  .** does not work at all seemingly?
     *                    .**
     *                    ...
     * @param {*} row how many steps down has shape already fallen since drop. If just dropped this value is zero.
     * @param {*} boardHorizontalCenter 
     */
    /*
    calculatePositionsOnBoard(row, boardHorizontalCenter) {
      //for (let w = this.width-1; w>=0; w--) {
      let howManyEmptyRowsBeforeShapeContent = 0;
      let atLeastOneResultOnLine = false;

      let highestYContainingShapePattern = 0;
      console.log("this boardpositions before calculating them on drop",this.boardPositions)
      //initialize boardpositions as it seems like otherwise these gets messed up between "different" blocks
      //as tests seem not to create a new instance of a block when "a new" block is being dropped....
      //..but this would clear data from prev T ....not working solution either....
      //this.boardPositions = new Map();
      for (let h = 0; h<this.height; h++) {
        atLeastOneResultOnLine = false;

        for (let w = 0; w<this.width; w++) {
          if (this.matrix[h][w] === this.icon) {
            
            console.log("atLeastOneResultOnLine")
            atLeastOneResultOnLine = true
            
            let boardXCoordinate;
            //let shapeXCoordinate = w+1;
            //let distanceToCenter = this.shapeHorizontalCenter - (w+1)
            let distanceToCenter = this.shapeHorizontalCenter - w

            //if (distanceToCenter > 0 ) {
            //this works as when distanceToCenter is negative, there will be double negative, making it a + operation,
            if (distanceToCenter !== 0 ) {
              boardXCoordinate = boardHorizontalCenter-distanceToCenter
            }
                  else {
              boardXCoordinate = boardHorizontalCenter;
            }
            //we have to do some nonsense plumbing as test shape strings containt those bloody nonsense dots around those real shape patterns.
            let boardYCoordinate = row+(h-howManyEmptyRowsBeforeShapeContent)

            this.highestYContainingShapePattern = boardYCoordinate

            let xCoordinates = this.boardPositions.get(boardYCoordinate)
            if (!xCoordinates)  {
              xCoordinates = []
            }

            xCoordinates.push(boardXCoordinate)
            //boardPositions.set(boardYCoordinate, boardXCoordinate)
            this.boardPositions.set(boardYCoordinate, xCoordinates)
          }        
        }
        if (!atLeastOneResultOnLine) {
          howManyEmptyRowsBeforeShapeContent++
        }
      }

      //console.log("READY boardpositoins at rotating shape:"+this.boardPositions)
      console.log("READY boardpositoins at rotating shape:",this.boardPositions)
    }
*/
    toString() {
        return this.shape.replaceAll(" ", "")+"\n";

        //trying to get rid of ridiculous \n additions all over the place, but feeling the tests are forcing me to 
        //to use that nonsense...but most probably problem is in my terrible code
        /*
        let initialPrint = ""
        let print = this.matrix.reduce((prev, current) => (prev + current.join("")+"\n"), initialPrint);
        console.log(print);
        return print;
        */
    }

    /*
    rotateRight() {
      return this.rotateCommon(true);
    }
    */

    rotationIsValid() {
      //by 'O' we mean all squares - no matter how you rotate a square the shape will always be same - no effect.
      if (this.id === 'O')  {
        return false;
      }
      return true;
    }

    rotateSquareRight(width, height, m) {
      let shapePrint ="";

      for (let w = 0; w<width; w++) {
        for (let h = height-1; h>=0; h--) {
          shapePrint += m[h][w];
        }
        //TODO: how to get rid of this ridiculous \n plumbing?       
        if (w < width-1) {
          shapePrint += "\n";
        }
      }
      return shapePrint;
    }


    //rotateCommon(rotateRight) {
    rotate(direction) {
      let m = this.matrix;
      let width = this.width;
      let height = this.height;

      let rotateRight = false;
      if (direction === Movement.Directions.Right) {
        rotateRight = true;
      }

      /*
      return new RotatingShape(
        ""+m[0][width-1]  +m[1][width-1]        +m[2][width-1]+"\n"
          +m[0][width-2]  +m[1][width-2]        +m[2][width-2]+"\n"            
          +m[0][width-3]  +m[1][width-3]        +m[2][width-3]
      ) 
      */  
      let originalRotation = this.shape;
      let rotation = this.shape;
      let nextOrientation = 0;

      if (this.rotationIsValid()) {
         
      if (this.orientationCount === 2) {
        rotation = this.currentOrientation ? this.orientations[0] : this.orientations[1];
        if (!rotation) {
          //yes, major bubblegum, but if rotating this left here, we would end up having a new distinct kind of 
          //presentation, i mean, well, too complicated to describe, but look at the tests as long as needed to really
          //understand the problem here, but in tests I-shape is such that there is no constant centerpoint (4 char long 
          //does not have center point to rotate around) and there's additional empty space in the string on both sides
          //so we cant rotate this just like all the other test where we were able to blindly rotate full string
          //...so here we have decided that we use only the rotateRight form in case just 2 possible rotations...
          rotation = this.rotateSquareRight(width, height, m);
        }
        nextOrientation = this.currentOrientation ? 0 : 1; 
      }
      else {
        if (rotateRight) {
          rotation = this.rotateSquareRight(width, height, m);
        }
        else {
          rotation = this.rotateSquareLeft(width, height, m);
        }
        
      }

    }
    else {
      rotation = this.shape;
    }
      //when rotating, maxheight and maxwidth change place so that is why these values are mixed compared to constuctor
      return new RotatingShape(rotation, this.id, this.orientationCount, this.maxHeight, this.maxWidth, nextOrientation, originalRotation);
      //return new RotatingShape(rotation, this.id, this.orientationCount, nextOrientation, originalRotation);

    }

    /*
    rotateLeft() {
      return this.rotateCommon(false);
  }
  */

  rotateSquareLeft(width, height, m) {
    let shapePrint ="";
    for (let w = width-1; w>=0; w--) {
      for (let h = 0; h<height; h++) {
        shapePrint += m[h][w];
      }
      //TODO: how to get rid of this ridiculous \n plumbing?       
      if (w > 0) {
        shapePrint += "\n";
      }
    }
    return shapePrint;
  }

  }