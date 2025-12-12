import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { getFont, useAppFonts } from '../constants/fonts';

export default function Taskbar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 current route
  const fontsLoaded = useAppFonts();
  const insets = useSafeAreaInsets();

  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    footerContainer: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: Colors.backgroundColorful,
      paddingBottom: insets.bottom + 10,
      paddingTop: 10,
      // Floating effect
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    menu: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      backgroundColor: Colors.backgroundColorful,
      borderRadius: 20, // pill shape
      paddingVertical: 3,
      paddingHorizontal: 10,
    },
    menuItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
      paddingVertical: 6,
      borderRadius: 12,
    },
    menuIcon: {
      fontSize: 16,
      fontFamily: getFont('mono'),
      color: Colors.tint,
    },
    activeItem: {
      backgroundColor: Colors.primary,
    },
    activeIcon: {
      color: Colors.text,
      fontWeight: '600',
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
        <MenuItem label="Chats" path="/friends-list" />
        <MenuItem label="Profile" path="/user-profile" />
      </View>
    </View>
  );
}
