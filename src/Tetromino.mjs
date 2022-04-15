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
        .....`, 'I'
     );

    static O_SHAPE = new RotatingShape(
        `.OO
        .OO
        ...`
    )

  }