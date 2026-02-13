# Publishing to Google Play Store

This guide covers how to build and publish the Notes Calculator Unet app to the Google Play Store using Capacitor.

## Prerequisites

1. **Android Studio** - Download from [developer.android.com](https://developer.android.com/studio)
2. **Java Development Kit (JDK) 17+** - Android Studio includes this
3. **Google Play Developer Account** - $25 one-time fee at [play.google.com/console](https://play.google.com/console)

## Quick Commands

```bash
# Sync web app with Android
npm run android:sync

# Open in Android Studio
npm run android:open

# Build release APK (for testing)
npm run android:build

# Build release AAB (for Play Store)
npm run android:bundle
```

## Step-by-Step Guide

### 1. Generate Custom App Icons

Replace the default Capacitor icons with your custom logo:

1. Convert your `public/logo.svg` to a 1024x1024 PNG
2. Create the resources folder structure:
   ```bash
   mkdir -p resources
   ```
3. Place your icon as `resources/icon.png` (1024x1024)
4. Optionally add `resources/splash.png` (2732x2732)
5. Run the asset generator:
   ```bash
   npx @capacitor/assets generate --android
   ```

**Alternative**: Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) to generate icons manually, then place them in `android/app/src/main/res/mipmap-*` directories.

### 2. Update App Version

Edit `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 1        // Increment for each release
    versionName "1.0.0"  // Semantic version shown to users
}
```

### 3. Create Signing Key (One Time)

For Play Store, you need to sign your app. Create a keystore:

```bash
keytool -genkey -v -keystore release-key.keystore -alias notes-calculator -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANT**:
- Store this keystore file securely (NOT in git)
- Remember the passwords - you need them for every release
- Back up the keystore - losing it means you can't update your app

### 4. Configure Signing

Create `android/keystore.properties` (this file is gitignored):

```properties
storePassword=your_keystore_password
keyPassword=your_key_password
keyAlias=notes-calculator
storeFile=../release-key.keystore
```

Update `android/app/build.gradle` to use signing config:

```gradle
// Add at the top, before android block
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing config ...

    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 5. Build Release Bundle (AAB)

Google Play requires Android App Bundle (AAB) format:

```bash
npm run android:bundle
```

The signed AAB will be at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### 6. Create Play Store Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in required details:
   - **App name**: Notes Calculator Unet
   - **Default language**: Spanish (or your primary language)
   - **App or game**: App
   - **Free or paid**: Free
   - **Category**: Education > Academic Tools

### 7. Prepare Store Assets

You'll need:
- **App icon**: 512x512 PNG (high-res)
- **Feature graphic**: 1024x500 PNG
- **Screenshots**: At least 2 phone screenshots (1080x1920 recommended)
- **Short description**: Max 80 characters
- **Full description**: Max 4000 characters

### 8. Content Rating

Complete the content rating questionnaire in Play Console. For a calculator app, you'll likely get an "Everyone" rating.

### 9. Upload and Review

1. Go to Release > Production > Create new release
2. Upload your `.aab` file
3. Add release notes
4. Submit for review

Review typically takes 1-3 days for new apps.

## Updating Your App

For each update:

1. Increment `versionCode` in `build.gradle`
2. Update `versionName` if desired
3. Run `npm run android:bundle`
4. Upload new AAB to Play Console

## Troubleshooting

### Build fails with Java version error
Make sure `JAVA_HOME` points to JDK 17+:
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### Keystore password incorrect
Double-check your `keystore.properties` file has correct credentials.

### App crashes on launch
1. Open in Android Studio: `npm run android:open`
2. Run on emulator or device
3. Check Logcat for errors

### Web assets not updating
Run a full sync:
```bash
npm run android:sync
```

## App Configuration

Current settings in `capacitor.config.ts`:
- **App ID**: `com.notescalculatorunet.app`
- **App Name**: Notes Calculator Unet
- **Web Directory**: `dist`

To change the app ID (package name), you must:
1. Update `capacitor.config.ts`
2. Update `android/app/build.gradle` (applicationId and namespace)
3. Rename package directories in `android/app/src/main/java/`
4. Update all Java/Kotlin imports

## Resources

- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Android App Bundle Guide](https://developer.android.com/guide/app-bundle)
