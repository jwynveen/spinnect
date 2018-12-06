import React from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import config from 'react-native-config';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import reducers from './redux/reducers';
import variables from './variables';

import Home from './screens/Home';
import GameScreen from './screens/GameScreen';


// region Redux Store
const loggerMiddleware = createLogger();
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware,
  ),
);
const persistor = persistStore(store);
// Delete the user's entire history
// persistor.purge(); // for debugging only. DO NOT leave this uncommented
// endregion

// region React Navigation
const AppNavigator = createStackNavigator({
  Home,
  GameScreen,
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
      flex: 1,
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);
// endregion

export default class App extends React.Component {
  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    firebase.admob().initialize(config.ADMOB_APP_ID);
    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
