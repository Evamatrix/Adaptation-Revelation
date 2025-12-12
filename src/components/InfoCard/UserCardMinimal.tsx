import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";

export type MinimalUser = {
  id: number;
  name: string;
  avatar: string;
  tags: string[];
  isFriend: boolean;
};

type Props = {
  user: MinimalUser;
  onAddFriend: (id: number) => void;
};

export default function UserCardMinimal({ user, onAddFriend }: Props) {
    const router = useRouter();
    const fontsLoaded = useAppFonts();
    
    if (!fontsLoaded) return null; // wait until fonts load

    const styles = StyleSheet.create({
        userCard: {
            borderWidth: 2,
            borderColor: Colors.text,
            borderRadius: 6,
            padding: 14,
            backgroundColor: Colors.background,
            marginBottom: 18,
        },

        userHeaderRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },

        userHeaderLeft: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },

        userAvatar: {
            width: 55,
            height: 55,
            borderRadius: 28,
            borderWidth: 2,
            borderColor: Colors.text,
        },

        userTitle: {
            fontSize: 22,
            color: Colors.text,
            fontFamily: getFont("heading"),
        },

        tagContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 10,
        },

        tag: {
            backgroundColor: Colors.secondary,
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
        },
        tagText: {
            fontSize: 12,
            fontFamily: getFont("mono"),
        },

        buttonRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
        },

        actionButton: {
            flex: 1,
            borderWidth: 1.5,
            borderColor: Colors.text,
            borderRadius: 5,
            paddingVertical: 8,
            marginHorizontal: 4,
            alignItems: "center",
        },

        addFriendButton: {
            backgroundColor: Colors.success,
        },

        friendAdded: {
            backgroundColor: Colors.error,
        },

        messageButton: {
            backgroundColor: Colors.primary,
        },

        buttonText: {
            fontFamily: getFont("mono"),
            fontSize: 14,
            color: Colors.text,
        },
    });

  return (
    <View style={styles.userCard}>
      <View style={styles.userHeaderRow}>
        <View style={styles.userHeaderLeft}>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          <Text style={styles.userTitle}>{user.name}</Text>
        </View>
      </View>

      <View style={styles.tagContainer}>
        {user.tags.map((tag, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            user.isFriend ? styles.friendAdded : styles.addFriendButton,
          ]}
          onPress={() => onAddFriend(user.id)}
        >
          <Text style={styles.buttonText}>
            {user.isFriend ? "REMOVE FRIEND" : "ADD FRIEND"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.messageButton]}
          onPress={() =>
            {router.push(`/chat/${user.name}`); }
          }
        >
          <Text style={styles.buttonText}>MESSAGE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}