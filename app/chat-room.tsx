import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

  const scrollToBottom = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };
 
  const sendMessage = () => {
    if (!text.trim()) return;

    addMessage(String(club), "You", text.trim());
    setText("");
    scrollToBottom();
  };

  return (
    <SafeAreaView style={styles.safeArea}> 
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>
 
      <Text style={styles.roomTitle}>{club}</Text>
      <Text style={styles.subtitle}>GENERAL CHAT</Text>
      <Text style={styles.today}>TODAY</Text>
 
      <FlatList
        ref={listRef}
        data={clubMessages}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "You" ? styles.bubbleYou : styles.bubbleOther,
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
        )}
        onContentSizeChange={scrollToBottom}
      />
 
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Send message"
          placeholderTextColor="#777"
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF", alignItems: "center" },

 backButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    fontFamily: "Koulen",
    color: "#000",
  },

  roomTitle: {
    marginTop: 100,
    fontFamily: "Koulen",
    fontSize: 32,
  },
  subtitle: {
    fontFamily: "Koulen",
    fontSize: 18,
    color: "#777",
  },
  today: {
    marginTop: 25,
    fontFamily: "Koulen",
    fontSize: 20,
    color: "#AAA",
  },

  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
  },
  bubbleYou: {
    backgroundColor: "#6D86B7",
    alignSelf: "flex-end",
  },
  bubbleOther: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
  },

  sender: {
    fontFamily: "Koulen",
    fontSize: 14,
    marginBottom: 2,
    color: "#444",
  },

  msgText: {
    fontFamily: "Koulen",
    fontSize: 18,
    color: "#000",
  },

  timeText: {
    marginTop: 4,
    fontFamily: "Koulen",
    fontSize: 12,
    color: "#444",
    alignSelf: "flex-end",
  },

  inputRow: {
    flexDirection: "row",
    width: "95%",
    position: "absolute",
    bottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "#EEE",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 30,
    height: 55,
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
  plus: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export { };

