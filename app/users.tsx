import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EXTRA_TAGS = [
  "American", "African American", "Hispanic/Latino", "South Asian", "Southeast Asian", "Native American",
  "English", "Spanish", "Chinese", "Tagalog", "Hindi", "Vietnamese", "Arabic", "Korean", "Russian", "German", "Urdu", "Telugu",
  "Christian", "Muslim", "Hindu", "Jewish", "Buddhist",
  "Sports", "Music", "Reading", "Writing", "Film",
  "Cooking", "Finance", "Engineering", "Social",
  "Art", "Career", "Pre-med", "Science"
];

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
  "art", "career", "pre-med", "science"
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
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    users.forEach(u => u.tags.forEach(t => tagSet.add(t)));
    EXTRA_TAGS.forEach(tag => tagSet.add(tag));
    return Array.from(tagSet);
  }, [users]);

  const filteredUsers = users
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
    .filter(u => {
      if (selectedFilters.length === 0) return true;
      const lowerTags = u.tags.map(t => t.toLowerCase());
      return selectedFilters.some(f => lowerTags.includes(f.toLowerCase()));
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            placeholder="search users"
            style={styles.searchInput}
            placeholderTextColor="#777"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearch("")}
            >
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={styles.filterText}>FILTER</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
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
                onPress={() => !user.isFriend && addFriend(user.id)}
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

      <Modal visible={filterVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Filter Users</Text>
            <Text style={styles.modalSubtitle}>Tags</Text>

            <View style={styles.filterTagContainer}>
              {availableTags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterTag,
                    selectedFilters.includes(tag) && styles.filterTagActive,
                  ]}
                  onPress={() =>
                    setSelectedFilters(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    )
                  }
                >
                  <Text style={styles.filterTagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.clearFilterButton}
              onPress={() => {
                setSelectedFilters([]);
                setFilterVisible(false);
              }}
            >
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.closeModalText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff", alignItems: "center" },

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

  searchContainer: {
    flexDirection: "row",
    marginTop: 65,
    width: "90%",
    justifyContent: "space-between",
  },
  searchInputWrapper: {
    position: "relative",
    width: "68%",
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#ddd",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: { fontSize: 14, color: "#333" },

  filterButton: {
    width: "28%",
    height: 40,
    backgroundColor: "#FFB3A7",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    fontSize: 16,
    fontFamily: "JetBrainsMono_400Regular",
  },

  scrollContainer: { width: "90%", marginTop: 15 },

  userCard: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    padding: 14,
    backgroundColor: "#fff",
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "JetBrainsMono_400Regular",
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "JetBrainsMono_400Regular",
    marginBottom: 6,
  },

  filterTagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  filterTag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#EEE",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  filterTagActive: {
    backgroundColor: "#C9FDC9",
  },
  filterTagText: {
    fontFamily: "JetBrainsMono_400Regular",
  },

  clearFilterButton: {
    marginTop: 10,
    backgroundColor: "#FFD7D7",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  clearFilterText: {
    textAlign: "center",
    fontFamily: "JetBrainsMono_400Regular",
  },

  closeModalButton: {
    marginTop: 14,
    backgroundColor: "#D9E9FD",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  closeModalText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "JetBrainsMono_400Regular",
  },
});
