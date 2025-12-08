import { usePathname, useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/colors';
import { getFont, useAppFonts } from '../constants/fonts';

export default function Taskbar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 current route
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    footerContainer: {
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
    menuItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 6,
      borderRadius: 8,
    },
    menuIcon: {
      fontSize: 28,
      fontFamily: getFont('mono'),
      color: Colors.tint,
    },
    activeItem: {
      backgroundColor: Colors.primary,
    },
    activeIcon: {
      color: Colors.text,
    },
  });

  const MenuItem = ({ label, path }: { label: string; path: string }) => {
    const isActive = pathname === path;
    return (
      <TouchableOpacity
        style={[styles.menuItem, isActive && styles.activeItem]}
        onPress={() => router.push(path)}
      >
        <Text style={[styles.menuIcon, isActive && styles.activeIcon]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.menu}>
        <MenuItem label="Home" path="/homescreen" />
        <MenuItem label="Connect" path="/connect" />
        <MenuItem label="Chats" path="/chats" />
        <MenuItem label="Profile" path="/user-profile" />
      </View>
    </View>
  );
}
