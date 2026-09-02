import type { ConfigContext, ExpoConfig } from 'expo/config';

const splashByBrand = {
  vita: {
    name: 'vita',
    backgroundColor: '#FAFAF5',
    image: './src/brands/vita/splash-icon.png',
    imageWidth: 128,
  },
  nexo: {
    name: 'nexo',
    backgroundColor: '#F4F6F8',
    image: './src/brands/nexo/splash-icon.png',
    imageWidth: 128,
  },
} as const;

function resolveBuildBrandId(): keyof typeof splashByBrand {
  return process.env.EXPO_PUBLIC_BRAND === 'nexo' ? 'nexo' : 'vita';
}

function withoutSplashPlugin(plugins: ExpoConfig['plugins']) {
  return (plugins ?? []).filter((plugin) => {
    const name = Array.isArray(plugin) ? plugin[0] : plugin;
    return name !== 'expo-splash-screen';
  });
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const splash = splashByBrand[resolveBuildBrandId()];

  return {
    ...config,
    name: splash.name,
    updates: {
      ...config.updates,
      enabled: false,
    },
    splash: {
      image: splash.image,
      backgroundColor: splash.backgroundColor,
      resizeMode: 'contain',
    },
    android: {
      ...config.android,
      adaptiveIcon: {
        ...config.android?.adaptiveIcon,
        backgroundColor: splash.backgroundColor,
      },
    },
    plugins: [
      ...withoutSplashPlugin(config.plugins),
      [
        'expo-splash-screen',
        {
          image: splash.image,
          backgroundColor: splash.backgroundColor,
          imageWidth: splash.imageWidth,
          resizeMode: 'contain',
        },
      ],
    ],
  } as ExpoConfig;
};
