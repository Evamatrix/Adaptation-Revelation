import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { sessionState } from '../store/session';

import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const friendsData = [
  { id: 1, name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, name: 'Jamie', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, name: 'Taylor', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: 4, name: 'Jordan', avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: 5, name: 'Riley', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 6, name: 'Sam', avatar: 'https://i.pravatar.cc/100?img=6' },
  { id: 7, name: 'Casey', avatar: 'https://i.pravatar.cc/100?img=7' },
  { id: 8, name: 'Morgan', avatar: 'https://i.pravatar.cc/100?img=8' },
];

export default function FriendsList() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const params = useLocalSearchParams();
  const [hasEvelyn, setHasEvelyn] = useState(sessionState.hasEvelyn);

  useEffect(() => {
    if (params.addEvelyn === "true") {
      sessionState.hasEvelyn = true;
      setHasEvelyn(true);
    }
  }, [params]);

  const allFriends = hasEvelyn
    ? [...friendsData, { id: 9, name: "Evelyn", avatar: "https://i.pravatar.cc/100?img=9" }]
    : friendsData;

  const filteredFriends = allFriends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>

    <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
            >
            <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>

      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>MY FRIENDS</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          placeholderTextColor="#A0A0A0"
          value={search}
          onChangeText={setSearch}
        />

        {/* Scrollable Friends List */}
        <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 100}]}>
          {filteredFriends.map((friend) => (
            <TouchableOpacity 
              key={friend.id} 
              style={styles.friendRow}
              onPress={() => {
                if (friend.name === "Evelyn") {
                  router.push("/new-chat");
                }
              }}
              >
              <Image source={{ uri: friend.avatar }} style={styles.avatar} />
              <Text style={styles.friendName}>{friend.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

const { width } = Dimensions.get('window');
const FIXED_WIDTH = Math.min(width * 0.9, 380);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10, // space for iPhone notch
  },
  title: {
    fontSize: 28,
    fontFamily: 'Koulen',
    color: '#000',
    marginBottom: 20,
  },
  searchInput: {
    width: FIXED_WIDTH,
    height: 44,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff8f9',
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#000',
    marginBottom: 20,
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    backgroundColor: '#FFF8F9',
    padding: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 12,
  },
  friendName: {
    fontSize: 20,
    fontFamily: 'Koulen',
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

    backButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
  },
    backText: {
    fontSize: 16,
    fontFamily: 'Koulen',
    color: '#000',
  },
});
