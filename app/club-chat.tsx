import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useClubs } from "../src/context/ClubConText";

export default function ChatRoom() {
  const router = useRouter();
  const { club } = useLocalSearchParams();
  const { messages, addMessage } = useClubs();

  const [text, setText] = useState("");
  const listRef = useRef<FlatList<any>>(null);

  const clubMessages = messages
    .filter((m) => m.clubName === club)
    .sort((a, b) => a.timestamp - b.timestamp);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }, [clubMessages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    addMessage(String(club), "You", text.trim());
    setText("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{club}</Text>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Adjust for header height
      >
        <FlatList
          ref={listRef}
          data={clubMessages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={{ width: "100%" }}>
              <View
                style={[
                  styles.bubble,
                  item.sender === "You" ? styles.bubbleYou : styles.bubbleOther,
                ]}
              >
                {item.sender !== "You" && <Text style={styles.sender}>{item.sender}</Text>}
                <Text style={styles.msgText}>{item.text}</Text>
                <Text style={styles.timeText}>
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Input Row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor="#777"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#FFF8F9",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  backButton: { padding: 6 },
  backText: { fontFamily: "Koulen", fontSize: 18, color: "#000" },
  headerTitle: { fontFamily: "Koulen", fontSize: 28, marginLeft: 20, color: "#000" },

  bubble: {
    maxWidth: "75%",
    borderRadius: 20,
    padding: 12,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  bubbleYou: {
    backgroundColor: "#6D86B7",
    alignSelf: "flex-end",
  },
  bubbleOther: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
  },
  sender: { fontFamily: "Koulen", fontSize: 14, color: "#444", marginBottom: 2 },
  msgText: { fontFamily: "Koulen", fontSize: 18, color: "#000" },
  timeText: { fontFamily: "Koulen", fontSize: 12, color: "#666", marginTop: 4, alignSelf: "flex-end" },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
    },
  input: {
    flex: 1,
    backgroundColor: "#EEE",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 30,
    minHeight: 55,
    paddingHorizontal: 18,
    fontSize: 18,
    fontFamily: "Koulen",
  },
  sendButton: {
    backgroundColor: "#4169E1",
    width: 55,
    height: 55,
    marginLeft: 10,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: { fontSize: 28, color: "#FFF", fontWeight: "bold" },
});
