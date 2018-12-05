import {
  cloneDeep,
  every,
  flattenDeep,
  pull,
  random,
  sum,
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
      // there is no neighbor to the right, but the right side is 1
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
   * Randomly generate a level
   * @param {number} height
   * @param {number} width
   * @returns {Array}
   */
  generate(height, width) {
    const level = [];

    for (let rowIdx = 0; rowIdx < height; rowIdx++) {
      const row = [];

      for (let colIdx = 0; colIdx < width; colIdx++) {
        const sides = new Array(4);

        // Top
        if (rowIdx === 0) {
          sides[3] = 0;
        } else {
          sides[3] = level[rowIdx - 1][colIdx].sides[1];
        }

        // Left
        if (colIdx === 0) {
          sides[2] = 0;
        } else {
          sides[2] = row[colIdx - 1].sides[0];
        }

        const connections = sum(sides);
        let options = [
          '00',
          '01',
          '10',
          '11',
        ];
        if (connections === 0) {
          pull(options, '00');
        }
        const randomOption = options[random(0, options.length - 1)];

        // Right
        if (colIdx === width - 1) {
          sides[0] = 0;
        } else {
          sides[0] = Number(randomOption[0]);
        }

        // Bottom
        if (rowIdx === height - 1) {
          sides[1] = 0;
        } else {
          sides[1] = Number(randomOption[1]);
        }

        row.push({sides});
      }
      level.push(row);
    }
    return level;
  },

  /**
   * Randomly rotates pieces within level
   * @param {array} level
   * @returns {array}
   */
  shuffleLevel(level) {
    for (let row of level) {
      for (let cell of row) {

        const turns = random(0, 3);

        for (let i = 0; i < turns; i++) {
          // rotate counter-clockwise
          const side = cell.sides.shift();
          cell.sides.push(side);
        }
      }
    }

    for (let rowIdx = 0; rowIdx < level.length; rowIdx++) {
      for (let colIdx = 0; colIdx < level[rowIdx].length; colIdx++) {
        level = this.isPieceConnected(level, rowIdx, colIdx);
      }
    }

    return level;
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
      // empty
      case '0000':
        return '◇';
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
