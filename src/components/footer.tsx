import { useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.footerContainer}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => router.push('/homescreen')}>
          <Text style={styles.menuIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.menuIcon}>🧭</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/chats')}>
          <Text style={styles.menuIcon}>💬</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push({
          pathname: '/user-profile',
          params: { from: 'menu' },
        })}>
          <Text style={styles.menuIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  menu: {
    width: '90%',
    height: 80,
    backgroundColor: '#88E9FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
  },
  menuIcon: {
    fontSize: 28,
  },
});
