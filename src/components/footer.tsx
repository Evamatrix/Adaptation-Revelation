import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => router.push('/homescreen')}>
        <Text style={styles.menuIcon}>🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.menuIcon}>🧭</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.menuIcon}>💬</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/user-profile')}>
        <Text style={styles.menuIcon}>👤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: 90,
    backgroundColor: '#88E9FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 0, // control spacing via parent
  },
  menuIcon: {
    fontSize: 28,
  },
});
