
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Movement } from "../src/Movement.mjs";

function forceToTheLimit(board, direction) {
    for (let i = 0; i < 10; i++) {
      board.tick(direction);
    }
  }

describe("Rotating falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  /*
  it("looks good on drop", () => {
    board.drop(Tetromino.T_SHAPE);
    //board.tick(Movement.Directions.Left);
    //board.rotate(Movement.Directions.Left)
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });
*/


  it("can be rotated to left", () => {
    board.drop(Tetromino.T_SHAPE);
    //board.tick(Movement.Directions.Left);
    board.rotate(Movement.Directions.Left)
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated to right", () => {
    board.drop(Tetromino.T_SHAPE);
    //board.tick(Movement.Directions.Left);
    board.rotate(Movement.Directions.Right)
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("O shape rotation does not change visually", () => {
    board.drop(Tetromino.O_SHAPE);
    //board.tick(Movement.Directions.Left);
    board.rotate(Movement.Directions.Right)
    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("I shape drops right", () => {
    board.drop(Tetromino.I_SHAPE);
    //board.tick(Movement.Directions.Left);
    //board.rotate(Movement.Directions.Right)
    /*
    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
    
    */
    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("I shape rotates right", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotate(Movement.Directions.Right)
    //to be honest, i really dont quite get it which one of these is right
    //, let's leave it here for now, maybe someday i will understand
    //...or this mess needs to be fixed...if possible.
    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
      /*
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
    */
  });

  /*
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
    forceToTheLimit(board, Movement.Directions.Left);

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

    forceToTheLimit(board, Movement.Directions.Right);

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
    forceToTheLimit(board, Movement.Directions.Down);

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

  it("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);
    //we have to drop current shape down, before dropping a new shape to the board
    forceToTheLimit(board,Movement.Directions.Down)

    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    //this left should be ok
    board.tick(Movement.Directions.Left);
    //from these left ticks on, no changes should happen
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);


    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ...T......
         .TTTT.....
         TTT.......
         `
     );
  });

  it("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Right);
    board.tick(Movement.Directions.Right);
    board.tick(Movement.Directions.Right);
    //we have to drop current shape down, before dropping a new shape to the board
    forceToTheLimit(board,Movement.Directions.Down)

    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    //this left should be ok
    board.tick(Movement.Directions.Right);
    //from these left ticks on, no changes should happen
    board.tick(Movement.Directions.Right);
    board.tick(Movement.Directions.Right);
    board.tick(Movement.Directions.Right);


    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         .....T....
         ....TTTT..
         ......TTT.
         `
     );
  });


  it("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    //we have to drop current shape down, before dropping a new shape to the board
    forceToTheLimit(board,Movement.Directions.Down)

    board.drop(Tetromino.T_SHAPE);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    //this should not cause any movement anymore
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);

    expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....
         ....T.....
         ...TTT....
         `
     );
  });
*/
});

