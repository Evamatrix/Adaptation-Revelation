import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";

interface MessageInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
}

export default function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a text message..."
        placeholderTextColor={Colors.muted}
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.button} onPress={onSend}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: getFont("mono"),
    fontSize: 15,
    color: Colors.text,
    paddingHorizontal: 16,
  },
  button: {
    marginLeft: 8,
    width: 42,
    height: 42,
    borderRadius: 8, // square with rounded corners
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.background,
    textAlign: "center",
  },
});
