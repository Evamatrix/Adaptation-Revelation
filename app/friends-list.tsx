import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "../src/components/Screen";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { useFriends } from "../src/context/FriendsContext";
import { sessionState } from "../src/store/session";

const { width } = Dimensions.get("window");
const FIXED_WIDTH = Math.min(width * 0.9, 380);

export default function FriendsList() {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const { friends, addFriend, removeFriend } = useFriends();
  const [search, setSearch] = useState("");
  const [hasEvelyn, setHasEvelyn] = useState(sessionState.hasEvelyn);

  useEffect(() => {
    if (hasEvelyn && !friends.some((f) => f.name === "Evelyn")) {
      addFriend({ id: 9, name: "Evelyn", avatar: "https://i.pravatar.cc/100?img=9" });
    }
  }, [hasEvelyn]);

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>MY FRIENDS</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search friends..."
            placeholderTextColor="#A0A0A0"
            value={search}
            onChangeText={setSearch}
          />

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredFriends.map((friend) => (
              <View key={friend.id} style={styles.friendRow}>
                <TouchableOpacity
                  style={styles.friendInfo}
                  onPress={() =>
                    router.push({
                      pathname: "/chat/[name]",
                      params: { name: friend.name },
                    })
                  }
                >
                  <Image source={{ uri: friend.avatar }} style={styles.avatar} />
                  <Text style={styles.friendName}>{friend.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFriend(friend.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: getFont("heading"),
    color: Colors.text,
    marginTop: 50,
    marginBottom: 20,
  },
  searchInput: {
    width: FIXED_WIDTH,
    height: 44,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.backgroundSecondary ?? "#fff8f9",
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: getFont("mono"),
    color: Colors.text,
    marginBottom: 20,
    alignSelf: "center",
  },
  scrollContainer: { paddingBottom: 100 },
  friendRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary ?? "#FFF8F9",
    padding: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 12,
  },
  friendName: {
    fontSize: 20,
    fontFamily: getFont("heading"),
    color: Colors.text,
  },
  removeButton: {
    backgroundColor: Colors.error ?? "#ffcccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 10,
  },
  removeText: {
    fontFamily: getFont("mono"),
    fontSize: 14,
    color: Colors.text,
  },
});
