import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import { getFont } from "../../constants/fonts";
import MessageBubble from "./MessageBubble";

interface Message {
  sender: string;
  text: string;
  time: string;
}

interface MessageListProps {
  messages: Message[];
  onClubLinkPress?: (name: string) => void; // optional is fine
}

export default function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessageText = (text: string) => {
    const clubLinkRegex = /\/club-card\/([^\s\n]+)/;
    const match = text.match(clubLinkRegex);

    if (!match) return <Text style={styles.messageText}>{text}</Text>;

    const name = decodeURIComponent(match[1]);
    const before = text.slice(0, match.index);
    const after = text.slice((match.index ?? 0) + match[0].length);

    return (
      <Text style={styles.messageText}>
        {before}
        <Text
          style={styles.clubLink}
          onPress={() => router.push(`/club-card/${encodeURIComponent(name)}`)}
        >
          🔗 View {name}
        </Text>
        {after}
      </Text>
    );
  };

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
          text={renderMessageText(msg.text)}
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
  messageText: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: getFont("mono"),
  },
  clubLink: {
    color: Colors.primary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
