import {
  cloneDeep,
  every,
  flattenDeep,
} from 'lodash';

export default {
  /**
   * Check if a given piece is connected and return updated level array
   * @param {array} level
   * @param {number} row - row index
   * @param {number} column - column index
   * @param {boolean} checkNeighbors - Boolean whether to test all bordering pieces
   * @returns {array} Updated level array
   */
  isPieceConnected(level, row, column, checkNeighbors) {
    let levelClone = cloneDeep(level); // don't mutate the original

    if (row >= levelClone.length) {
      return levelClone;
    }

    const lastRow = levelClone[row - 1];
    const currentRow = levelClone[row];
    const nextRow = levelClone[row + 1];

    if (column >= currentRow.length) {
      return levelClone;
    }

    const sides = currentRow[column].sides;

    let isConnected = true;

    // isSideConnect (1)
    if (currentRow && currentRow[column + 1]) {
      const neighborPiece = currentRow[column + 1];
      const isSideConnected = sides[0] === neighborPiece.sides[2]
      isConnected = isConnected && isSideConnected;
      if (checkNeighbors) {
        levelClone = this.isPieceConnected(levelClone, row, column + 1);
      }
    } else if (sides[0]) {
      isConnected = false;
    }
    // isSideConnect (2)
    if (nextRow && nextRow[column]) {
      const neighborPiece = nextRow[column];
      const isSideConnected = sides[1] === neighborPiece.sides[3];
      isConnected = isConnected && isSideConnected;
      if (checkNeighbors) {
        levelClone = this.isPieceConnected(levelClone, row + 1, column);
      }
    } else if (sides[1]) {
      isConnected = false;
    }
    // isSideConnect (3)
    if (currentRow && currentRow[column - 1]) {
      const neighborPiece = currentRow[column - 1];
      const isSideConnected = sides[2] === neighborPiece.sides[0];
      isConnected = isConnected && isSideConnected;
      if (checkNeighbors) {
        levelClone = this.isPieceConnected(levelClone, row, column - 1);
      }
    } else if (sides[2]) {
      isConnected = false;
    }
    // isSideConnect (4)
    if (lastRow && lastRow[column]) {
      const neighborPiece = lastRow[column];
      const isSideConnected = sides[3] === neighborPiece.sides[1];
      isConnected = isConnected && isSideConnected;
      if (checkNeighbors) {
        levelClone = this.isPieceConnected(levelClone, row - 1, column);
      }
    } else if (sides[3]) {
      isConnected = false;
    }

    levelClone[row][column].isConnected = isConnected;

    return levelClone;
  },

  /**
   * Check if isConnected===true on all pieces in level
   * @param {array} level
   * @returns {boolean}
   */
  isLevelComplete(level) {
    const pieces = flattenDeep(level);
    return every(pieces, { isConnected: true });
  },

  /**
   * Convert level to ASCII representation
   * @param {array} level
   * @returns {string}
   */
  levelToASCII(level) {
    let output = '';

    for (let rowIdx = 0; rowIdx < level.length; rowIdx++) {
      for (let cell of level[rowIdx]) {
        output += this.pieceToASCII(cell.sides.join(''));
      }

      // add line break only if not the last row
      if (rowIdx < level.length - 1) {
        output += '\n';
      }
    }

    return output;
  },

  /**
   * Convert piece to ASCII character that represents it
   * @param {string} piece
   * @returns {string}
   */
  pieceToASCII(piece) {
    switch (piece) {
      // single
      case '1000':
        return '╺';
      case '0100':
        return '╻';
      case '0010':
        return '╸';
      case '0001':
        return '╹';

      // double - corner
      case '1100':
        return '┏';
      case '0110':
        return '┓';
      case '0011':
        return '┛';
      case '1001':
        return '┗';

      // double - straight
      case '1010':
        return '━';
      case '0101':
        return '┃';

      // triple
      case '1110':
        return '┳';
      case '0111':
        return '┫';
      case '1011':
        return '┻';
      case '1101':
        return '┣';

      // quad
      case '1111':
        return '╋';
    }

    return '?';
  }
}
