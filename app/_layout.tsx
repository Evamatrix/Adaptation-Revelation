import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import Providers from "../src/components/Providers";
import { toastConfig } from "../src/utils/toast";
import { useAppFonts } from "../src/constants/fonts";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <Toast config={toastConfig} />
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
