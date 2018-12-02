'use strict';

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {variables} from '../styles';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _onPress = (difficulty) => {
    return () => {
      this.props.navigation.navigate('GameScreen', {
        difficulty,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo-header.png')} style={styles.headerImage} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this._onPress('Easy')} style={[styles.button, styles.button1]}>
            <Text style={styles.buttonText}>Easy</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this._onPress('Medium')} style={[styles.button, styles.button2]}>
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this._onPress('Hard')} style={[styles.button, styles.button3]}>
            <Text style={styles.buttonText}>Hard</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: variables.color.background,
  },
  header: {
    // height: '30%',
  },
  headerImage: {
    marginTop: 35,
  },
  buttonContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: variables.color.buttonText,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Futura',
    fontWeight: '300',
  },
  button1: {
    backgroundColor: variables.color.color1,
  },
  button2: {
    backgroundColor: variables.color.color2,
  },
  button3: {
    backgroundColor: variables.color.color3,
  },
});
