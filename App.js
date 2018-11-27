import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';
import Home from './screens/Home';
import GameScreen from './screens/GameScreen';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (<Home/>);
    /*return (
      <ScrollView>
        <View style={styles.container}>
          <GameScreen/>
        </View>
      </ScrollView>
    );*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
