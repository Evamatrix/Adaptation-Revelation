import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { useClubs } from "../../context/ClubContext";
import { addMessage, getMessages, Message } from "../../store/chats";
import Screen from "../Screen";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

interface ClubChatProps {
  name?: string;
}

export default function ClubChat({ name }: ClubChatProps) {
  const chatName = name || "Club";
  const fontsLoaded = useAppFonts();
  const { getClubData, setClubData } = useClubs();

  const clubData = getClubData(chatName);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Load messages from AsyncStorage or ClubData
  useEffect(() => {
    (async () => {
      const storedMessages = await getMessages(chatName);
      if (storedMessages.length > 0) {
        setMessages(storedMessages);
      } else if (clubData.messages) {
        setMessages(clubData.messages);

        // Also add them to AsyncStorage so they persist
        for (const msg of clubData.messages) {
          await addMessage(chatName, msg);
        }
      }
    })();
  }, [chatName]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg: Message = { sender: "Me", text: input.trim(), time: timestamp };

    // Save to AsyncStorage
    const updated = await addMessage(chatName, newMsg);
    setMessages(updated);

    // Also save to ClubData in context
    setClubData(chatName, {
      messages: updated,
    });

    setInput("");
  };

    const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontFamily: getFont("heading"),
      color: Colors.text,
      marginTop: 50,
      marginBottom: 20,
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.background,
    },
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>{chatName}</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%", alignItems: "center" }}
        >
          <MessageList messages={messages} />
          <MessageInput value={input} onChange={setInput} onSend={handleSend} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
}
