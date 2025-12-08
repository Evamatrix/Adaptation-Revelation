import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

// Font names you want to use
export type FontNames = 'Koulen' | 'JetBrainsMono' | 'SystemSans' | 'SystemSerif';

export const Fonts = {
  ios: {
    sans: 'SystemSans', 
    serif: 'SystemSerif', 
    rounded: 'SystemSans',
    mono: 'JetBrainsMono', 
    heading: 'Koulen',
  },
  android: {
    sans: 'SystemSans',
    serif: 'SystemSerif',
    rounded: 'SystemSans',
    mono: 'JetBrainsMono',
    heading: 'Koulen',
  },
  web: {
    sans: 'system-ui',
    serif: 'Georgia',
    rounded: 'Arial',
    mono: 'JetBrainsMono',
    heading: 'Koulen',
  },
};

// Hook to load fonts (returns true when fonts are ready)
export function useAppFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await Font.loadAsync({
        // Google Fonts you want to use
        Koulen: require('./fonts/Koulen-Regular.ttf'),
        JetBrainsMono: require('./fonts/JetBrainsMono-Regular.ttf'),
      });
      setLoaded(true);
    }
    load();
  }, []);

  return loaded;
}

// Get the right font for the current platform
export function getFont(name: keyof typeof Fonts.ios) {
  const platform = Platform.OS;
  if (platform === 'ios') return Fonts.ios[name];
  if (platform === 'android') return Fonts.android[name];
  return Fonts.web[name];
}
