
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Movement } from "../src/Movement.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
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
    //fallToBottom(board);
    //board.tickRight();
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
    //fallToBottom(board);
    //board.tickRight();
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
    //should move only 3 steps at max, no matter how many times we push left, here we push it 4 times.
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);

    expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
     );
  });
  
});

