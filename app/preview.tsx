import BackButton from "@/src/components/Button/BackButton";
import Taskbar from "@/src/components/Taskbar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ClubbCardMinimal from "../src/components/InfoCard/ClubCardMinimal"; // <-- import
import UserCardMinimal from "../src/components/InfoCard/UserCardMinimal";

export default function Preview() {
  // Example props for UserCardMinimal
  const exampleUser = {
    id: 1,
    name: "Alex",
    avatar: "https://i.pravatar.cc/150?u=1",
    tags: ["music", "coding", "reading"],
    isFriend: false,
  };

  // Example props for ClubbCardMinimal
  const exampleClub = {
    name: "Chess Club",
    description: "A club for chess enthusiasts to play and learn together.",
    members: 42,
    tags: ["strategy", "games", "social"],
    joined: false,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Component Preview</Text>

      {/* BackButton preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>BackButton</Text>
        <View style={{ height: 50, justifyContent: "center" }}>
          <BackButton />
        </View>
      </View>

      {/* Taskbar preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>Taskbar</Text>
        <Taskbar />
      </View>

      {/* UserCardMinimal preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>UserCardMinimal</Text>
        <UserCardMinimal
          user={exampleUser}
          onAddFriend={() => {
            console.log("Add friend clicked for preview");
          }}
        />
      </View>

      {/* ClubCardMinimal preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>ClubCardMinimal</Text>
        <ClubbCardMinimal
          club={exampleClub}
          index={0}
          toggleJoinClub={(clubName: string) => {
            console.log(`Toggle join clicked for ${clubName}`);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  componentWrapper: {
    marginBottom: 40,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  componentLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
});
