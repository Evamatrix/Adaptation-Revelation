import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import FriendChat from "../../src/components/Chat/FriendChat";

export default function FriendChatPage() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const chatName = Array.isArray(name) ? name[0] : name;

  const router = useRouter();

  const handleClubLinkPress = (clubName: string) => {
    // Navigate to the club page
    router.push(`/club-card/${encodeURIComponent(clubName)}`);
  };

  return (
    <View style={styles.container}>
      <FriendChat name={chatName} onClubLinkPress={handleClubLinkPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
