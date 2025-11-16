import { useRouter } from "expo-router";
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ScreenwritersChat() {
  const router = useRouter();

  const messages = [
    { sender: "Evelyn H.", text: "is anyone in PHIL 2020?" },
    { sender: "Me", text: "I am!" },
    { sender: "Evelyn H.", text: "Did you do hw 3?" },
    { sender: "Me", text: "Ya I’ll dm you" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Screen Writers - General Chat</Text>

      <View style={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageWrapper,
              msg.sender === "Evelyn H."
                ? { alignSelf: "flex-start" }
                : { alignSelf: "flex-end" },
            ]}
          >
            {msg.sender === "Evelyn H." ? (
                <TouchableOpacity onPress={() => router.push("/Evelyn")}>
                <Text style={styles.senderName}>{msg.sender}</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.senderName}>{msg.sender}</Text>
            )}

            <View
              style={[
                styles.messageBubble,
                msg.sender === "Evelyn H." ? styles.leftBubble : styles.rightBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === "Me" ? { color: "#fff" } : { color: "#000" },
                ]}
              >
                {msg.text}
              </Text>
              <Text style={styles.messageTime}>
                {msg.sender === "Me" ? "11:47 am" : "10:05 am"}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Static Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a text message"
          placeholderTextColor="#888"
          editable={false}
        />
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </View>

      {/* Footer */}
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
  messagesContainer: {
    flex: 1,
    width: "90%",
    marginTop: 30,
    paddingBottom: 100,
  },
  messageWrapper: {
    marginBottom: 20,
  },
  senderName: {
    fontSize: 14,
    fontFamily: "JetBrainsMono_400Regular",
    color: "#5c5c5c",
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 8,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "column",
  },
  leftBubble: {
    backgroundColor: "#d9d9d9",
  },
  rightBubble: {
    backgroundColor: "#597aa4",
  },
  messageText: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 16,
    flexShrink: 1,
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
    bottom: Platform.OS === "ios" ? 140 : 120,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 48,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 16,
    backgroundColor: "#f2f2f2",
    color: "#000",
  },
  addButton: {
    marginLeft: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4b75b3",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "JetBrainsMono_400Regular",
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
