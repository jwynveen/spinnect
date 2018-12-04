'use strict';

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { cloneDeep } from 'lodash';
import BannerAd from '../components/BannerAd';
import GamePiece from '../components/GamePiece';
import ResetButton from '../components/ResetButton';
import {variables} from "../styles";
import levelHelper from '../levelHelper';
const { width } = Dimensions.get('window');

export default class GameScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const difficulty = navigation.getParam('difficulty', '');
    return {
      title: difficulty,
      headerTintColor: variables.color.byDifficulty(difficulty, 'Dark'),
    };
  };

  constructor(props) {
    super(props);

    // todo: get level dynamically
    const level = [
      [
        {sides: [1, 1, 0, 0], isConnected: false},
        {sides: [0, 1, 1, 1], isConnected: false},
        {sides: [1, 0, 1, 0], isConnected: false},
        {sides: [1, 0, 0, 1], isConnected: false},
      ],
      [
        {sides: [1, 1, 0, 1], isConnected: false},
        {sides: [1, 1, 1, 1], isConnected: false},
        {sides: [1, 1, 1, 0], isConnected: false},
        {sides: [0, 1, 1, 0], isConnected: false},
      ],
      [
        {sides: [1, 0, 1, 0], isConnected: false},
        {sides: [0, 1, 0, 1], isConnected: false},
        {sides: [0, 0, 0, 1], isConnected: false},
        {sides: [0, 0, 0, 0], isConnected: false},
      ],
      [
        {sides: [1, 1, 0, 0], isConnected: false},
        {sides: [0, 1, 1, 1], isConnected: false},
        {sides: [1, 0, 1, 0], isConnected: false},
        {sides: [1, 0, 0, 0], isConnected: false},
      ],
    ];

    const difficulty = props.navigation.getParam('difficulty', '');
    const levelSize = level.length;

    // Calculate piece size:
    // Screen width - 20px margin divided by number of pieces
    // ...rounded down to nearest 10
    // todo: set max based on height (header, reset button, ad)
    const pieceSize = Math.floor((width - 20) / levelSize / 10) * 10;

    this.state = {
      attempt: 0, // this just gives a unique key to pieces so we can reset and have them update
      isLevelComplete: false,
      difficulty,
      initialLevel: cloneDeep(level),
      level,
      pieceSize,
      pieceColor: variables.color.byDifficulty(difficulty),
      colorDark: variables.color.byDifficulty(difficulty, 'Dark'),
    };
  }

  _onReset() {
    this.setState((state) => ({
      level: cloneDeep(state.initialLevel),
      attempt: state.attempt + 1,
    }));
  }
  _onNext() {
    //todo: _onNext
  }
  _onPieceUpdate(row, column, sides) {
    this.state.level[row][column].sides = sides;

    const level = levelHelper.isPieceConnected(this.state.level, row, column, true);

    const isLevelComplete = levelHelper.isLevelComplete(level);

    this.setState({isLevelComplete, level});
  }

  render() {

    // Gameboard rows
    const rows = this.state.level.map((row, rowIndex) => {
      return (
        <View style={styles.row} key={'row' + (rowIndex + 1)}>
          {row.map((piece, columnIndex) =>
            <GamePiece
              initialSides={piece.sides}
              isConnected={piece.isConnected}
              onUpdate={this._onPieceUpdate.bind(this)}
              size={this.state.pieceSize}
              color={this.state.pieceColor}
              row={rowIndex}
              column={columnIndex}
              key={this.state.attempt + ':' + (rowIndex + 1) + '.' + (columnIndex + 1)}
            />
          )}
        </View>
      )
    });

    // Success overlay
    const overlay = this.state.isLevelComplete ?
      (
        <View style={styles.overlay}>
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>Perfect!</Text>
            <TouchableHighlight onPress={this._onNext} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
      : null;

    // Screen
    return (
      <View style={styles.container}>
        <View style={styles.gameboard}>
          {rows}
        </View>

        <View style={styles.resetContainer}>
          <ResetButton
            onPress={this._onReset.bind(this)}
            color={this.state.colorDark}
            />
        </View>

        <View style={styles.debug}>
          <Text>Level Complete: {this.state.isLevelComplete ? 'true' : 'false'}</Text>
          {/*<Text>{JSON.stringify(this.state.level, null, true)}</Text>*/}
        </View>

        <View style={styles.adContainer}>
          <BannerAd />
        </View>

        {overlay}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: variables.color.background,
    alignItems: 'center',
    flexGrow: 1,
  },
  gameboard: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  resetContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  debug: {
  },
  adContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 50,
    alignItems: 'center',
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00000088',
  },
  successContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    elevation: 5,
    padding: 25,
    bottom: 80,
    position: 'absolute',
  },
  successTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: variables.color.primary,
    marginBottom: 20,
  },
  nextButton: {
    alignSelf: 'center',
    backgroundColor: variables.color.primary,
    padding: 10,
    borderRadius: 25,
    elevation: 2,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: variables.color.buttonText,
  },
});
