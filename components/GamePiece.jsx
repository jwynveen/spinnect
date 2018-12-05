import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import pieces from './shapes/standard/index';

const propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  initialSides: PropTypes.arrayOf(PropTypes.number).isRequired,
  onUpdate: PropTypes.func,
};
const defaultProps = {
  onUpdate: null,
};

const styles = StyleSheet.create({
  gamepiece: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class GamePiece extends React.Component {
  constructor(props) {
    super(props);

    this.animationDuration = 100;

    // Callback function to notify board (parent) of piece rotation state
    this.onUpdate = props.onUpdate;
    this.row = props.row;
    this.column = props.column;
    this.initialSides = props.initialSides.slice(0);

    // Get appropriate shape and rotation
    const vertices = this.initialSides.reduce((count, side) => (count + side), 0);
    const sideString = this.initialSides.join('');
    let initialRotation = 0;

    switch (vertices) {
      case 4:
        this.PieceShape = pieces.Quad;
        break;
      case 3:
        this.PieceShape = pieces.Triple;
        initialRotation = this.initialSides.indexOf(0) + 1;
        if (initialRotation >= 4) {
          initialRotation -= 4;
        }
        break;
      case 2:
        if (sideString.includes('11') || sideString.includes('00')) {
          this.PieceShape = pieces.Corner;
          initialRotation = sideString.indexOf('11');
          if (initialRotation === -1) {
            initialRotation = 3;
          }
        } else {
          this.PieceShape = pieces.Straight;
          if (this.initialSides[0] === 0) {
            initialRotation = 1;
          }
        }
        break;
      case 1:
        this.PieceShape = pieces.Single;
        initialRotation = this.initialSides.indexOf(1);
        break;
      default:
        this.PieceShape = pieces.Empty;
        break;
    }

    // Initial transform values
    this.rotateValue = new Animated.Value(initialRotation);
    // this.scaleValue = new Animated.Value(0);
    // this.elevationValue = new Animated.Value(0);

    this.onPress = this.onPress.bind(this);
    this.state = {
      sides: props.initialSides || [0, 0, 0, 0],
      rotateState: initialRotation,
    };
  }


  onPress() {
    console.log('press');
    let { rotateState } = this.state;
    const { sides } = this.state;

    // Animate
    Animated.parallel([
      // Rotation
      Animated.timing(this.rotateValue, {
        toValue: ++rotateState,
        duration: this.animationDuration,
        useNativeDriver: true,
      }),

      // Scale / Zoom
      /* Animated.sequence([
        Animated.timing(this.scaleValue, {
          toValue: 1,
          duration: this.animationDuration / 5 * 3,
          useNativeDriver: true,
        }),
        Animated.timing(this.scaleValue, {
          toValue: 0,
          duration: this.animationDuration / 5 * 2,
          useNativeDriver: true,
        }),
      ]), */

      // Shadow
      /* Animated.sequence([
        Animated.timing(this.elevationValue, {
          toValue: 1,
          duration: this.animationDuration / 5 * 3,
        }),
        Animated.timing(this.elevationValue, {
          toValue: 0,
          duration: this.animationDuration / 5 * 2,
        }),
      ]), */
    ]).start();

    // Rotate sides array
    const lastSide = sides.pop();
    sides.unshift(lastSide);
    this.setState({
      rotateState,
      sides,
    });
    console.log(sides);

    // send update to game board
    if (this.onUpdate) {
      this.onUpdate(this.row, this.column, sides);
    }
  }

  render({ size, color }) {
    // const pieceScale = this.scaleValue.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [1, 1.1, 1.2]
    // });
    // const elevationScale = this.elevationValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 10]
    // });
    const rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'], // degree of rotation
    });

    const transformStyle = {
      // elevation: elevationScale,
      transform: [{
        // scale: pieceScale,
      // }, {
        rotate: rotation,
      }],
    };

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
      >
        <Animated.View
          style={[styles.gamepiece, transformStyle]}
          width={size}
          height={size}
        >
          <this.PieceShape size={size} color={color} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

GamePiece.propTypes = propTypes;
GamePiece.defaultProps = defaultProps;

export default GamePiece;
