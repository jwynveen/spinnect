# Spinnect

React Native app started from [Firebase Starter App](https://github.com/invertase/react-native-firebase-starter)
## Start app

1) Start the react native packager, run `yarn run start` or `npm start` from the root of your project.
1) Copy `.env.dev.default` and rename to `.env.dev`. Replace any necessary configuration values.
1) **[iOS]** Build and run the iOS app, run `npm run ios` from the root of your project. The first build will take some time. This will automatically start up a simulator also for you on a successful build if one wasn't already started.
1) **[Android]** If you haven't already got an android device attached/emulator running then you'll need to get one running (make sure the emulator is with Google Play / APIs). When ready run `npm run android` from the root of your project.

## Build for Production
### Android
1) `npm run apk`
1) Upload generated APK from `/android/app/build/outputs/apk/release/app-release-unsigned.apk` to Play Store
## Common Errors

* **Program type already present: com.facebook.react.ReactInstanceManager$9** on `npm run android`
  * Attempt `npm run clearcache`
  * Attempt `npm run resetcache`
  * Delete `./android/app/build`
* **Failed to capture snapshot of input files for task ':app:bundleReleaseJsAndAssets' property '$1' during up-to-date check.** on `npm run apk`
  * Delete `/node_modules/.bin`
  * `rm -rf node_modules && npm i`

