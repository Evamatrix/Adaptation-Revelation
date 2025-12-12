import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { addMessage, getMessages, Message } from "../../store/chats";
import Screen from "../Screen";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

interface FriendChatProps {
  name?: string;
}

export default function FriendChat({ name }: FriendChatProps) {
  const chatName = name || "Friend";

  const fontsLoaded = useAppFonts();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Load messages from AsyncStorage when component mounts
  useEffect(() => {
    getMessages(chatName).then(setMessages);
  }, [chatName]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { sender: "Me", text: input.trim(), time: timestamp };
    const updated = await addMessage(chatName, newMsg);
    setMessages(updated);
    setInput("");
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.background, alignItems: "center", marginBottom: 20 },
    title: {
      fontSize: 28,
      fontFamily: getFont("heading"),
      color: Colors.text,
      marginTop: 50,
      marginBottom: 10,
      textAlign: "center",
    },
  });

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>{chatName}</Text>
        <MessageList messages={messages} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style = {{ width: "90%" }}>
          <MessageInput value={input} onChange={setInput} onSend={handleSend} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
}
