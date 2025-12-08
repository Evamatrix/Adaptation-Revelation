import { Stack, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useAppFonts } from "../src/constants/fonts";
import { ClubProvider } from "../src/context/ClubContext";
import { UserProvider } from "../src/context/UserContext";

export default function RootLayout() {
  const pathname = usePathname();
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    // if the fonts aren't ready yet, can also return a splash screen until they are
    return null;
  }

  return (
    <UserProvider>
      <ClubProvider>
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </ClubProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});