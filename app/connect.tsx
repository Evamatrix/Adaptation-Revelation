import Screen from "@/src/components/Screen";
import { useRouter } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";

export default function Connect() {
  const router = useRouter();
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <Screen>
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>CONNECT</Text>
      </View>

      {/* Options */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push("/club-explore")}
          activeOpacity={0.8}
        >
          <Text style={styles.optionText}>CLUBS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push("/discover-users")}
          activeOpacity={0.8}
        >
          <Text style={styles.optionText}>USERS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },

  headerContainer: {
    marginTop: 100,
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    color: Colors.text,
    textAlign: "center",
    fontFamily: getFont("heading"),
    fontSize: Platform.select({ web: 48, default: 45 }),
    fontWeight: "400",
    marginBottom: 60,
    textTransform: "uppercase",
  },

  buttonContainer: {
    width: "85%",
    alignItems: "center",
    gap: 20,
  },
  optionButton: {
    width: "100%",
    height: 85,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 26,
    fontFamily: getFont("mono"),
    color: Colors.text,
  },

  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
  },
  menu: {
    width: "90%",
    height: 80,
    backgroundColor: Colors.secondary,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 25,
  },
  menuIcon: { fontSize: 28 },
});
