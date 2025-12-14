import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { useFriends } from "../../context/FriendsContext";
import showSuccess from "../../utils/showToast";

interface MessageBubbleProps {
  sender: string;
  text: React.ReactNode;
  time: string;
  isMine: boolean;
}

export default function MessageBubble({ sender, text, time, isMine }: MessageBubbleProps) {
  const fontsLoaded = useAppFonts();
  const { friends, addFriend, removeFriend } = useFriends();
  if (!fontsLoaded) return null;
  const isFriend = friends.some((f) => f.name === sender);

  const handleToggleFriend = () => {
    const existing = friends.find((f) => f.name === sender);
    if (existing) {
      // remove friend and show toast
      removeFriend(existing.id);
      showSuccess(`${sender} removed from friends`);
      return;
    }
    // add friend and show toast
    const nextId = (friends.reduce((max, f) => Math.max(max, f.id), 0) || 0) + 1;
    addFriend({ 
      id: nextId, 
      name: sender, 
      avatar: `https://i.pravatar.cc/100?u=${encodeURIComponent(sender)}` 
    });
    showSuccess(`${sender} added to friends`);
  };

  return (
    <View style={[styles.wrapper, isMine ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }]}>
      <View style={styles.senderRow}>
        <Text style={styles.sender}>{sender}</Text>
        {!isMine && (
          <Pressable onPress={handleToggleFriend} style={styles.iconButton} accessibilityLabel={isFriend ? "Added" : "Add friend"}>
            <Image
              source={isFriend ? require("../../assets/images/user-added.png") : require("../../assets/images/add-user.png")}
              style={{ width: 25, height: 25, marginBottom: 14,}}
            />
          </Pressable>
        )}
      </View>
      <View style={[styles.bubble, isMine ? styles.rightBubble : styles.leftBubble]}>
        {typeof text === "string" ? (
          <Text style={[styles.text, isMine && { color: Colors.background }]}>{text}</Text>
        ) : (
          text 
        )}
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20, maxWidth: "80%" },
  sender: {
    fontSize: 14,
    fontFamily: getFont("mono"),
    color: Colors.muted,
    marginBottom: 4,
  },
  senderRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconButton: { 
    marginLeft: 4 
  },
  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  leftBubble: {
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 4,
  },
  rightBubble: {
    backgroundColor: Colors.tertiary,
    borderTopRightRadius: 4,
  },
  text: {
    fontFamily: getFont("mono"),
    fontSize: 16,
  },
  time: {
    fontFamily: getFont("mono"),
    fontSize: 12,
    color: Colors.subtext,
    marginTop: 4,
    textAlign: "right",
  },
});
