import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import Providers from "../src/components/Providers";
import { useAppFonts } from "../src/constants/fonts";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <Toast />
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
