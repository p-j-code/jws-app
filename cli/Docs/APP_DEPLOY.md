# Generate

`keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

# Pickup "my-release-key.keystore" file

Generally: C:\Users\premj\AppData\Local\Programs\Python\Python311
For Me: C:\Users\premj

# Place the generated file

android/app - beside of debug.keystore

# Update the version of app

npm version minor
npm version major

# Generate .aab file

```bash
 cd android
 ./gradlew bundleRelease  # Generates AAB
 or
cd android
 ./gradlew assembleRelease  # Generates APK
```

# Test setup

1. (Commit all the changes) -> update the icon in cli\cli-config.js to cli/data/icons/test.png
2. run: node cli/scripts/generateAppIcons.js
3. global search "com.reddibypjwebco" replace with "com.devreddibypjwebco"
4. Change the Base and server URL to DEV
5. cd android; ./gradlew assembleRelease
6. revert back all the changes or (Discard all the changes if all important once are committed)

File Location: reddi\android\app\build\outputs\bundle\release\app-release.aab

------------ GPT Guide

Deploying a React Native application to the Google Play Store involves several steps, including preparing the app, generating a signed APK or AAB, and submitting it to the Play Store. Here's a step-by-step guide to get you through the process:

### 1. Prepare Your App for Release

- **Ensure your app is ready**: Test your app thoroughly, fix any bugs, and make sure it meets Google's [app quality guidelines](https://developer.android.com/docs/quality-guidelines/core-app-quality).
- **Update the app’s version**: Increment the version code and version name in the `android/app/build.gradle` file.
- **Set up a release configuration**: Modify the `android/app/build.gradle` file to add a release build configuration.

### 2. Generate a Signed APK or AAB

- **Generate a signing key**: Use the Java `keytool` to create a new signing key if you don’t have one. Run the command in your terminal or command prompt:

  ```bash
  keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
  ```

  Keep this file safe; you will need it to update your app on the Play Store.

- **Configure signing in Gradle**: Edit the `android/app/build.gradle` file to include your signing config:

  ```gradle
  android {
      ...
      signingConfigs {
          release {
              storeFile file('my-release-key.keystore')
              storePassword 'password'
              keyAlias 'my-key-alias'
              keyPassword 'password'
          }
      }
      buildTypes {
          release {
              ...
              signingConfig signingConfigs.release
          }
      }
  }
  ```

- **Generate the release APK or AAB**: Run the following command to generate a release build:

  ```bash
  cd android
  ./gradlew bundleRelease  # Generates AAB
  or
  ./gradlew assembleRelease  # Generates APK
  ```

  The AAB or APK file will be located in `android/app/build/outputs/` directory.

### 3. Test the Release Build

- Before uploading to the Play Store, install the release version on a device and test to make sure everything works as expected.

### 4. Create a Developer Account

- If you don’t have one, create a Google Play Developer account at [Google Play Console](https://play.google.com/console).

### 5. Upload Your App to Google Play

- **Go to the Google Play Console**: Sign in with your developer account.
- **Create a new application**: Enter your app’s name, and fill in the details.
- **Upload the APK or AAB**: In the 'Release management' section, go to the 'App releases' tab, then select the type of release (production, beta, or alpha), and upload your APK or AAB file.
- **Fill in the listing details**: This includes screenshots, app description, category, etc.

### 6. Set Pricing and Distribution

- Decide whether your app will be free or paid and select the countries in which it will be available.

### 7. Publish Your App

- After everything is set up and you've reviewed your app’s details, click 'Publish' or 'Release' to submit your app for review.
- Google will review your app, which can take a few days. Once approved, your app will be live on the Google Play Store.

### 8. Monitor Your App’s Performance

- Use the Google Play Console to monitor your app's performance, user ratings, and to manage releases and updates.

By following these steps, you can successfully deploy your React Native application on the Google Play Store.
