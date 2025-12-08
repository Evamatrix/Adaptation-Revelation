import { usePathname } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Taskbar from "./Taskbar";

type ScreenProps = {
  children: ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  const pathname = usePathname();
  const showTaskbarOn = [
    "/homescreen",
    "/connect",
    "/chats",
    "/user-profile",
  ];

  return (
    <View style={styles.container}>
      {children}
      {showTaskbarOn.includes(pathname) && <Taskbar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
});
