import { useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Screen from "../src/components/Screen";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { useClubs } from "../src/context/ClubContext";


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();


export default function HomeScreen() {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const { allClubs } = useClubs();
  const insets = useSafeAreaInsets();

  if (!fontsLoaded) return null;
  SplashScreen.hideAsync();
  
  const joinedClubs = Object.entries(allClubs).filter(([_, c]) => c.joined);

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.background, paddingBottom: insets.bottom },
    container: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 80, // 👈 extra space for back button
      paddingBottom: 140,
    },
    sectionTitle: {
      fontSize: 22,
      fontFamily: getFont("heading"),
      color: Colors.text,
      marginBottom: 10,
      textTransform: "uppercase",
    },
    networkBox: {
      height: 220,
      borderWidth: 2,
      borderColor: Colors.text,
      borderRadius: 12,
      backgroundColor: Colors.backgroundSecondary,
      marginBottom: 30,
    },
    clubRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderColor: Colors.subtext,
    },
    clubIcon: {
      width: 55,
      height: 55,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: Colors.text,
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    clubIconText: { fontSize: 18, fontFamily: getFont("mono"), color: Colors.text },
    clubName: { fontSize: 20, fontFamily: getFont("mono"), color: Colors.text },
    emptyText: {
      fontFamily: getFont("mono"),
      fontSize: 16,
      color: Colors.subtext,
      marginBottom: 12,
      textAlign: "center",
    },
    joinClubButton: {
      backgroundColor: Colors.tertiary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.text,
    },
    joinClubText: { fontFamily: getFont("mono"), fontSize: 16, color: Colors.text },
    infoBlock: { marginBottom: 26 },
    infoValue: {
      fontSize: 18,
      fontFamily: getFont("mono"),
      color: Colors.subtext,
      textAlign: "center",
    },
    notificationBox: {
      height: 200,
      borderWidth: 2,
      borderColor: Colors.text,
      borderRadius: 12,
      backgroundColor: Colors.primary,
      justifyContent: "center",
    },
  });

  return (
    <Screen>
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* My Network */}
        <Text style={styles.sectionTitle}>MY NETWORK</Text>
        <View style={styles.networkBox}>
          <ScrollView contentContainerStyle={{ padding: 12 }}>
            {joinedClubs.length > 0 ? (
              joinedClubs.map(([name]) => (
                <TouchableOpacity
                  key={name}
                  style={styles.clubRow}
                  onPress={() => router.push(`/club-chat/${encodeURIComponent(name)}`)}
                >
                  <View style={styles.clubIcon}>
                    <Text style={styles.clubIconText}>{name[0]}</Text>
                  </View>
                  <Text style={styles.clubName}>{name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.emptyText}>You haven’t joined any clubs yet.</Text>
                <TouchableOpacity
                  onPress={() => router.push("/club-explore")}
                  style={styles.joinClubButton}
                >
                  <Text style={styles.joinClubText}>Browse Clubs</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Notifications */}
        <View style={styles.infoBlock}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          <View style={styles.notificationBox}>
            <Text style={styles.infoValue}>NO NEW NOTIFICATIONS</Text>
          </View>
        </View>
      </ScrollView>
    </View>
    </Screen>
  );
}
