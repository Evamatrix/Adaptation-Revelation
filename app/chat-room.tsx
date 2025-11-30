import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
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

// Helper to format date separators
const formatDateSeparator = (timestamp: number) => {
  const msgDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (
    msgDate.toDateString() === today.toDateString()
  ) return "Today";
  if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";
  return msgDate.toLocaleDateString();
};

export default function ChatRoom() {
  const router = useRouter();
  const { club } = useLocalSearchParams();
  const { messages, addMessage } = useClubs();

  const [text, setText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const listRef = useRef<FlatList<any>>(null);

  const clubMessages = messages
    .filter((m) => m.clubName === club)
    .sort((a, b) => a.timestamp - b.timestamp);

  // Scroll to bottom whenever messages change
  useEffect(() => scrollToBottom(), [clubMessages]);

  // Adjust input when keyboard opens
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = () => {
    if (!text.trim()) return;
    addMessage(String(club), "You", text.trim());
    setText("");
  };

  // Track previous message date for separators
  let prevDate: string | null = null;

  return (
  <SafeAreaView style={styles.safeArea}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{club}</Text>
    </View>

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0} // adjust if header overlaps
    >
      <FlatList
        ref={listRef}
        data={clubMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 12 }}
        renderItem={({ item }) => {
          const dateSeparator = formatDateSeparator(item.timestamp);
          let showDate = false;
          if (prevDate !== dateSeparator) {
            showDate = true;
            prevDate = dateSeparator;
          }

          return (
            <>
              {showDate && (
                <View style={styles.dateSeparator}>
                  <Text style={styles.dateText}>{dateSeparator}</Text>
                </View>
              )}
              <View
                style={[
                  styles.bubbleContainer,
                  item.sender === "You" ? { flexDirection: "row-reverse" } : {},
                ]}
              >
                {item.sender !== "You" && (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.sender[0]}</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.bubble,
                    item.sender === "You"
                      ? styles.bubbleYou
                      : styles.bubbleOther,
                  ]}
                >
                  {item.sender !== "You" && (
                    <Text style={styles.sender}>{item.sender}</Text>
                  )}
                  <Text style={styles.msgText}>{item.text}</Text>
                  <Text style={styles.timeText}>
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            </>
          );
        }}
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#FFF8F9",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  backButton: { padding: 6 },
  backText: { fontFamily: "Koulen", fontSize: 18, color: "#000" },
  headerTitle: {
    fontFamily: "Koulen",
    fontSize: 28,
    marginLeft: 16,
    color: "#000",
  },

  bubbleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },

  bubble: {
    maxWidth: "75%",
    borderRadius: 20,
    padding: 12,
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

  dateSeparator: {
    alignSelf: "center",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginVertical: 10,
  },
  dateText: { fontFamily: "JetBrainsMono_400Regular", fontSize: 12, color: "#444" },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: { fontFamily: "JetBrainsMono_400Regular", fontSize: 16, color: "#000" },

  inputRow: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#FFF",
  },

  input: {
    flex: 1,
    backgroundColor: "#EEE",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 30,
    paddingHorizontal: 18,
    fontSize: 18,
    fontFamily: "Koulen",
    minHeight: 55,
    maxHeight: 120,
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
