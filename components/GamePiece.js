'use strict';

import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import pieces from './shapes/standard/index';

export default class GamePiece extends React.Component {

  constructor(props) {
    super(props);

    this.animationDuration = 150;

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
    this.scaleValue = new Animated.Value(0);
    this.elevationValue = new Animated.Value(0);

    this.state = {
      sides: props.initialSides || [0, 0, 0, 0],
      rotateState: initialRotation,
    }
  }


  _onPress() {
    console.log('press');

    // Animate
    Animated.parallel([
      // Rotation
      Animated.timing(this.rotateValue, {
        toValue: ++this.state.rotateState,
        duration: this.animationDuration,
      }),

      // Scale / Zoom
      Animated.sequence([
        Animated.timing(this.scaleValue, {
          toValue: 1,
          duration: this.animationDuration / 5 * 3,
        }),
        Animated.timing(this.scaleValue, {
          toValue: 0,
          duration: this.animationDuration / 5 * 2,
        }),
      ]),

      // Shadow
      Animated.sequence([
        Animated.timing(this.elevationValue, {
          toValue: 1,
          duration: this.animationDuration / 5 * 3,
        }),
        Animated.timing(this.elevationValue, {
          toValue: 0,
          duration: this.animationDuration / 5 * 2,
        }),
      ]),
    ]).start();

    // Rotate sides array
    let sides = this.state.sides;
    const lastSide = sides.pop();
    sides.unshift(lastSide);
    this.setState({ sides });
    console.log(this.state.sides);

    // send update to game board
    if (this.onUpdate) {
      this.onUpdate(this.row, this.column, this.state.sides);
    }
  }

  render() {
    const pieceScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2]
    });
    const elevationScale = this.elevationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10]
    });
    let rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"] // degree of rotation
    });

    let transformStyle = {
      elevation: elevationScale,
      transform: [{
        scale: pieceScale,
      }, {
        rotate: rotation,
      }],
    };

    return (
      <TouchableWithoutFeedback
        onPress={this._onPress.bind(this)}
      >
        <Animated.View style={[styles.gamepiece, transformStyle]} width={this.props.size} height={this.props.size}>
          <this.PieceShape size={this.props.size} color={this.props.color} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  gamepiece: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
