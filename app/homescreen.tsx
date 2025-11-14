import { useRouter } from 'expo-router';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
 
  const friends = [
    { id: 1, name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: 2, name: 'Jamie', avatar: 'https://i.pravatar.cc/100?img=2' },
    { id: 3, name: 'Taylor', avatar: 'https://i.pravatar.cc/100?img=3' },
    { id: 4, name: 'Jordan', avatar: 'https://i.pravatar.cc/100?img=4' },
    { id: 5, name: 'Riley', avatar: 'https://i.pravatar.cc/100?img=5' },
    { id: 6, name: 'Sam', avatar: 'https://i.pravatar.cc/100?img=6' },
    { id: 7, name: 'Casey', avatar: 'https://i.pravatar.cc/100?img=7' },
    { id: 8, name: 'Morgan', avatar: 'https://i.pravatar.cc/100?img=8' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}> 
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => router.replace('/signup')}
        activeOpacity={0.8}
      >
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}> 
        <Text style={styles.infoLabel}>MY NETWORK</Text>

        <View style={styles.networkBox}>
          <ScrollView
            style={styles.scrollBox}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingVertical: 8 }}
          >
            {friends.map((friend) => (
              <TouchableOpacity key={friend.id} style={styles.friendRow} activeOpacity={0.8}>
                <Image source={{ uri: friend.avatar }} style={styles.avatar} />
                <Text style={styles.friendName}>{friend.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
 
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>NOTIFICATIONS</Text>
          <View style={styles.notificationBox}>
            <Text style={styles.infoValue}>NO NEW NOTIFICATIONS</Text>
          </View>
        </View> 
      </ScrollView>
 
      <View style={styles.footerContainer}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/homescreen')}>
            <Text style={styles.menuIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/connect')}>
            <Text style={styles.menuIcon}>🧭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/chat-room')}>
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
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
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
  },
  signOutText: { fontSize: 16, fontFamily: 'Koulen', color: '#000' },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 140,  
  },

  infoLabel: {
    fontSize: 22,
    fontFamily: 'Koulen',
    color: '#000',
    marginBottom: 10,
  },
 
  networkBox: {
    height: 220, 
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    backgroundColor: '#FFF8F9',
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  scrollBox: {
    flex: 1,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 14,
  },
  friendName: {
    fontSize: 20,
    fontFamily: 'Koulen',
    color: '#000',
  },

  infoBlock: { marginBottom: 26 },
  infoValue: {
    fontSize: 18,
    fontFamily: 'Koulen',
    color: '#5C5C5C',
    textAlign: 'center',
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
    marginTop: 40,
    marginBottom: 40,
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
  buttonText: { fontSize: 22, fontFamily: 'Koulen', color: '#000' },
 
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
