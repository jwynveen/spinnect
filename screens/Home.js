'use strict';

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo-header.png')} style={styles.headerImage} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight style={[styles.button, styles.button1]}>
            <Text style={styles.buttonText}>Easy</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.button, styles.button2]}>
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.button, styles.button3]}>
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
    backgroundColor: '#DFCFC5',
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
    color: '#E3F2FD',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Futura',
    fontWeight: '300',
  },
  button1: {
    backgroundColor: '#558A70',
  },
  button2: {
    backgroundColor: '#55788A',
  },
  button3: {
    backgroundColor: '#5E558A',
  },
});
