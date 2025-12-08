import { Stack, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { UserProvider } from "../src/context/UserContext";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <UserProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});