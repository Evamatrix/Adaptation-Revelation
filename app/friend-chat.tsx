import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, Text } from "react-native";
import MessageInput from "../src/components/Chat/MessageInput";
import MessageList from "../src/components/Chat/MessageList";
import Screen from "../src/components/Screen"; // <-- shared layout wrapper
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";

interface Message {
  sender: string;
  text: string;
  time: string;
}

export default function FriendChat() {
  const { name, friendName } = useLocalSearchParams();

  const chatName =
    Array.isArray(friendName)
      ? friendName[0]
      : friendName || (Array.isArray(name) ? name[0] : name) || "Friend";

  // Hooks must always run in the same order
  const fontsLoaded = useAppFonts();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: chatName,
      text: `Hey! It's ${chatName}.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { sender: "Me", text: input.trim(), time: timestamp }]);
    setInput("");
  };

  // Gate rendering, not hooks
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: Colors.background }}>
        <Text style={{ fontSize: 28, fontFamily: getFont("heading"), marginTop: 100 }}>
          {chatName}
        </Text>
        <MessageList messages={messages} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <MessageInput value={input} onChange={setInput} onSend={handleSend} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
}

