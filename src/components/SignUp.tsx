import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono";
import { Koulen_400Regular, useFonts } from "@expo-google-fonts/koulen";
import AppLoading from "expo-app-loading";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../context/UserContext"; // Import user context

const windowHeight = Dimensions.get("window").height;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { setCurrentEmail } = useUser(); // Access context function

  // Load fonts
  const [fontsLoaded] = useFonts({
    Koulen_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateEmail = (text: string) => {
    return text.includes("@") && text.includes(".edu") && text.length > 5;
  };

  // Verify email and store in context
  const handleVerify = () => {
    if (validateEmail(email)) {
      const cleanEmail = email.trim().toLowerCase();
      setIsEmailValid(true);
      // Store the current email in global context
      setCurrentEmail(cleanEmail);

      // Navigate to verified page
      router.push({
        pathname: "/user-verified",
        params: { email: cleanEmail },
      });
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>sign up</Text>

      <Text style={styles.label}>Enter School Email:</Text>

      <View
        style={[
          styles.inputWrapper,
          !isEmailValid && styles.inputWrapperInvalid,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="name@school.edu"
          placeholderTextColor="#5C5C5C"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setIsEmailValid(validateEmail(text));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={handleVerify}
        />
      </View>

      {!isEmailValid && (
        <Text style={styles.errorText}>
          {" "}
          Email must be a school email ending in '.edu' {"\n"} Please try again.
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    alignSelf: "center",
    minHeight: windowHeight,
  },
  title: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Koulen_400Regular",
    fontSize: Platform.select({ web: 48, default: 45 }),
    fontWeight: "400",
    marginBottom: 60,
    textTransform: "uppercase",
  },
  label: {
    color: "#000",
    textAlign: "center",
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 22, default: 20 }),
    fontWeight: "400",
    marginBottom: 30,
    width: "90%",
  },
  inputWrapper: {
    width: "100%",
    maxWidth: 294,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#000",
    backgroundColor: "#FFFAFA",
    justifyContent: "center",
    marginBottom: 30,
  },
  inputWrapperInvalid: {
    width: "100%",
    maxWidth: 294,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "red",
    backgroundColor: "#FFFAFA",
    justifyContent: "center",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: "100%",
    color: "#000",
    textAlign: "center",
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: Platform.select({ web: 20, default: 18 }),
    paddingHorizontal: 15,
  },
  button: {
    width: "100%",
    maxWidth: 183,
    height: 56,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#000",
    backgroundColor: "#FFFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontFamily: "Koulen_400Regular",
    fontSize: Platform.select({ web: 28, default: 26 }),
  },
  errorText: {
    color: "red",
    fontFamily: "Koulen_400Regular",
    fontSize: Platform.select({ web: 28, default: 18 }),
    marginBottom: 20,
    textAlign: "center",
  },
  signOutText: {
    fontSize: Platform.select({ web: 30, default: 28 }),
    fontFamily: "Koulen",
    color: "#000",
  },
  topLeftButton: {
    position: "absolute",
    top: 70,
    left: 30,
    backgroundColor: "#FFF8F9",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 2,
    zIndex: 10,
  },
});
