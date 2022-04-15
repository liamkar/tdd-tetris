export class RotatingShape {
    shape;

    height;
    width;

    matrix;

    constructor(shape) {
      this.shape = shape;
      let trimmedShape = this.shape.replaceAll(" ", "")
      let rowSplits = trimmedShape.split("\n");
      this.height = rowSplits.length;
      this.matrix = rowSplits.map(i => i.split(""))
      this.width = this.matrix[0].length;
      //this.shape= shape+"\n";
    }

    toString() {
        return this.shape.replaceAll(" ", "")+"\n";
        //return this.shape.replaceAll(" ", "");
    }

    rotateRight() {
      /*
          return new RotatingShape(
            ""+m[height-1][0]   +m[height-2][0] +m[height-3][0]+"\n"
              +m[height-1][1]   +m[height-2][1] +m[height-3][1]+"\n"            
              +m[height-1][2]   +m[height-2][2] +m[height-3][2]
          )    
      */
          return new RotatingShape(this.rotateSquareRight(this.width, this.height, this.matrix));
    }

    rotateSquareRight(width, height, m) {
      let shapePrint ="";
      for (let w = 0; w<width; w++) {
        for (let h = height-1; h>=0; h--) {
          shapePrint += m[h][w];
        }
        if (w <width-1) {
          shapePrint += "\n";
        }
      }
      return shapePrint;
    }


    rotateLeft() {
      let m = this.matrix;
      let width = this.width;
      let height = this.height;

      return new RotatingShape(
        ""+m[0][width-1]  +m[1][width-1]        +m[2][width-1]+"\n"
          +m[0][width-2]  +m[height-2][width-2] +m[2][width-2]+"\n"            
          +m[0][width-3]  +m[1][width-3]        +m[2][width-3]
      )    
}

  }