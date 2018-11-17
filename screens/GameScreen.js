'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GamePiece from '../components/GamePiece';

export default class GameScreen extends React.Component {
  render() {
    return (
      <View style={styles.gameboard}>
        <GamePiece initialSides={[1, 1, 0, 1]} />
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
});
