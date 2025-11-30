import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useRef, useState, useEffect } from "react";

export default function ClubChat() {
  const router = useRouter();
  const { clubName } = useLocalSearchParams();

  const [messages, setMessages] = useState([
    { sender: clubName, text: `Welcome to the ${clubName} chat!` },
  ]);

  const [input, setInput] = useState("");

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "Me", text: input.trim() }]);
    setInput("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{clubName} - Chat</Text>

      <ScrollView
        ref={scrollRef}
        style={styles.messagesScroll}
        contentContainerStyle={{ paddingBottom: 170 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageWrapper,
              msg.sender === "Me"
                ? { alignSelf: "flex-end" }
                : { alignSelf: "flex-start" },
            ]}
          >
            <Text style={styles.senderName}>{msg.sender}</Text>

            <View
              style={[
                styles.messageBubble,
                msg.sender === "Me" ? styles.rightBubble : styles.leftBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === "Me" && { color: "#fff" },
                ]}
              >
                {msg.text}
              </Text>

              <Text style={styles.messageTime}>
                {msg.sender === "Me" ? "now" : "earlier"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a text message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSend}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push("/homescreen")}>
            <Text style={styles.menuIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/connect")}>
            <Text style={styles.menuIcon}>🧭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/chats")}>
            <Text style={styles.menuIcon}>💬</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/user-profile")}>
            <Text style={styles.menuIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

//
// STYLES (copied directly from your screenwriters-chat)
//

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "#FFF8F9",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
  },

  backText: {
    fontSize: 16,
    fontFamily: "JetBrainsMono_400Regular",
    color: "#000",
  },

  title: {
    fontSize: 36,
    fontFamily: "Koulen_400Regular",
    color: "#000",
    marginTop: 100,
    textAlign: "center",
  },

  messagesScroll: {
    flex: 1,
    width: "90%",
    marginTop: 30,
  },

  messageWrapper: {
    marginBottom: 26,
    maxWidth: "80%",
  },

  senderName: {
    fontSize: 14,
    fontFamily: "JetBrainsMono_400Regular",
    color: "#5c5c5c",
    marginBottom: 4,
  },

  messageBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },

  leftBubble: {
    backgroundColor: "#e5e5e5",
    borderTopLeftRadius: 4,
  },

  rightBubble: {
    backgroundColor: "#597aa4",
    borderTopRightRadius: 4,
  },

  messageText: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 16,
  },

  messageTime: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 12,
    color: "#5c5c5c",
    marginTop: 4,
    textAlign: "right",
  },

  inputContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 135 : 115,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#CFCFCF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  textInput: {
    flex: 1,
    height: 40,
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 15,
    color: "#000",
    paddingHorizontal: 16,
  },

  addButton: {
    marginLeft: 8,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#4b75b3",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
  },

  menu: {
    width: "90%",
    height: 80,
    backgroundColor: "#88E9FF",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  menuIcon: {
    fontSize: 28,
  },
});
