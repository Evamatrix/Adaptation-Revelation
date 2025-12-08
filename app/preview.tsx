import BackButton from "@/src/components/Button/BackButton";
import Taskbar from "@/src/components/Taskbar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ClubCardMinimal from "../src/components/InfoCard/ClubCardMinimal";
import UserCardAdd from "../src/components/InfoCard/UserCardAdd"; // <-- new import
import UserCardMinimal from "../src/components/InfoCard/UserCardMinimal";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";

export default function Preview() {
  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) return null;

  // Example props for UserCardMinimal
  const exampleUser = {
    id: 1,
    name: "Alex",
    avatar: "https://i.pravatar.cc/150?u=1",
    tags: ["music", "coding", "reading"],
    isFriend: false,
  };

  // Example props for ClubCardMinimal
  const exampleClub = {
    name: "Chess Club",
    description: "A club for chess enthusiasts to play and learn together.",
    members: 42,
    tags: ["strategy", "games", "social"],
    joined: false,
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: "stretch",
      backgroundColor: Colors.background,
    },
    title: {
      fontSize: 24,
      fontFamily: getFont("heading"),
      marginBottom: 20,
      color: Colors.text,
    },
    componentWrapper: {
      marginBottom: 40,
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      shadowColor: Colors.text,
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    componentLabel: {
      fontSize: 16,
      fontFamily: getFont("mono"),
      marginBottom: 10,
      color: Colors.text,
    },
  });

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
        <ClubCardMinimal
          club={exampleClub}
          index={0}
          toggleJoinClub={(clubName: string) => {
            console.log(`Toggle join clicked for ${clubName}`);
          }}
        />
      </View>

      {/* UserCardAdd preview */}
      <View style={styles.componentWrapper}>
        <Text style={styles.componentLabel}>UserCardAdd</Text>
        <UserCardAdd
          name="Evelyn H."
          clubs={6}
          mutualFriends={3}
          interests={6}
          onAdd={() => {
            console.log("Add Evelyn clicked for preview");
          }}
        />
      </View>
    </ScrollView>
  );
}
