import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { useClubs } from "../../context/ClubContext";
import { useFriends } from "../../context/FriendsContext";
import { addMessage as addStoredMessage } from "../../store/chats";



interface Club {
  name: string;
  description: string;
  members: number;
  tags?: string[];
  joined?: boolean;
}

interface Friend {
  id: number;
  name: string;
}

interface ClubCardMinimalProps {
  club: Club;
  index: number;
  toggleJoinClub: (clubName: string) => void;
  friends?: Friend[];
}

export default function ClubCardMinimal({
  club,
  index,
  toggleJoinClub,
  friends = [],
}: ClubCardMinimalProps) {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const { setClubData } = useClubs();

  const [showShare, setShowShare] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const { addMessage } = useFriends();

  if (!fontsLoaded) return null;

  const handleJoin = () => {
    setClubData(club.name, {
      joined: !club.joined,
      members: (club.members || 0) + (club.joined ? -1 : 1),
    });

    if (!club.joined) {
      router.push(`/club-chat/${encodeURIComponent(club.name)}`);
    }
  };

  const toggleFriendSelection = (id: number) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSendShare = async () => {
    if (/*!shareMessage.trim() ||*/ selectedFriends.length === 0) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    for (const friendId of selectedFriends) {
      const friend = friends.find((f) => f.id === friendId);
      if (!friend) continue;

      const fullMessage = {
        sender: "Me",
        text: `${shareMessage.trim()}\nCheck out this club → /club-card/${encodeURIComponent(club.name)}`,
        time: timestamp,
      };
      await addStoredMessage(friend.name, fullMessage);
    }

    // Reset UI
    setShareMessage("");
    setSelectedFriends([]);
    setShowShare(false);

    //Toast message
    Toast.show({
      type: 'success',
      text2: 'Club shared successfully!',
      visibilityTime: 2000,
      topOffset: 68
    });
  };


  const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      borderColor: Colors.text,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingTop: 5,
      paddingRight: 5,
      marginBottom: 16,
      backgroundColor: Colors.background,
      marginHorizontal: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontFamily: getFont("heading"),
      color: Colors.text,
    },
    buttonGroup: {
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8,
    },
    actionButton: {
      borderWidth: 1.5,
      borderColor: Colors.text,
      borderRadius: 5,
      paddingVertical: 4,
      paddingHorizontal: 10,
      marginLeft: 8,
    },
    joinButton: { backgroundColor: Colors.success },
    leaveButton: { backgroundColor: Colors.error },
    shareButton: { backgroundColor: Colors.primary },
    buttonText: {
      fontFamily: getFont("mono"),
      fontSize: 14,
      color: Colors.text,
    },
    subtext: {
      fontSize: 14,
      fontFamily: getFont("mono"),
      color: Colors.subtext,
      marginTop: 6,
    },
    description: {
      fontSize: 14,
      fontFamily: getFont("mono"),
      color: Colors.subtext,
      marginTop: 4,
    },
    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 6,
    },
    tag: {
      backgroundColor: Colors.secondary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 6,
      marginBottom: 6,
    },
    tagText: {
      fontFamily: getFont("mono"),
      fontSize: 12,
      color: Colors.text,
    },
    sharePanel: {
      marginTop: 12,
      padding: 10,
      backgroundColor: "#f4f4f4",
      borderRadius: 6,
    },
    input: {
      marginTop: 8,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 6,
      fontFamily: getFont("mono"),
      fontSize: 14,
      marginBottom: 0,
      color: Colors.text,
    },
    friendsLabel: {
      fontFamily: getFont("mono"),
      fontSize: 12,
      marginBottom: 4,
      color: Colors.text,
    },
    friendButton: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: Colors.secondary,
      marginRight: 6,
    },
    friendSelected: { backgroundColor: Colors.tertiary },
    friendText: { fontFamily: getFont("mono"), color: Colors.text },
    friendTextSelected: { fontWeight: "bold", color: "#fff" },
    shareActions: { flexDirection: "row", marginTop: 8 },
    sendButton: { backgroundColor: Colors.success },
    cancelButton: { backgroundColor: Colors.error, marginLeft: 8 },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{club.name}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.actionButton, club.joined ? styles.leaveButton : styles.joinButton]}
            onPress={handleJoin}
          >
            <Text style={styles.buttonText}>{club.joined ? "LEAVE" : "JOIN"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={() => setShowShare((prev) => !prev)}
          >
            <Ionicons name="share" size={20} color="black" />
          </TouchableOpacity>
        </View>

      </View>

      <Text style={styles.subtext}>MEMBERS: {club.members}</Text>
      <Text style={styles.description}>{club.description}</Text>

      <View style={styles.tagContainer}>
        {(club.tags || []).map((tag, tagIndex) => (
          <View key={tagIndex} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {showShare && (
        <View style={styles.sharePanel}>

          <Text style={styles.friendsLabel}>Send to:</Text>
          <FlatList
            horizontal
            data={friends}
            keyExtractor={(f) => f.id.toString()}
            renderItem={({ item }) => {
              const selected = selectedFriends.includes(item.id);
              return (
                <TouchableOpacity
                  onPress={() => toggleFriendSelection(item.id)}
                  style={[styles.friendButton, selected && styles.friendSelected]}
                >
                  <Text style={[styles.friendText, selected && styles.friendTextSelected]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            placeholderTextColor="#888"
            value={shareMessage}
            onChangeText={setShareMessage}
          />

          <View style={styles.shareActions}>
            <TouchableOpacity style={[styles.actionButton, styles.sendButton]} onPress={handleSendShare}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => setShowShare(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
