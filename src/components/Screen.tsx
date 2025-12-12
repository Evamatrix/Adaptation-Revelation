import { usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import BackButton from "./Button/BackButton";
import Taskbar from "./Taskbar";

interface ScreenProps {
  children: React.ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  const pathname = usePathname();

  // Decide visibility
  const hideBackOn = ["user-profile"];
  const showTaskbar = ["/friends-list", "/club-explore", "/create-club", "/user-profile", "/joined-clubs-list", "/homescreen", "/connect"].includes(pathname)
    || pathname.startsWith("/chat/")
    || pathname.startsWith("/club-chat/");

  return (
    <View style={styles.container}>
      {/* Always mounted, just hide visually if needed */}
      <BackButton style={{ display: hideBackOn.includes(pathname) ? "none" : "flex" }} />
      
      <View style={styles.content}>{children}</View>
      
      <View style={[styles.taskbarContainer, { display: showTaskbar ? "flex" : "none" }]}>
        <Taskbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // leave space for Taskbar
  },
  taskbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
