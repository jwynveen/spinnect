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
import firebase from 'react-native-firebase';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { variables } from './styles';

import Home from './screens/Home';
import GameScreen from './screens/GameScreen';

const AppNavigator = createStackNavigator({
  Home: Home,
  GameScreen: GameScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerRight: <View />,
    headerStyle: {
      backgroundColor: variables.color.background,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flex:1,
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return <AppContainer />;
  }
}
