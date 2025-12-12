import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Screen from "../../src/components/Screen";
import Colors from "../../src/constants/colors";
import { getFont, useAppFonts } from "../../src/constants/fonts";
import { useClubs } from "../../src/context/ClubContext";

export default function ClubPage() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const fontsLoaded = useAppFonts();
  const { getClubData, setClubData } = useClubs();

  const clubName = decodeURIComponent(name || "");
  const club = getClubData(clubName);

  if (!fontsLoaded || !clubName || !club) {
    return null;
  }

  const handleJoin = () => {
    // Toggle joined state
    setClubData(clubName, {
      joined: !club.joined,
      members: (club.members || 0) + (club.joined ? -1 : 1),
    });

    // If joining, navigate to club chat
    if (!club.joined) {
      router.push(`/club-chat/${encodeURIComponent(clubName)}`);
    }
  };

  return (
    <Screen>
    <View style={styles.container}>
      <Text style={styles.title}>{clubName}</Text>
      {club.description && <Text style={styles.description}>{club.description}</Text>}

      <Text style={styles.members}>Members: {club.members}</Text>

      {Array.isArray(club.tags) && club.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {club.tags.map((t, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={handleJoin}
        style={[styles.joinButton, club.joined && styles.leaveButton]}
      >
        <Text style={styles.joinButtonText}>{club.joined ? "Leave Club" : "Join Club"}</Text>
      </TouchableOpacity>
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 100, backgroundColor: Colors.background },
  title: { fontSize: 28, fontFamily: getFont("heading"), color: Colors.text, marginBottom: 10 },
  description: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.subtext, marginBottom: 20 },
  members: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text, marginBottom: 12 },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  tag: { backgroundColor: Colors.secondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginRight: 6, marginBottom: 6 },
  tagText: { color: Colors.text, fontFamily: getFont("mono") },
  joinButton: { backgroundColor: Colors.success, padding: 14, borderRadius: 12, alignItems: "center" },
  leaveButton: { backgroundColor: Colors.error },
  joinButtonText: { color: Colors.text, fontFamily: getFont("mono"), fontSize: 18, fontWeight: "600" },
});
