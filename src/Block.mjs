export class Block {
  color;
  icon;

  positionRow;
  positionColumn;

  boardPositions = new Map();

  constructor(icon,color) {
    this.icon = icon;
    this.color = color;
  }

  
  calculatePositionsOnBoard(row, boardHorizontalCenter) {
    this.boardPositions.set(row, boardHorizontalCenter);  
  }
}