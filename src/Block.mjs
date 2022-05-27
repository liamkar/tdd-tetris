export class Block {
  color;
  icon;

  positionRow;
  positionColumn;

  //boardPositions = new Map();
  //highestYContainingShapePattern
  //we had to bring in these to match with the RotatingShape ways of handling data.
  shape;
  height;
  matrix;
  width;
  shapeHorizontalCenter=0;

  constructor(icon,color) {
    this.icon = icon;
    this.color = color;

    this.shape = icon;
    let trimmedShape = this.shape.replaceAll(" ", "")
    let rowSplits = trimmedShape.split("\n");
    this.height = rowSplits.length;
    this.matrix = rowSplits.map(i => i.split(""))
    this.width = this.matrix[0].length;
    //this.id = id;
    //this.icon = id;

  }

  /*
  calculatePositionsOnBoard(row, boardHorizontalCenter) {
    this.highestYContainingShapePattern = row;
    this.boardPositions.set(row, [boardHorizontalCenter]);
  }
  */

  /* console says this is not a function, WTF?
  blockIsAtThisPosition(x,y) {
    return (this.boardPositions.get(x) && this.boardPositions.get(x) === y)
  }
  */
}