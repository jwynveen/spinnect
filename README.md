# Spinnect

React Native app started from [Firebase Starter App](https://github.com/invertase/react-native-firebase-starter)
## Start app

1) Start the react native packager, run `yarn run start` or `npm start` from the root of your project.
1) Copy `.env.dev.default` and rename to `.env.dev`. Replace any necessary configuration values.
1) **[iOS]** Build and run the iOS app, run `npm run ios` from the root of your project. The first build will take some time. This will automatically start up a simulator also for you on a successful build if one wasn't already started.
   1) To view logs, run `react-native log-ios` to view output of console statements
1) **[Android]** If you haven't already got an android device attached/emulator running then you'll need to get one running (make sure the emulator is with Google Play / APIs). When ready run `npm run android` from the root of your project.
   1) To view logs, run `react-native log-android` to view output of console statements

## Build for Production
### Setup
1) Ensure `spinnect.jks` is in `android/app`
1) Add keystore password to Mac keychain ([instructions](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/)) using name `spinnect_keystore`

### Android
1) Update versionCode and versionName in `/android/app/build.gradle` in `android > defaultConfig`
1) Update js bundle with `npm run android-bundle`
   1) This should update `/android/app/src/main/assets/index.android.bundle`
   1) If images are copied into the `/android/app/src/main/res` directory, delete them
1) `npm run apk`
1) Upload generated APK from `/android/app/build/outputs/apk/release/app-release.apk` to Play Store
   1) To test on emulator first, drag apk file to emulator

## Common Errors

* **Program type already present: com.facebook.react.ReactInstanceManager$9** on `npm run android`
  * Attempt `npm run clearcache`
  * Attempt `npm run resetcache`
  * Delete `./android/app/build`
* **Failed to capture snapshot of input files for task ':app:bundleReleaseJsAndAssets' property '$1' during up-to-date check.** on `npm run apk`
  * Delete `/node_modules/.bin`
  * `rm -rf node_modules && npm i`

