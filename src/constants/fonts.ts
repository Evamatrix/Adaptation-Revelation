import { Platform } from 'react-native';

const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  /*
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  */
    web: {
    sans: 'system-ui', // just the first choice
    serif: 'Georgia',
    rounded: 'Arial', // or a font you like
    mono: 'Courier New',
    },
}) ?? {
  sans: 'system',
  serif: 'serif',
  rounded: 'system',
  mono: 'monospace',
};

export const AppFonts = Fonts;