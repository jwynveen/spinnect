'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class GamePiece extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sides: props.initialSides || [0, 0, 0, 0],
    }
  }


  _onPress() {
    console.log('press');
    let sides = this.state.sides;
    const lastSide = sides.pop();
    sides.unshift(lastSide);
    this.setState({ sides });
    console.log(this.state.sides);
    // todo: event to send update to game board (or are props two-way)
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPress.bind(this)}>
        <View style={styles.gamepiece}>
          <Text style={styles.text}>{this.state.sides}</Text>
        </View>
      </TouchableHighlight>
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
