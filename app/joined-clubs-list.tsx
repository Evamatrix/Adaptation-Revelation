import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ClubCardCompact from "../src/components/InfoCard/ClubCardCompact";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { useClubs } from "../src/context/ClubContext";

export default function JoinedClubsPage() {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const { allClubs } = useClubs();

  if (!fontsLoaded) return null;

  // Collect only joined clubs
  const joinedClubs = Object.entries(allClubs).filter(([_, club]) => club.joined);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
    title: {
      fontFamily: getFont("heading"),
      fontSize: 22,
      color: Colors.text,
      marginBottom: 16,
    },
    emptyText: {
      fontFamily: getFont("mono"),
      fontSize: 16,
      color: Colors.subtext,
      textAlign: "center",
      marginTop: 40,
    },
    browseButton: {
      marginTop: 12,
      backgroundColor: Colors.tertiary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.text,
      alignSelf: "center",
    },
    browseText: {
      fontFamily: getFont("mono"),
      fontSize: 16,
      color: Colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joined Clubs</Text>
      <ScrollView>
        {joinedClubs.length === 0 ? (
          <>
            <Text style={styles.emptyText}>You haven’t joined any clubs yet.</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push("/clubs")}
            >
              <Text style={styles.browseText}>Browse Clubs</Text>
            </TouchableOpacity>
          </>
        ) : (
          joinedClubs.map(([name]) => (
            <TouchableOpacity
              key={name}
              onPress={() =>
                router.push({
                  pathname: "/club-chat",
                  params: { clubName: name },
                })
              }
            >
              <ClubCardCompact
                name={name}
                image={require("../src/assets/images/splash-icon.png")}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
