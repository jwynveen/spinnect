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

    const { sides } = currentRow[column];

    let isConnected = true;

    // isSideConnect (1)
    if (currentRow && currentRow[column + 1]) {
      const neighborPiece = currentRow[column + 1];
      const isSideConnected = sides[0] === neighborPiece.sides[2];
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
          // eslint-disable-next-line prefer-destructuring
          sides[3] = level[rowIdx - 1][colIdx].sides[1];
        }

        // Left
        if (colIdx === 0) {
          sides[2] = 0;
        } else {
          // eslint-disable-next-line prefer-destructuring
          sides[2] = row[colIdx - 1].sides[0];
        }

        const connections = sum(sides);
        const options = [
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

        row.push({ sides });
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
    let shuffledLevel = level;
    for (const row of shuffledLevel) {
      for (const cell of row) {
        const turns = random(0, 3);

        for (let i = 0; i < turns; i++) {
          // rotate counter-clockwise
          const side = cell.sides.shift();
          cell.sides.push(side);
        }
      }
    }

    // For debugging: rotate first piece one turn counter-clockwise
    // const rotatedSide = shuffledLevel[0][0].sides.shift()
    // shuffledLevel[0][0].sides.push(rotatedSide);

    for (let rowIdx = 0; rowIdx < shuffledLevel.length; rowIdx++) {
      for (let colIdx = 0; colIdx < shuffledLevel[rowIdx].length; colIdx++) {
        shuffledLevel = this.isPieceConnected(shuffledLevel, rowIdx, colIdx);
      }
    }

    return shuffledLevel;
  },

  /**
   * Convert level to ASCII representation
   * @param {array} level
   * @returns {string}
   */
  levelToASCII(level) {
    let output = '';

    for (let rowIdx = 0; rowIdx < level.length; rowIdx++) {
      for (const cell of level[rowIdx]) {
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

      default:
        return '?';
    }
  },

  /**
   * Get height and width of level based on difficulty
   * @param {string} difficulty
   * @returns {{height: number, width: number}}
   */
  getLevelConfigByDifficulty(difficulty) {
    let size = 5;
    switch (difficulty) {
      case 'Master':
        size = 13;
        break;
      case 'Expert':
        size = 11;
        break;
      case 'Hard':
        size = 9;
        break;
      case 'Medium':
        size = 7;
        break;
      default:
        size = 5;
        break;
    }

    return {
      height: size,
      width: size,
    };
  },
};
