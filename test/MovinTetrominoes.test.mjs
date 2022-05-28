
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Movement } from "../src/Movement.mjs";

function forceOverTheLimit(board, direction) {
    for (let i = 0; i < 10; i++) {
      board.tick(direction);
    }
  }

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be moved to left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Left);
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Right);

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  //how this actually differs from previous down 
  it("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Down);

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });


  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    forceOverTheLimit(board, Movement.Directions.Left);

    expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
     );
  });

  it("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);

    forceOverTheLimit(board, Movement.Directions.Right);

    expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
     );
  });

  it("it cannot be moved down beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    forceOverTheLimit(board, Movement.Directions.Down);

    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....
         `
     );
  });
});

