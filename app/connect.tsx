import { useRouter } from 'expo-router';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Connect() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>  
      <View style={styles.headerContainer}>
        <Text style={styles.title}>CONNECT</Text>
      </View>
 
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/clubs')}
          activeOpacity={0.8}
        >
          <Text style={styles.optionText}>CLUBS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/users')}
          activeOpacity={0.8}
        >
          <Text style={styles.optionText}>USERS</Text>
        </TouchableOpacity>
      </View>
 
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#FFFFFF',
  },
  backText: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#000',
  },
  headerContainer: {
    marginTop: 100,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 48, default: 45 }),
    fontWeight: '400',
    marginBottom: 60,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    width: '85%',
    alignItems: 'center',
    gap: 20,
  },
  optionButton: {
    width: '100%',
    height: 85,
    backgroundColor: '#D9D9D9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 26,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#000',
  },
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
  menuIcon: { fontSize: 28 },
});