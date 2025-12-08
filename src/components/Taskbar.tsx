import { useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/colors';
import { getFont, useAppFonts } from '../constants/fonts';

export default function Taskbar() {
  const router = useRouter();
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null; // wait until fonts load
  const styles = StyleSheet.create({
      footerContainer: {
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColorful,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        paddingTop: 10,
      },
      menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
      },
      menuIcon: {
        fontSize: 28,
        fontFamily: getFont('mono'),
        color: Colors.tint,
      },
  });

  return (
    <View style={styles.footerContainer}>
      <View style={styles.menu}>

        <TouchableOpacity onPress={() => router.push('/homescreen')}>
          <Text style={styles.menuIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/connect')}>
          <Text style={styles.menuIcon}>🧭</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/chats')}>
          <Text style={styles.menuIcon}>💬</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/user-profile')}>
          <Text style={styles.menuIcon}>👤</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}