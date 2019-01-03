import {
  cloneDeep,
  every,
  flattenDeep,
  pull,
  random,
  sum,
} from 'lodash';

const pieceWeightsPercent = {
  empty: 0,
  single: 0,
  straight: 30,
  corner: 30,
  triple: 30,
  quad: 10,
};

function getRandomItem(options) {
  return options[random(options.length - 1)];
}

function getWeightedRandomItem(options, weights) {
  if (!options) {
    throw new Error('`options` must not be empty.');
  }

  if (!weights) {
    throw new Error('`weights` must not be empty.');
  }
  // If weights don't match options, just do it completely random
  if (options.length !== weights.length) {
    return getRandomItem(options);
  }

  const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
  const randomNumber = random(totalWeight);
  let weightSum = 0;
  for (let i = 0; i < options.length; i++) {
    weightSum += weights[i];
    weightSum = weightSum.toFixed(2) * 1;

    // only be inclusive of final item so that zero at start can't be selected
    if (randomNumber < weightSum || randomNumber === weightSum === totalWeight) {
      return options[i];
    }
  }
  // we shouldn't get here, but just in case...
  return options[0];
}

function getRandomRemainingSides(sideString) {
  const options = [
    '00',
    '01',
    '10',
    '11',
  ];

  let weights = [];
  switch (sideString) {
    case '00':
      weights = [
        pieceWeightsPercent.empty / 1 * 4,
        pieceWeightsPercent.single / 4 * 4,
        pieceWeightsPercent.single / 4 * 4,
        pieceWeightsPercent.corner / 4 * 4,
      ];
      break;
    case '01':
      weights = [
        pieceWeightsPercent.single / 4 * 4,
        pieceWeightsPercent.straight / 2 * 4,
        pieceWeightsPercent.corner / 4 * 4,
        pieceWeightsPercent.triple / 4 * 4,
      ];
      break;
    case '10':
      weights = [
        pieceWeightsPercent.single / 4 * 4,
        pieceWeightsPercent.corner / 4 * 4,
        pieceWeightsPercent.straight / 2 * 4,
        pieceWeightsPercent.triple / 4 * 4,
      ];
      break;
    case '11':
    default:
      weights = [
        pieceWeightsPercent.corner / 4 * 4,
        pieceWeightsPercent.triple / 4 * 4,
        pieceWeightsPercent.triple / 4 * 4,
        pieceWeightsPercent.quad / 1 * 4,
      ];
      break;

    case '000':
      weights = [
        pieceWeightsPercent.empty / 1 * 4,
        pieceWeightsPercent.single / 4 * 4,
      ];
      break;
    case '001':
      weights = [
        pieceWeightsPercent.single / 4 * 4,
        pieceWeightsPercent.corner / 3 * 4,
      ];
      break;
    case '010':
      weights = [
        pieceWeightsPercent.single / 4 * 4,
        pieceWeightsPercent.straight / 2 * 4,
      ];
      break;
    case '011':
      weights = [
        pieceWeightsPercent.corner / 4 * 4,
        pieceWeightsPercent.triple / 4 * 4,
      ];
      break;
    case '100':
      weights = [
        pieceWeightsPercent.single / 4 * 4,
        pieceWeightsPercent.corner / 4 * 4,
      ];
      break;
    case '101':
      weights = [
        pieceWeightsPercent.straight / 2 * 4,
        pieceWeightsPercent.triple / 4 * 4,
      ];
      break;
    case '110':
      weights = [
        pieceWeightsPercent.corner / 4 * 4,
        pieceWeightsPercent.triple / 4 * 4,
      ];
      break;
    case '111':
      weights = [
        pieceWeightsPercent.triple / 4 * 4,
        pieceWeightsPercent.quad / 1 * 4,
      ];
      break;
  }


  // const randomOption = options[random(0, options.length - 1)];
  if (sideString.length === 2) {
    return getWeightedRandomItem(options, weights);
  }

  if (sideString.length === 3) {
    return getWeightedRandomItem(['0', '1'], weights);
  }

  return '';
}

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

        // region Check if Edge Piece
        // Top/Bottom row
        if (rowIdx === 0) {
          sides[3] = 0;
        } else if (rowIdx === width - 1) {
          sides[1] = 0;
        }

        // Left/Right column
        if (colIdx === 0) {
          sides[2] = 0;
        } else if (colIdx === height - 1) {
          sides[0] = 0;
        }
        // endregion

        // region Match from Previous Defined Pieces
        // Top
        if (sides[3] === undefined) {
          // eslint-disable-next-line prefer-destructuring
          sides[3] = level[rowIdx - 1][colIdx].sides[1];
        }

        // Left
        if (sides[2] === undefined) {
          // eslint-disable-next-line prefer-destructuring
          sides[2] = row[colIdx - 1].sides[0];
        }
        // endregion

        const nonNullSides = sides.filter(side => (side !== undefined));
        const definedSideCount = nonNullSides.length;
        const sideString = nonNullSides.join('');

        const randomSides = getRandomRemainingSides(sideString);

        // Right
        if (sides[0] === undefined) {
          sides[0] = Number(randomSides[0]);
        }

        // Bottom
        if (sides[1] === undefined) {
          sides[1] = Number(definedSideCount === 2
            ? randomSides[1]
            : randomSides[0]);
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
        return piece;
        // return '?';
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
