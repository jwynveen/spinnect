'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GamePiece from '../components/GamePiece';

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLevelComplete: false,
      level: [
        [
          {sides: [1, 1, 0, 0], isConnected: false},
          {sides: [0, 1, 1, 1], isConnected: false},
          {sides: [1, 0, 0, 1], isConnected: false},
        ],
        [
          {sides: [1, 1, 0, 1], isConnected: false},
          {sides: [1, 1, 1, 1], isConnected: false},
          {sides: [1, 1, 0, 1], isConnected: false},
        ],
        [
          {sides: [1, 1, 0, 0], isConnected: false},
          {sides: [0, 1, 1, 1], isConnected: false},
          {sides: [1, 0, 0, 1], isConnected: false},
        ],
      ],
    };
  }
  _onPieceUpdate(row, column, sides) {
    // this.state.level[row][column].sides = sides;

    const level = this.isConnected(this.state.level, row, column, sides, true);

    const isLevelComplete = this.isLevelComplete(level);

    this.setState({isLevelComplete, level});

    // Check if level is all connected
  }

  isLevelComplete(level) {
    let isLevelComplete = true;
    for (let levelRow of level) {
      for (let piece of levelRow) {
        isLevelComplete = isLevelComplete && piece.isConnected;

        if (!isLevelComplete) {
          return false;
        }
      }
    }
    return isLevelComplete;
  }
  isConnected(level, row, column, sides, checkChild) {

    const lastRow = level[row - 1];
    const currentRow = level[row];
    const nextRow = level[row + 1];

    let isConnected = true;

    // isSideConnect (1)
    if (currentRow && currentRow[column + 1]) {
      const neighborPiece = currentRow[column + 1];
      const isSideConnected = sides[0] === neighborPiece.sides[2]
      isConnected = isConnected && isSideConnected;
      if (checkChild) {
        this.isConnected(level, row, column + 1, neighborPiece.sides);
      }
    }
    // isSideConnect (2)
    if (nextRow && nextRow[column]) {
      const neighborPiece = nextRow[column];
      const isSideConnected = sides[1] === neighborPiece.sides[3];
      isConnected = isConnected && isSideConnected;
      if (checkChild) {
        this.isConnected(level, row + 1, column, neighborPiece.sides);
      }
    }
    // isSideConnect (3)
    if (currentRow && currentRow[column - 1]) {
      const neighborPiece = currentRow[column - 1];
      const isSideConnected = sides[2] === neighborPiece.sides[0];
      isConnected = isConnected && isSideConnected;
      if (checkChild) {
        this.isConnected(level, row, column - 1, neighborPiece.sides);
      }
    }
    // isSideConnect (4)
    if (lastRow && lastRow[column]) {
      const neighborPiece = lastRow[column];
      const isSideConnected = sides[3] === neighborPiece.sides[1];
      isConnected = isConnected && isSideConnected;
      if (checkChild) {
        this.isConnected(level, row - 1, column, neighborPiece.sides);
      }
    }

    level[row][column].isConnected = isConnected;

    return level;
  }

  render() {

    const rows = this.state.level.map((row, rowIndex) => {
      return (
        <View style={styles.row} key={'row' + (rowIndex + 1)}>
          {row.map((piece, columnIndex) =>
            <GamePiece
              initialSides={piece.sides}
              isConnected={piece.isConnected}
              onUpdate={this._onPieceUpdate.bind(this)}
              row={rowIndex}
              column={columnIndex}
              key={(rowIndex + 1) + '.' + (columnIndex + 1)}
            />
          )}
        </View>
      )
    });
    return (
      <View style={styles.gameboard}>
        {rows}
        <View style={styles.debug}>
          <Text>{JSON.stringify(this.state.level, null, true)}</Text>
          <Text>Level Complete: {this.state.isLevelComplete ? 'true' : 'false'}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  gameboard: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
  },
});
