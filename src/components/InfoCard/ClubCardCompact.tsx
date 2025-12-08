import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";

interface ClubCompactProps {
  name: string;
  image: any; // require('../assets/...') or { uri: string }
  onPress?: () => void;
}

export default function ClubCardCompact({ name, image, onPress }: ClubCompactProps) {
  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.backgroundSecondary,
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: Colors.border,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    name: {
      fontFamily: getFont("heading"),
      fontSize: 18,
      color: Colors.text,
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}
