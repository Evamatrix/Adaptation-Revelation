// app/chats/_layout.tsx
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ChatLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[name]" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
});
