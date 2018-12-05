import React from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import config from 'react-native-config'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import variables from './variables';

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

    firebase.admob().initialize(config.ADMOB_APP_ID);
    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return <AppContainer />;
  }
}
