import { router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { useClubs } from "../../context/ClubContext";
import { addMessage, getMessages, Message } from "../../store/chats";
import Screen from "../Screen";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

interface FriendChatProps {
  name?: string;
  onClubLinkPress?: (clubName: string) => void;
}

export default function FriendChat({ name }: FriendChatProps) {
  const { setClubData } = useClubs();
  const chatName = name || "Friend";
  const fontsLoaded = useAppFonts();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Load messages from storage
  useEffect(() => {
    getMessages(chatName).then(setMessages);
  }, [chatName]);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { sender: "Me", text: input.trim(), time: timestamp };
    const updated = await addMessage(chatName, newMsg);
    setMessages(updated);
    setInput("");
  };

  // Handle clicking a club link
  const handleClubLinkPress = (clubName: string) => {
    router.push(`/club-card/${encodeURIComponent(clubName)}`);
  };

  return (
    <Screen>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{chatName}</Text>

        <MessageList messages={messages} onClubLinkPress={handleClubLinkPress} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.inputArea}
        >
          <MessageInput value={input} onChange={setInput} onSend={handleSend} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: Colors.background },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontFamily: getFont("heading"), color: Colors.text, marginTop: 50, marginBottom: 10 },
  messageArea: { width: "90%", flex: 1 },
  inputArea: { width: "90%", marginBottom: 20 },
});
