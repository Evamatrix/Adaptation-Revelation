import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ClubCardCompact from "../src/components/InfoCard/ClubCardCompact";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { useClubs } from "../src/context/ClubContext";

export default function JoinedClubsPage() {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const { clubs } = useClubs();

  if (!fontsLoaded) return null;

  const joinedClubs = clubs.filter(c => c.joined);

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
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joined Clubs</Text>
      <ScrollView>
        {joinedClubs.length === 0 ? (
          <Text style={styles.emptyText}>You haven’t joined any clubs yet.</Text>
        ) : (
          joinedClubs.map((club, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/club-chat",
                  params: { clubName: club.name },
                })
              }
            >
              <ClubCardCompact
                name={club.name}
                image={require("../src/assets/images/splash-icon.png")}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
