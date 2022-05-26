import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

    static T_SHAPE = new RotatingShape(`.T.
    TTT
    ...`, 'T', 4, 3, 2);

    static I_SHAPE = new RotatingShape(
        `.....
        .....
        IIII.
        .....
        .....`, 'I', 2
     );

    static O_SHAPE = new RotatingShape(
        `.OO
        .OO
        ...`, 'O', 0
    )

  }