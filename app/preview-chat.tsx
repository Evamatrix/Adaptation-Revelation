import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../src/components/Button/BackButton";
import MessageInput from "../src/components/Chat/MessageInput";
import MessageList from "../src/components/Chat/MessageList";
import Taskbar from "../src/components/Taskbar";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";

export default function PreviewChat() {
  const fontsLoaded = useAppFonts();

  // Hooks must always run
  const [messages, setMessages] = useState([
    { sender: "System", text: "Welcome to the preview chat!" },
    { sender: "Alex", text: "Hey there 👋" },
    { sender: "Me", text: "Hi Alex, testing the chat UI." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "Me", text: input.trim() }]);
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

      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>BackButton</Text>
        <BackButton />
      </View>

      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>Taskbar</Text>
        <Taskbar />
      </View>

      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>MessageList</Text>
        <MessageList messages={messages} />
      </View>

      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>MessageInput</Text>
        <MessageInput value={input} onChange={setInput} onSend={handleSend} />
      </View>
    </ScrollView>
  );
}
