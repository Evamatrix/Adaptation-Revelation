import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import UserCardMinimal, { MinimalUser } from "../src/components/InfoCard/UserCardMinimal"; // adjust path
import Screen from "../src/components/Screen";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { useFriends } from "../src/context/FriendsContext";

export default function DiscoverUsers() {
  const fontsLoaded = useAppFonts();
  const { friends, addFriend, removeFriend } = useFriends();

  // Example discoverable users
  const discoverableUsers: MinimalUser[] = [
    {
      id: 101,
      name: "Chris",
      avatar: "https://i.pravatar.cc/100?img=10",
      tags: ["Sports", "Music"],
      isFriend: friends.some((f) => f.id === 101),
    },
    {
      id: 102,
      name: "Pat",
      avatar: "https://i.pravatar.cc/100?img=11",
      tags: ["Cooking", "Finance"],
      isFriend: friends.some((f) => f.id === 102),
    },
    {
      id: 103,
      name: "Dana",
      avatar: "https://i.pravatar.cc/100?img=12",
      tags: ["Reading", "Film"],
      isFriend: friends.some((f) => f.id === 103),
    },
  ];

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts…</Text>
      </SafeAreaView>
    );
  }

  const handleToggleFriend = (id: number) => {
    const user = discoverableUsers.find((u) => u.id === id);
    if (!user) return;

    if (friends.some((f) => f.id === id)) {
      removeFriend(id);
    } else {
      addFriend({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        tags: user.tags,
      });
    }
  };

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>DISCOVER USERS</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {discoverableUsers.map((user) => (
            <UserCardMinimal
              key={user.id}
              user={user}
              onAddFriend={handleToggleFriend} // 👈 toggles add/remove
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  title: {
    fontSize: 28,
    fontFamily: getFont("heading"),
    color: Colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: { paddingBottom: 100, paddingHorizontal: 20 },
});
