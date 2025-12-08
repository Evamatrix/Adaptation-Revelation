import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppFonts } from '../../constants/fonts';

const router = useRouter();

type BackButtonProps = {
  onPress?: () => void;  // optional, fallback to router.back()
  style?: object;        // optional style override
};

export default function BackButton({ onPress, style }: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress ?? (() => router.back())} // fallback to router.back()
    >
      <Text style={styles.text}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
button: {
    position: 'absolute',
    top: 60,
    left: 20, 
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
  },
text: {
    fontSize: 16,
    fontFamily: AppFonts.sans,
    color: Colors.light.tint,
  },
})