//import { times } from "lodash";

export class RotatingShape {
    shape;

    height;
    width;

    matrix;
    id;
    orientations = new Array(2);
    orientationCount;

    constructor(shape, id, orientationCount, currentOrientation=0, oldShape) {
      this.shape = shape;
      let trimmedShape = this.shape.replaceAll(" ", "")
      let rowSplits = trimmedShape.split("\n");
      this.height = rowSplits.length;
      this.matrix = rowSplits.map(i => i.split(""))
      this.width = this.matrix[0].length;
      this.id = id;
      this.currentOrientation = currentOrientation;
      this.orientationCount = orientationCount;
      this.orientations[currentOrientation] = shape;

      this.orientations[(currentOrientation ? 0 :1)] = oldShape;
    }

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

    rotateRight() {
      return this.rotateCommon(true);
    }

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
        if (w <width-1) {
          shapePrint += "\n";
        }
      }
      return shapePrint;
    }

    rotateCommon(rotateRight) {
      let m = this.matrix;
      let width = this.width;
      let height = this.height;
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
      return new RotatingShape(rotation, this.id, this.orientationCount, nextOrientation, originalRotation);

    }

    rotateLeft() {
      return this.rotateCommon(false);
  }

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