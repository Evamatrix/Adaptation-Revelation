import Toast from 'react-native-toast-message';

type ToastOptions = {
  text1?: string;
  visibilityTime?: number;
  topOffset?: number;
};

/**
 * Show a success toast using the global Toast instance and shared styling.
 * Keep text2 as the primary message; text1 is optional small heading.
 */
export function showSuccess(text2: string, options?: ToastOptions) {
  Toast.show({
    type: 'success',
    text1: options?.text1,
    text2,
    visibilityTime: options?.visibilityTime ?? 2000,
    topOffset: options?.topOffset ?? 68,
  });
}

export default showSuccess;
