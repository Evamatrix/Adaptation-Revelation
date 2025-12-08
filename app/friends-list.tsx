import { useLocalSearchParams, useRouter } from "expo-router";
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
import Screen from "../src/components/Screen"; // shared layout wrapper
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { sessionState } from "../src/store/session";

const friendsData = [
  { id: 1, name: "Alex", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Jamie", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Taylor", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Jordan", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Riley", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "Sam", avatar: "https://i.pravatar.cc/100?img=6" },
  { id: 7, name: "Casey", avatar: "https://i.pravatar.cc/100?img=7" },
  { id: 8, name: "Morgan", avatar: "https://i.pravatar.cc/100?img=8" },
];

const { width } = Dimensions.get("window");
const FIXED_WIDTH = Math.min(width * 0.9, 380);

export default function FriendsList() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Hooks must always run in the same order
  const fontsLoaded = useAppFonts();
  const [search, setSearch] = useState("");
  const [hasEvelyn, setHasEvelyn] = useState(sessionState.hasEvelyn);

  useEffect(() => {
    if (params.addEvelyn === "true") {
      sessionState.hasEvelyn = true;
      setHasEvelyn(true);
    }
  }, [params]);

  const allFriends = hasEvelyn
    ? [...friendsData, { id: 9, name: "Evelyn", avatar: "https://i.pravatar.cc/100?img=9" }]
    : friendsData;

  const filteredFriends = allFriends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  // Gate rendering, not hooks
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
              <TouchableOpacity
                key={friend.id}
                style={styles.friendRow}
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
});
