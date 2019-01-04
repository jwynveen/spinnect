import React from 'react';
import firebase from 'react-native-firebase';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLevelStats } from '../redux/actions';
import variables from '../variables';
import levelHelper from '../levelHelper';
import BannerAd from '../components/BannerAd';
import GamePiece from '../components/GamePiece';
import ResetButton from '../components/ResetButton';

momentDurationFormatSetup(moment);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: variables.color.background,
    alignItems: 'center',
    flexGrow: 1,
  },
  gameboard: {
    marginTop: 20,
    flexGrow: 1,
    justifyContent: 'center',
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

  // Level Completion
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
    alignItems: 'center',
  },
  successTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: variables.color.primary,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 20,
  },
  timeLevel: {
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: variables.color.primary,
    marginTop: 10,
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
  saveLevelStatsToState: PropTypes.func.isRequired,
  userStatistics: PropTypes.shape({
    bestTime: PropTypes.number.isRequired,
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
      startTime: new Date(),
      levelTime: '',
      pieceSize,
      pieceColor: variables.color.byDifficulty(difficulty),
      colorDark: variables.color.byDifficulty(difficulty, 'Dark'),
      successAnimation: new Animated.Value(-300),
      successAnimationInitialValue: -300,
    };

    firebase.analytics().setAnalyticsCollectionEnabled(process.env.NODE_ENV !== 'development');
    firebase.analytics().setCurrentScreen(`GameScreen:${difficulty}`, 'GameScreen');
  }

  onLevelComplete() {
    const { difficulty, startTime, successAnimation } = this.state;
    const { saveLevelStatsToState } = this.props;
    const finishTime = new Date();
    const durationInMS = finishTime - startTime;

    firebase.analytics().logEvent('level_complete', { difficulty });

    saveLevelStatsToState(difficulty, {
      duration: durationInMS,
    });
    this.setState({
      isLevelComplete: true,
      levelTime: moment.duration(durationInMS).format('m:ss', {
        trim: false,
      }),
    });

    Animated.timing(
      successAnimation,
      {
        toValue: 80,
        easing: Easing.elastic(),
        duration: 700,
      },
    ).start();
  }

  onReset() {
    const { difficulty } = this.state;
    firebase.analytics().logEvent('level_reset', { difficulty });
    this.setState(({ levelKey }) => ({
      level: cloneDeep(this.initialLevel),
      levelKey: levelKey + 1,
    }));
  }

  onNext() {
    const { difficulty, successAnimationInitialValue } = this.state;
    firebase.analytics().logEvent('next_level', { difficulty });

    const level = this.generateLevel();
    this.initialLevel = cloneDeep(level);
    this.setState(state => ({
      levelKey: state.levelKey + 1,
      isLevelComplete: false,
      level,
      startTime: new Date(),
      successAnimation: new Animated.Value(successAnimationInitialValue),
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
      levelTime,
      pieceColor,
      pieceSize,
      successAnimation,
    } = this.state;
    const {
      userStatistics,
    } = this.props;

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
    let bestTime = '';
    if (userStatistics && userStatistics.bestTime) {
      bestTime = moment.duration(userStatistics.bestTime).format('m:ss', { trim: false });
    }
    const overlay = isLevelComplete
      ? (
        <View style={styles.overlay}>
          <Animated.View
            style={{
              ...styles.successContainer,
              bottom: successAnimation,
            }}
          >
            <Text style={styles.successTitle}>Perfect!</Text>

            <View style={styles.timeContainer}>
              <Text style={[styles.time, styles.timeLevel, styles.timeLabel]}>Time: </Text>
              <Text style={[styles.time, styles.timeLevel, styles.timeValue]}>{levelTime}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={[styles.time, styles.timeBest, styles.timeLabel]}>Best: </Text>
              <Text style={[styles.time, styles.timeBest, styles.timeValue]}>{bestTime}</Text>
            </View>
            <TouchableHighlight onPress={this.onNext} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableHighlight>
          </Animated.View>
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

        <View style={styles.adContainer}>
          <BannerAd />
        </View>

        {overlay}
      </View>
    );
  }
}

GameScreen.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const difficulty = ownProps.navigation.getParam('difficulty', '');
  return {
    userStatistics: state.userStatistics[difficulty],
  };
};

const mapDispatchToProps = dispatch => ({
  saveLevelStatsToState: (difficulty, stats) => dispatch(saveLevelStats(difficulty, stats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
