import { usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import BackButton from "./Button/BackButton";
import Taskbar from "./Taskbar";

export default function Screen({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideBackOn = ["/homescreen", "/connect", "/chats", "/user-profile"];
  const showTaskbarOn = ["/friend-chat", "/homescreen", "/connect", "/chats", "/user-profile"];

  return (
    <View style={styles.container}>
      {!hideBackOn.includes(pathname) && <BackButton />}
      <View style={styles.content}>{children}</View>
      {showTaskbarOn.includes(pathname) && (
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
