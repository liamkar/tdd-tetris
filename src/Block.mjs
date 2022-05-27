export class Block {
  color;
  icon;

  positionRow;
  positionColumn;

  boardPositions = new Map();
  highestYContainingShapePattern

  constructor(icon,color) {
    this.icon = icon;
    this.color = color;
  }

  
  calculatePositionsOnBoard(row, boardHorizontalCenter) {
    this.highestYContainingShapePattern = row;
    this.boardPositions.set(row, [boardHorizontalCenter]);
  }

  /* console says this is not a function, WTF?
  blockIsAtThisPosition(x,y) {
    return (this.boardPositions.get(x) && this.boardPositions.get(x) === y)
  }
  */
}