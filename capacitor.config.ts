import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.notescalculatorunet.app',
  appName: 'Notes Calculator Unet',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
