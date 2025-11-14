import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useClubs } from "../src/context/ClubConText";

export default function Notifications() {
  const router = useRouter();
  const { notifications } = useClubs();   

  console.log("NOTIFICATIONS:", notifications);  

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>NOTIFICATIONS</Text>

      <View style={styles.box}>
        {notifications.length === 0 ? (
          <Text style={styles.empty}>NO NEW NOTIFICATIONS</Text>
        ) : (
          <ScrollView>
            {notifications.map((n) => (
              <Text key={n.id} style={styles.item}>
                • {n.message} ({n.time})
              </Text>
            ))}
          </ScrollView>
        )}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF", alignItems: "center" },

  backButton: {
    position: "absolute",
    top: 40,
    left: 15,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#FFF",
  },
  backText: { fontSize: 16, fontFamily: "Koulen", color: "#000" },

  title: {
    fontFamily: "Koulen",
    fontSize: 34,
    marginTop: 90,
    alignSelf: "flex-start",
    marginLeft: 30,
  },

  box: {
    width: "90%",
    height: 300,
    backgroundColor: "#D9D9D9",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },

  empty: {
    fontFamily: "Koulen",
    fontSize: 20,
    color: "#555",
  },

  item: {
    fontFamily: "Koulen",
    fontSize: 18,
    marginBottom: 10,
    color: "#000",
  },
});
