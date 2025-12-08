import { usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import BackButton from "./Button/BackButton";
import Taskbar from "./Taskbar";

export default function Screen({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideBackOn = [""];
  const showTaskbar = ["/friends-list"].includes(pathname) || pathname.startsWith("/chat/");

  return (
    <View style={styles.container}>
      {!hideBackOn.includes(pathname) && <BackButton />}
      <View style={styles.content}>{children}</View>
      {showTaskbar && (
        <View style={styles.taskbarContainer}>
          <Taskbar />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // leaves space so content doesn’t overlap Taskbar
  },
  taskbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
