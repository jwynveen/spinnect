import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import BannerAd from '../components/BannerAd';
import GamePiece from '../components/GamePiece';
import ResetButton from '../components/ResetButton';
import variables from '../variables';
import levelHelper from '../levelHelper';

const { width } = Dimensions.get('window');

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

const propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

class GameScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const difficulty = navigation.getParam('difficulty', '');
    return {
      title: difficulty,
      headerTintColor: variables.color.byDifficulty(difficulty, 'Dark'),
    };
  };

  constructor(props) {
    super(props);

    // todo: get level dynamically
    /* const level = [
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
    ]; */

    const difficulty = props.navigation.getParam('difficulty', '');
    const level = this.generateLevel(difficulty);
    this.initialLevel = cloneDeep(level);
    const levelSize = level.length;

    // Calculate piece size:
    // Screen width - 20px margin divided by number of pieces
    // ...rounded down to nearest 5
    // todo: set max based on height (header, reset button, ad)
    const pieceSize = Math.floor((width - 20) / levelSize / 5) * 5;

    this.onNext = this.onNext.bind(this);
    this.onPieceUpdate = this.onPieceUpdate.bind(this);
    this.onReset = this.onReset.bind(this);

    this.state = {
      levelKey: 0, // this just gives a unique key to pieces so we can reset and have them update
      isLevelComplete: false,
      difficulty,
      level,
      pieceSize,
      pieceColor: variables.color.byDifficulty(difficulty),
      colorDark: variables.color.byDifficulty(difficulty, 'Dark'),
    };
  }

  onLevelComplete() {
    // todo: save level stats
  }

  onReset() {
    this.setState(({ levelKey }) => ({
      level: cloneDeep(this.initialLevel),
      levelKey: levelKey + 1,
    }));
  }

  onNext() {
    // todo: _onNext

    const level = this.generateLevel();
    this.initialLevel = cloneDeep(level);
    this.setState(state => ({
      levelKey: state.levelKey + 1,
      isLevelComplete: false,
      level,
    }));
  }

  onPieceUpdate(row, column, sides) {
    const {
      level,
      isLevelComplete,
    } = this.state;

    if (!isLevelComplete) {
      level[row][column].sides = sides;

      const updatedLevel = levelHelper.isPieceConnected(level, row, column, true);

      const isUpdatedLevelComplete = levelHelper.isLevelComplete(updatedLevel);

      this.setState({
        isLevelComplete: isUpdatedLevelComplete,
        level: updatedLevel,
      });

      if (isUpdatedLevelComplete) {
        this.onLevelComplete();
      }
    }
  }

  generateLevel(difficulty) {
    let levelDifficulty = difficulty;
    if (!levelDifficulty && this.state) {
      const { difficulty: stateDifficulty } = this.state;
      levelDifficulty = stateDifficulty;
    }

    const levelConfig = levelHelper.getLevelConfigByDifficulty(levelDifficulty);
    const newLevel = levelHelper.generate(levelConfig.height, levelConfig.width);
    return levelHelper.shuffleLevel(newLevel);
  }

  render() {
    const {
      colorDark,
      isLevelComplete,
      level,
      levelKey,
      pieceColor,
      pieceSize,
    } = this.state;

    // Gameboard rows
    const rows = level.map((row, rowIndex) => (
      <View style={styles.row} key={`row${rowIndex + 1}`}>
        {row.map((piece, columnIndex) => (
          <GamePiece
            initialSides={piece.sides}
            isConnected={piece.isConnected}
            onUpdate={this.onPieceUpdate}
            size={pieceSize}
            color={pieceColor}
            row={rowIndex}
            column={columnIndex}
            key={`${levelKey}:${rowIndex + 1}.${columnIndex + 1}`}
          />
        ))}
      </View>
    ));

    // Success overlay
    const overlay = isLevelComplete
      ? (
        <View style={styles.overlay}>
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>Perfect!</Text>
            <TouchableHighlight onPress={this.onNext} style={styles.nextButton}>
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
            onPress={this.onReset}
            color={colorDark}
          />
        </View>

        <View style={styles.debug}>
          <Text>
Level Complete:
            {isLevelComplete ? 'true' : 'false'}
          </Text>
          {/* <Text>{JSON.stringify(this.state.level, null, true)}</Text> */}
        </View>

        <View style={styles.adContainer}>
          <BannerAd />
        </View>

        {overlay}
      </View>
    );
  }
}

GameScreen.propTypes = propTypes;

export default GameScreen;
