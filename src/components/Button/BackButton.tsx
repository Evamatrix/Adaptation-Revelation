import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { getFont, useAppFonts } from '../../constants/fonts';

type BackButtonProps = {
  onPress?: () => void;  // optional, fallback to router.back()
  style?: object;        // optional style override
};

export default function BackButton({ onPress, style }: BackButtonProps) {
  const router = useRouter();
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null; // conditional rendering only, hooks order preserved

  const styles = StyleSheet.create({
      button: {
          position: 'absolute',
          top: 30,
          left: 10, 
          backgroundColor: Colors.secondary,
          borderWidth: 2,
          borderColor: Colors.border,
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingBottom: 4,
          zIndex: 10,
          alignItems: 'center',
      },
      text: {
          fontSize: 20,
          fontFamily: getFont('sans'),
          color: Colors.text,
      },
  })

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress ?? (() => router.back())} // fallback to router.back()
    >
      <Text style={styles.text}>←</Text>
    </TouchableOpacity>
  );
}
