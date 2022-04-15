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
    }

    toString() {
        return this.shape.replaceAll(" ", "")+"\n";
    }

    rotateRight() {
          return new RotatingShape(
            ""+this.matrix[this.height-1][0]+this.matrix[this.height-2][0]+this.matrix[this.height-3][0]+"\n"
            +this.matrix[this.height-1][1]+this.matrix[this.height-2][this.width-2]+this.matrix[this.height-3][1]+"\n"            
            +this.matrix[this.height-1][2]+this.matrix[this.height-2][this.width-1]+this.matrix[this.height-3][2]
          )    
    }

    rotateLeft() {
      let m = this.matrix;
      let width = this.width;
      let height = this.height;
      return new RotatingShape(
        ""+m[0][width-1]+m[1][width-1]+this.matrix[2][width-1]+"\n"
        +m[0][width-2]+m[height-2][width-2]+m[height-1][width-2]+"\n"            
        +m[0][0]+m[1][0]+m[2][0]
      )    
}

  }