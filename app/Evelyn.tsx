import { useRouter } from "expo-router";
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EvelynPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
      <Text style={styles.title}>Evelyn H.</Text>
      
        <View style={styles.content}>
            <View style={styles.profilePic} />

            <Text style={styles.clubs}>6 clubs</Text>
            <Text style={styles.mutualFriends}>3 mutual friends</Text>
            <Text style={styles.interests}>6 interests</Text>

            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => router.push("/new-chat")}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
       </View>

      <View style={styles.footerContainer}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/homescreen')}>
            <Text style={styles.menuIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/connect')}>
            <Text style={styles.menuIcon}>🧭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/messages')}>
            <Text style={styles.menuIcon}>💬</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/user-profile')}>
            <Text style={styles.menuIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
  contentContainer: {
    width: "90%",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
    marginTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontFamily: "Koulen_400Regular",
    color: "#000",
    marginTop: 20,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
    marginTop: 40,
  },
  profilePic: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: "#5c5c5c",
    marginBottom: 20,
  },
  clubs: {
    fontSize: 20,
    fontFamily: "JetBrainsMono_400Regular",
    color: "#5c5c5c",
    textAlign: "left",
    marginBottom: 4,
  },
  mutualFriends: {
    fontSize: 20,
    fontFamily: "JetBrainsMono_400Regular",
    color: "#5c5c5c",
    marginBottom: 4,
    textAlign: "left",
  },
  interests: {
    fontSize: 20,
    fontFamily: "JetBrainsMono_400Regular",
    color: "#5c5c5c",
    marginBottom: 20,
    textAlign: "left",
  },
  interestsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
    marginBottom: 30,
  },
  interestCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  addButton: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
    backgroundColor: "#4b75b3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
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
