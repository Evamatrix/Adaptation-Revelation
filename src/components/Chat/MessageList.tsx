import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import MessageBubble from "./MessageBubble";

interface Message {
  sender: string;
  text: string;
  time: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: 0 }}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          sender={msg.sender}
          text={msg.text}
          time={msg.time}
          isMine={msg.sender === "Me"}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "90%",
    marginTop: 20,
  },
});
