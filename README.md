# Spinnect

React Native app started from [Firebase Starter App](https://github.com/invertase/react-native-firebase-starter)
## Start app

1) Start the react native packager, run `yarn run start` or `npm start` from the root of your project.
2) **[iOS]** Build and run the iOS app, run `npm run ios` or `yarn run ios` from the root of your project. The first build will take some time. This will automatically start up a simulator also for you on a successful build if one wasn't already started.
3) **[Android]** If you haven't already got an android device attached/emulator running then you'll need to get one running (make sure the emulator is with Google Play / APIs). When ready run `npm run android` or `yarn run android` from the root of your project.

## Common Errors

* **Program type already present: com.facebook.react.ReactInstanceManager$9** on `npm run android`
  * Attempt `npm run clearcache`
  * Attempt `npm run resetcache`
  * Delete `./android/app/build`
