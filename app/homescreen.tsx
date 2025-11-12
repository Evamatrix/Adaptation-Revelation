import { useRouter } from 'expo-router';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Footer from '../src/components/footer';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sign Out button */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => router.replace('/signup')}
        activeOpacity={0.8}
      >
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.info}>
          {/* MY NETWORK */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>MY NETWORK</Text>
            <TouchableOpacity
              style={styles.networkBox}
              activeOpacity={0.8}
              onPress={() => console.log('Go to My Network')}
            >
              <Text style={styles.infoValue}>SEE YOUR CONNECTED PEERS</Text>
            </TouchableOpacity>
          </View>

          {/* NOTIFICATIONS */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>NOTIFICATIONS</Text>
            <View style={styles.notificationBox}>
              <Text style={styles.infoValue}>NO NEW NOTIFICATIONS</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/user-profile')}
          >
            <Text style={styles.buttonText}>VIEW PROFILE</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Shared Footer Component */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  signOutButton: {
    position: 'absolute',
    top: 125,
    right: 20,
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Koulen',
    color: '#000',
  },
  container: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 60,
  },
  info: {
    width: '100%',
    marginTop: 20,
    marginBottom: 40,
  },
  infoBlock: {
    marginBottom: 26,
  },
  infoLabel: {
    fontSize: 22,
    fontFamily: 'Koulen',
    color: '#000',
    marginBottom: 10,
  },
  infoValue: {
    fontSize: 18,
    color: '#5C5C5C',
    fontFamily: 'Koulen',
    textAlign: 'center',
  },
  networkBox: {
    height: 85,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    backgroundColor: '#FFF8F9',
    justifyContent: 'center',
  },
  notificationBox: {
    height: 200,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 440,
    marginBottom: 50,
  },
  navButton: {
    width: '48%',
    height: 52,
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'Koulen',
    color: '#000',
  },
});
