import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono";
import { Koulen_400Regular, useFonts } from "@expo-google-fonts/koulen";
import AppLoading from "expo-app-loading";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../src/context/UserContext";
import { SelectList } from "react-native-dropdown-select-list";

export default function AccountPage1() {
  const { currentEmail, getUserDataForEmail, setUserDataForEmail } = useUser();

  const userData = currentEmail ? getUserDataForEmail(currentEmail) : {};

  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [otherPronoun, setOtherPronoun] = useState("");
  const [selectedPronouns, setSelectedPronouns] = useState<string[]>(
    userData.pronouns || []
  );

  useEffect(() => {
    if (currentEmail) {
      const existingData = getUserDataForEmail(currentEmail);
      setFirstName(existingData.firstName || "");
      setLastName(existingData.lastName || "");
      setSelectedPronouns(existingData.pronouns || []);
    }
  }, [currentEmail]);

  const [fontsLoaded] = useFonts({
    Koulen_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  const pronouns = [
    { key: "1", value: "She/Her" },
    { key: "2", value: "He/Him" },
    { key: "3", value: "They/Them" },
    { key: "4", value: "Prefer Not To Say" },
    { key: "5", value: "Other" },
  ];

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter both first and last name."
      );
      return;
    }

    if (selectedPronouns.length === 0 && !otherPronoun.trim()) {
      Alert.alert(
        "Missing Information",
        "Please select or enter your pronoun(s)."
      );
      return;
    }

    if (currentEmail) {
      setUserDataForEmail(currentEmail, {
        firstName,
        lastName,
        pronouns: otherPronoun
          ? [...selectedPronouns, otherPronoun]
          : selectedPronouns,
      });
    }

    router.push("/create-account-pg2");
  };

  const handleBack = () => {
    router.push("/user-verified");
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <Text style={styles.title}>WELCOME!</Text>

        {/* FIRST NAME */}
        <Text style={styles.label}>FIRST NAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#A0A0A0"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* LAST NAME */}
        <Text style={styles.label}>LAST NAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#A0A0A0"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* PRONOUNS DROPDOWN */}
        <Text style={styles.label}>PRONOUN(S):</Text>
        <SelectList
          setSelected={(val) => {
            setSelectedPronouns(val);
            if (!val.includes("Other")) setOtherPronoun("");
          }}
          data={pronouns}
          save="value"
          placeholder="Select Pronoun(s)"
          boxStyles={styles.dropdownBox}
          dropdownStyles={styles.dropdown}
          inputStyles={styles.dropdownText}
          multiple={true}
        />

        {/* OTHER PRONOUN */}
        {selectedPronouns.includes("Other") && (
          <View style={styles.otherContainer}>
            <Text style={styles.otherLabel}>Other:</Text>
            <TextInput
              style={styles.otherInput}
              placeholder="i.e. N/A"
              placeholderTextColor="#A0A0A0"
              value={otherPronoun}
              onChangeText={setOtherPronoun}
            />
          </View>
        )}

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");
const FIXED_WIDTH = Math.min(width * 0.85, 380);

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Koulen_400Regular",
    color: "#000",
    textAlign: "center",
    fontSize: Platform.select({ web: 48, default: 36 }),
    marginVertical: 30,
  },
  label: {
    color: "#000",
    alignSelf: "flex-start",
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 20, default: 16 }),
    fontWeight: "bold",
    marginBottom: 8,
    width: FIXED_WIDTH,
  },
  input: {
    width: FIXED_WIDTH,
    height: 44,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#fff8f9",
    textAlign: "center",
    color: "#000",
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 20, default: 16 }),
    marginBottom: 16,
  },
  dropdownBox: {
    width: FIXED_WIDTH,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#fff8f9",
  },
  dropdown: {
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff8f9",
  },
  dropdownText: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 20, default: 16 }),
    color: "#000",
  },
  otherContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: FIXED_WIDTH,
    marginTop: 10,
    marginBottom: 24,
  },
  otherLabel: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 20, default: 16 }),
    color: "#000",
    marginRight: 8,
  },
  otherInput: {
    flex: 1,
    height: 42,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#fff8f9",
    color: "#000",
    textAlign: "center",
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 18, default: 14 }),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: FIXED_WIDTH,
    marginTop: 10,
  },
  button: {
    width: "48%",
    height: 44,
    backgroundColor: "#fff8f9",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 20, default: 16 }),
    color: "#000",
  },
});
