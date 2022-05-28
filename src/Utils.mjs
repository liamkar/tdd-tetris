export class Utils {
//TODO: mostly copy paste from Board - lets refa to some util class if really needed in multiple places.
    static calculateItemHorizontalCenterPosition(width) {
        let centerHorizontal = Math.floor(width/2);
        if (width%2 === 0) {
          centerHorizontal--;
        }
        return centerHorizontal;
      }
    }