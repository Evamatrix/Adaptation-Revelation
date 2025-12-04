import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

type User = {
  id: number;
  name: string;
  avatar: string;
  tags: string[];
  isFriend: boolean;
};
 
const RANDOM_NAMES = [
  "Alex", "Jamie", "Taylor", "Jordan", "Riley", "Sam", "Casey",
  "Morgan", "Evelyn", "Aiden", "Noah", "Liam", "Chloe", "Ava"
];

const RANDOM_TAGS = [
  "music", "writing", "coding", "sports", "film",
  "english", "finance", "food", "social", "gaming",
];

function generateRandomUser(id: number): User {
  const randomTags = [...RANDOM_TAGS]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 2);

  return {
    id,
    name: RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)],
    avatar: `https://i.pravatar.cc/150?u=${id}`,
    tags: randomTags,
    isFriend: false,
  };
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  // Generate 10 users everytime user page is reloaded
  useEffect(() => {
    const newUsers = Array.from({ length: 10 }, (_, i) =>
      generateRandomUser(i + 1)
    );
    setUsers(newUsers);
  }, []);

  const addFriend = (id: number) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, isFriend: true } : u))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {users.map((user) => (
          <View key={user.id} style={styles.userCard}>
            {/* HEADER */}
            <View style={styles.userHeaderRow}>
              <View style={styles.userHeaderLeft}>
                <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                <Text style={styles.userTitle}>{user.name}</Text>
              </View>
            </View>

            {/* TAGS */}
            <View style={styles.tagContainer}>
              {user.tags.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  user.isFriend ? styles.friendAdded : styles.addFriendButton,
                ]}
                onPress={() => {
                  if (!user.isFriend) addFriend(user.id);
                }}
              >
                <Text style={styles.buttonText}>
                  {user.isFriend ? "FRIENDS ✓" : "ADD FRIEND"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.messageButton]}
                onPress={() =>
                  router.push({
                    pathname: "/club-chat",
                    params: {
                      clubName: user.name,
                      msg: `Hey ${user.name}!`,
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>MESSAGE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footerContainer}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push("/homescreen")}>
            <Text style={styles.menuIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/connect")}>
            <Text style={styles.menuIcon}>🧭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/chats")}>
            <Text style={styles.menuIcon}>💬</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/user-profile")}>
            <Text style={styles.menuIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// STYLES

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "#FFF8F9",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    fontFamily: "JetBrainsMono_400Regular",
    color: "#000",
  },

  scrollContainer: {
    width: "90%",
    marginTop: 100,
  },

  userCard: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    padding: 14,
    backgroundColor: "#FFFFFF",
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
    borderColor: "#000",
  },

  userTitle: {
    fontSize: 22,
    color: "#000",
    fontFamily: "JetBrainsMono_400Regular",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },

  tag: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "JetBrainsMono_400Regular",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  actionButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },

  addFriendButton: {
    backgroundColor: "#C9FDC9",
  },

  friendAdded: {
    backgroundColor: "#E0E0E0",
  },

  messageButton: {
    backgroundColor: "#D9E9FD",
  },

  buttonText: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 14,
    color: "#000",
  },

  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingBottom: 20,
  },
  menu: {
    width: "90%",
    height: 80,
    backgroundColor: "#88E9FF",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 28,
  },
});
