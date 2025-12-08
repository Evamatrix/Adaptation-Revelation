import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../src/components/Button/BackButton";
import MessageInput from "../src/components/Chat/MessageInput";
import MessageList from "../src/components/Chat/MessageList";
import Taskbar from "../src/components/Taskbar";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";

interface Message {
  sender: string;
  text: string;
  time: string;
}

export default function PreviewChat() {
  const fontsLoaded = useAppFonts();

  // Hooks must always run, regardless of fontsLoaded
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "System",
      text: "Welcome to the preview chat!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    {
      sender: "Alex",
      text: "Hey there 👋",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    {
      sender: "Me",
      text: "Hi Alex, testing the chat UI.",
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

  // Gate the UI, not the hooks
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background }}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: "stretch",
      backgroundColor: Colors.background,
    },
    title: {
      fontSize: 24,
      fontFamily: getFont("heading"),
      marginBottom: 20,
      color: Colors.text,
    },
    componentWrapper: {
      marginBottom: 40,
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      shadowColor: Colors.text,
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    componentLabel: {
      fontSize: 16,
      fontFamily: getFont("mono"),
      marginBottom: 10,
      color: Colors.text,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chat Component Preview</Text>

      {/* BackButton preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>BackButton</Text>
        <BackButton />
      </View>

      {/* Taskbar preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>Taskbar</Text>
        <Taskbar />
      </View>

      {/* MessageList preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>MessageList</Text>
        <MessageList messages={messages} />
      </View>

      {/* MessageInput preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>MessageInput</Text>
        <MessageInput value={input} onChange={setInput} onSend={handleSend} />
      </View>
    </ScrollView>
  );
}
