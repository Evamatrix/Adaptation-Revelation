import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert, Dimensions, Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Screen from "../src/components/Screen"; // ✅ shared layout wrapper
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { useUser } from "../src/context/UserContext";

export default function UserProfile() {
  const { currentEmail, getUserDataForEmail, clearUserData, setCurrentEmail } = useUser();
  const router = useRouter();
  const params = useLocalSearchParams<{ from?: string }>();
  const from = params.from;

  const fontsLoaded = useAppFonts();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required to access photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const userData = currentEmail ? getUserDataForEmail(currentEmail) : {};
  const {
    firstName = "First",
    lastName = "Last",
    pronoun: pronoun = "",
    nationality,
    languages,
    religion,
    interests,
  } = userData;

  const safeValue = (value?: string | string[]) => {
    if (!value) return "No information entered";
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "No information entered";
    return value.trim() !== "" ? value : "No information entered";
  };

  const safePronounValue = (value?: string | string[]) => {
    if (!value) return "";
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "";
    return value.trim() !== "" ? value : "";
  };

  const handleSignOut = () => {
    if (currentEmail) clearUserData(currentEmail);
    setCurrentEmail(null);
    router.push("/signup");
  };

  if (!fontsLoaded) {
    // Gate rendering, not hooks
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                style={styles.photoContainer}
              >
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.photoImage} />
                ) : (
                  <View style={styles.plusWrapper}>
                    <Text style={styles.plusSign}>+</Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.headerText}>
                <Text style={styles.greeting}>HELLO,</Text>
                <Text style={styles.name}>
                  {`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
                </Text>
                <Text style={styles.pronouns}>{safePronounValue(pronoun)}</Text>
              </View>
            </View>

            {/* Info blocks */}
            <View style={styles.info}>
              {[
                { label: "NATIONALITY", value: safeValue(nationality) },
                { label: "LANGUAGES", value: safeValue(languages) },
                { label: "RELIGION", value: safeValue(religion) },
                { label: "INTERESTS", value: safeValue(interests) },
              ].map((item, index) => (
                <View key={index} style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Floating buttons */}
        <View style={styles.floatingButtonRow}>
          <TouchableOpacity style={styles.bottomButton} onPress={handleSignOut}>
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => router.push("/account-page1")}
          >
            <Text style={styles.buttonText}>EDIT PROFILE</Text>
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
  },
  container: {
    //flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    //paddingBottom: 100, // leave space for Taskbar
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 20,
    marginLeft: 30,
    marginTop: 20,
  },
  photoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  plusWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
  },
  plusSign: {
    fontSize: 90,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
  },
  headerText: { flex: 1 },
  greeting: { fontSize: 26, fontFamily: getFont("heading"), color: Colors.text },
  name: {
    fontSize: 40,
    fontWeight: "200",
    fontFamily: getFont("heading"),
    color: Colors.text,
  },
  pronouns: { fontSize: 20, color: "#5C5C5C", fontFamily: getFont("heading") },
  info: { marginBottom: 30 },
  infoBlock: { marginBottom: 22 },
  infoLabel: { fontSize: 22, fontFamily: getFont("heading"), color: Colors.text },
  infoValue: { fontSize: 18, fontFamily: getFont("mono"), color: "#5C5C5C" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: -15,
  },
  buttonText: { fontSize: 20, fontFamily: getFont("mono"), color: Colors.text },
  scrollContent: {
    paddingBottom: 120, // floating button height + margin
    minHeight: Dimensions.get('window').height - 40, // optional, keeps content not stuck at top
  },
  floatingButtonRow: {
    position: "absolute",
    bottom: 20, // distance from bottom of screen
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomButton: {
    width: "48%",
    height: 52,
    backgroundColor: "#FFF8F9",
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
