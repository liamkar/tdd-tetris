import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

    static T_SHAPE = new RotatingShape(`.T.
    TTT
    ...`);

    static I_SHAPE = new RotatingShape(
        `.....
        .....
        IIII.
        .....
        .....`
     );

  }