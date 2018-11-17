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

export default class GamePiece extends React.Component {



  constructor(props) {
    super(props);

    this.animationDuration = 250;

    this.rotateValue = new Animated.Value(0);
    this.scaleValue = new Animated.Value(0);
    this.elevationValue = new Animated.Value(0);

    this.state = {
      sides: props.initialSides || [0, 0, 0, 0],
      rotateState: 0,
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
    // todo: event to send update to game board (or are props two-way)
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
        <Animated.View style={[styles.gamepiece, transformStyle]}>
          <Text style={styles.text}>{this.state.sides}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  gamepiece: {
    width: 40,
    height: 40,
    backgroundColor: '#666666',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  }
})
