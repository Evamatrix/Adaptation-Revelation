// src/components/InfoCard/UserCardAdd.tsx
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";

interface UserCardAddProps {
  name: string;
  clubs: number;
  mutualFriends: number;
  interests: number;
  onAdd: () => void;
}

export default function UserCardAdd({
  name,
  clubs,
  mutualFriends,
  interests,
  onAdd,
}: UserCardAddProps) {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      backgroundColor: Colors.backgroundSecondary,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: Colors.text,
      padding: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 36,
      fontFamily: getFont("heading"),
      color: Colors.text,
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
      backgroundColor: Colors.muted,
      marginBottom: 20,
    },
    clubs: {
      fontSize: 20,
      fontFamily: getFont("mono"),
      color: Colors.muted,
      marginBottom: 4,
    },
    mutualFriends: {
      fontSize: 20,
      fontFamily: getFont("mono"),
      color: Colors.muted,
      marginBottom: 4,
    },
    interests: {
      fontSize: 20,
      fontFamily: getFont("mono"),
      color: Colors.muted,
      marginBottom: 20,
    },
    addButton: {
      width: 67,
      height: 67,
      borderRadius: 12,
      backgroundColor: Colors.tertiary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    addButtonText: {
      fontSize: 40,
      color: Colors.background,
      fontFamily: getFont("sans"),
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.content}>
        <View style={styles.profilePic} />
        <Text style={styles.clubs}>{clubs} clubs</Text>
        <Text style={styles.mutualFriends}>{mutualFriends} mutual friends</Text>
        <Text style={styles.interests}>{interests} interests</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
