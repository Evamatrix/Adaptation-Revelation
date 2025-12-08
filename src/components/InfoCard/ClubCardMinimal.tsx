import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { useClubs } from "../../context/ClubContext";

interface Club {
  name: string;
  description: string;
  members: number;
  tags?: string[];
  joined?: boolean;
}

interface ClubCardMinimalProps {
  club: Club;
  index: number;
  toggleJoinClub: (clubName: string) => void;
}

export default function ClubCardMinimal({ club, index, toggleJoinClub }: ClubCardMinimalProps) {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const { setClubData } = useClubs();

  if (!fontsLoaded) return null;

  const handleJoin = () => {
    // Toggle join state
    setClubData(club.name, {
      joined: !club.joined,
      members: (club.members || 0) + (club.joined ? -1 : 1),
    });

    // Navigate straight to chat when joining
    if (!club.joined) {
      router.push(`/club-chat/${encodeURIComponent(club.name)}`);
    }
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      borderColor: Colors.text,
      borderRadius: 6,
      padding: 12,
      marginBottom: 16,
      backgroundColor: Colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontFamily: getFont("heading"),
      color: Colors.text,
    },
    buttonGroup: {
      flexDirection: "row",
    },
    actionButton: {
      borderWidth: 1.5,
      borderColor: Colors.text,
      borderRadius: 5,
      paddingVertical: 4,
      paddingHorizontal: 10,
      marginLeft: 8,
    },
    joinButton: { backgroundColor: Colors.success },
    leaveButton: { backgroundColor: Colors.error },
    shareButton: { backgroundColor: Colors.primary },
    buttonText: {
      fontFamily: getFont("mono"),
      fontSize: 14,
      color: Colors.text,
    },
    subtext: {
      fontSize: 14,
      fontFamily: getFont("mono"),
      color: Colors.subtext,
      marginTop: 6,
    },
    description: {
      fontSize: 14,
      fontFamily: getFont("mono"),
      color: Colors.subtext,
      marginTop: 4,
    },
    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 6,
    },
    tag: {
      backgroundColor: Colors.secondary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 6,
      marginBottom: 6,
    },
    tagText: {
      fontFamily: getFont("mono"),
      fontSize: 12,
      color: Colors.text,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{club.name}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              club.joined ? styles.leaveButton : styles.joinButton,
            ]}
            onPress={handleJoin}
          >
            <Text style={styles.buttonText}>
              {club.joined ? "LEAVE" : "JOIN"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={() => router.push(`/club-chat/${encodeURIComponent(club.name)}`)}
          >
            <Text style={styles.buttonText}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtext}>MEMBERS: {club.members}</Text>
      <Text style={styles.description}>{club.description}</Text>

      <View style={styles.tagContainer}>
        {(club.tags || []).map((tag, tagIndex) => (
          <View key={tagIndex} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
