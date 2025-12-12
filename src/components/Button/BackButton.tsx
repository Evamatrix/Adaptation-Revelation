import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { getFont, useAppFonts } from '../../constants/fonts';

const router = useRouter();

type BackButtonProps = {
  onPress?: () => void;  // optional, fallback to router.back()
  style?: object;        // optional style override
};

export default function BackButton({ onPress, style }: BackButtonProps) {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  
  if (!fontsLoaded) return null; // wait until fonts load

    const styles = StyleSheet.create({
        button: {
            position: 'absolute',
            top: 50,
            left: 10, 
            backgroundColor: Colors.primary,
            borderWidth: 2,
            borderColor: Colors.border,
            borderRadius: 8,
            paddingHorizontal: 14,
            paddingVertical: 6,
            zIndex: 10,
        },
        text: {
            fontSize: 16,
            fontFamily: getFont('heading'),
            color: Colors.text,
        },
    })

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress ?? (() => router.back())} // fallback to router.back()
    >
      <Text style={styles.text}>← Back</Text>
    </TouchableOpacity>
  );
}