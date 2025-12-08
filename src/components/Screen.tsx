import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import Taskbar from "./Taskbar";

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
      <Taskbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
