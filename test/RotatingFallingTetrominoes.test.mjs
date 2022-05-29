
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


  xit("can be rotated to left", () => {
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

  xit("can be rotated to right", () => {
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

  xit("rotating T-shape two times right points head down", () => {
    board.drop(Tetromino.T_SHAPE);
    //board.tick(Movement.Directions.Left);
    board.rotate(Movement.Directions.Right)
    board.rotate(Movement.Directions.Right)
    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  xit("rotating T-shape 4 times right places it in original position", () => {
    board.drop(Tetromino.T_SHAPE);
    //board.tick(Movement.Directions.Left);
    board.rotate(Movement.Directions.Right)
    board.rotate(Movement.Directions.Right)
    board.rotate(Movement.Directions.Right)
    board.rotate(Movement.Directions.Right)
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });


  xit("O shape rotation does not change visually", () => {
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

  xit("I shape drops right", () => {
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

  xit("I shape rotates right", () => {
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

  xit("rotatating I shape two times places it in its original positions", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotate(Movement.Directions.Right)
    board.rotate(Movement.Directions.Right)
    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });


  it("cannot be rotated when there is no room to rotate", () => {
  
    /*
    board.drop(Tetromino.I_SHAPE);
    board.tick(Movement.Directions.Right);
    board.tick(Movement.Directions.Right);
    board.tick(Movement.Directions.Right);
    //until here, the rotation shold work, but after adding next one rotation should
    //not be possible anymore due to the right edge.
    board.tick(Movement.Directions.Right);
    board.rotate(Movement.Directions.Right)
    //board.rotate(Movement.Directions.Right)
    */

    //well, what is this really?
    //from here:
    /*
    `  ......IIII
       ..........
       ..........
       ..........
       ..........
       ..........`
    */
   //we would end up here?
    /*
    `  ........I.
       ........I.
       ........I.
       ........I.
       ..........
       ..........`
       */
    //and back to origianal

    //so, is this valid? - honestly, I guess it might be.

    //so, lets try to figure out a better example, what might not be valid?
    //well, obviously by moving the piece to the left edge, when it is stading up
    board.drop(Tetromino.I_SHAPE);
    board.rotate(Movement.Directions.Right)
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);
    board.tick(Movement.Directions.Left);
    //until here, the rotation shold work, but after adding next one rotation should
    //not be possible anymore due to the Left edge.
    board.tick(Movement.Directions.Left);
    //so this rotate should not happen
    board.rotate(Movement.Directions.Right)
    
    //board.rotate(Movement.Directions.Right)

    expect(board.toString()).to.equalShape(
      `.I........
       .I........
       .I........
       .I........
       ..........
       ..........`
    );

    /*
    `  .....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
       */
  });


  it("will not rotate if hits through bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    forceToTheLimit(board, Movement.Directions.Down);
    board.drop(Tetromino.I_SHAPE);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    //this rotate shold not happen as goes over bottom edge so expecting IIII not to turn
    board.rotate(Movement.Directions.Left)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...IIII...
       ....T.....
       ...TTT....`
    );
  });

  xit("will not rotate if hits another block", () => {
    board.drop(Tetromino.T_SHAPE);
    forceToTheLimit(board, Movement.Directions.Down);
    board.drop(Tetromino.I_SHAPE);
    board.tick(Movement.Directions.Down);
    board.tick(Movement.Directions.Down);
    //this rotate shold not happen so expecting IIII not to turn
    board.rotate(Movement.Directions.Left)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...IIII...
       ..........
       ....T.....
       ...TTT....`
    );
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

