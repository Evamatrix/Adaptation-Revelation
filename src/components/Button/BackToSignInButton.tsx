import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";

type BackToSignInProps = {
  onPress?: () => void; // optional, fallback to router.back()
  style?: object; // optional style override
};

export default function BackToSignInButton({
  onPress,
  style,
}: BackToSignInButtonProps) {
  const router = useRouter();
  const fontsLoaded = useAppFonts();

  const clickBack = () => {
    Alert.alert(
      "Going Back to Sign In",
      "Are you sure you want to go back? You will be asked to enter email again.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => router.push("/signup"),
        },
      ]
    );
  };

  if (!fontsLoaded) return null; // conditional rendering only, hooks order preserved

  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      top: 50,
      left: 10,
      backgroundColor: Colors.secondary,
      borderWidth: 2,
      borderColor: Colors.border,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 6,
      zIndex: 10,
    },
    text: {
      fontSize: 20,
      fontFamily: getFont("sans"),
      color: Colors.text,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={clickBack} // fallback to router.back()
    >
      <Text style={styles.text}>←</Text>
    </TouchableOpacity>
  );
}
