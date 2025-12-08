import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";

interface MessageBubbleProps {
  sender: string;
  text: string;
  isMine: boolean;
}

export default function MessageBubble({ sender, text, isMine }: MessageBubbleProps) {
  const fontsLoaded = useAppFonts();

  // Hooks always run; gate UI only
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.wrapper, isMine ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }]}>
      <Text style={styles.sender}>{sender}</Text>
      <View style={[styles.bubble, isMine ? styles.rightBubble : styles.leftBubble]}>
        <Text style={[styles.text, isMine && { color: Colors.background }]}>{text}</Text>
        <Text style={styles.time}>{isMine ? "now" : "earlier"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20, maxWidth: "80%" },
  sender: {
    fontSize: 14,
    fontFamily: getFont("mono"),
    color: Colors.muted,
    marginBottom: 4,
  },
  bubble: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 18 },
  leftBubble: { backgroundColor: "#e5e5e5", borderTopLeftRadius: 4 },
  rightBubble: { backgroundColor: Colors.primary, borderTopRightRadius: 4 },
  text: { fontFamily: getFont("mono"), fontSize: 16 },
  time: {
    fontFamily: getFont("mono"),
    fontSize: 12,
    color: Colors.muted,
    marginTop: 4,
    textAlign: "right",
  },
});
