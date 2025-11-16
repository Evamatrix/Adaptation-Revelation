import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useClubs } from '../src/context/ClubConText';

export default function Clubs() {
  const router = useRouter(); 
  const { clubs, toggleJoinClub } = useClubs();
  const [showShare, setShowShare] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
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
  
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            placeholder="search clubs"
            style={styles.searchInput}
            placeholderTextColor="#777"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearch("")}
            >
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>FILTER</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        activeOpacity={0.8}
        onPress={() => router.push('/create-club')}
      >
        <Text style={styles.createText}>+ CREATE NEW CLUB</Text>
      </TouchableOpacity>
  
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredClubs.map((club, index) => (
          <View key={index} style={styles.clubCard}>
            <View style={styles.clubHeader}>
              <Text style={styles.clubTitle}>{club.name}</Text>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.joinButton]}
                  onPress={() => {
                    // If not already joined, navigate after joining
                    if (!club.joined) {
                      toggleJoinClub(club.name); // join first
                      router.push(`/chat-room?club=${encodeURIComponent(club.name)}`);
                    } else {
                      // If already joined, just leave
                      toggleJoinClub(club.name);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>
                    {club.joined ? "LEAVE" : "JOIN"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.shareButton]}
                  onPress={() =>
                    setShowShare(showShare === index ? null : index)
                  }
                >
                  <Text style={styles.buttonText}>SHARE</Text>
                </TouchableOpacity>
              </View>
            </View>
 
            <Text style={styles.clubSubtext}>MEMBERS: {club.members}</Text>
            <Text style={styles.clubDescription}>
              DESCRIPTION: {club.description}
            </Text>

            <View style={styles.tagContainer}>
              {club.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {showShare === index && (
              <View style={styles.shareBox}>
                <Text style={styles.shareText}>Share: {club.name}</Text>
                <TextInput
                  style={styles.shareInput}
                  value={`Check out this club: ${club.name}!`}
                  editable={false}
                />
                
                <View style={styles.shareUsersWrapper}>
                  <Text style={styles.shareToText}>TO:</Text>
                  <View style={styles.shareUsersContainer}>
                    {['Evelyn', 'Alex', 'Jamie', 'Other'].map((userName, i) => {
                      const sharedClubName = club.name;

                      return (
                      <TouchableOpacity
                        key={i}
                        style={styles.shareUserButton}
                        onPress={() => {
                          if (userName === 'Evelyn') {
                            router.push({
                              pathname: '/shared-club',
                              params: { clubName: sharedClubName },
                            });
                          }
                        }}
                      >
                        <Text style={styles.shareUserText}>{userName}</Text>
                      </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

              </View>
            )}
          </View>
        ))}
      </ScrollView>
  
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
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' },
 
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
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#000',
  },
 
  searchContainer: {
    flexDirection: 'row',
    marginTop: 100,
    width: '90%',
    justifyContent: 'space-between',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    width: '28%',
    height: 40,
    backgroundColor: '#D9D9D9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono_400Regular',
  },
 
  createButton: {
    marginTop: 10,
    width: '90%',
    height: 45,
    backgroundColor: '#D9FCD9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    fontSize: 18,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#000',
  },

  scrollContainer: { width: '90%', marginTop: 15 },
 
  clubCard: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },

  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  clubTitle: {
    fontSize: 22,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#000',
  },

  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },

  actionButton: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  joinButton: {
    backgroundColor: '#C9FDC9',
  },

  leaveButton: {
    backgroundColor: "#FDC9C9", // light red
   },


  shareButton: {
    backgroundColor: '#D9E9FD',
  },

  buttonText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 14,
    color: '#000',
  },

  clubSubtext: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#333',
    marginTop: 6,
  },

  clubDescription: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#666',
    marginTop: 4,
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 6,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 12,
    color: '#000',
  },

  shareBox: {
    marginTop: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#D9E9FD',
  },
  shareText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  shareInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 6,
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 12,
    backgroundColor: '#FFF',
    marginBottom: 4,
  },
  shareUsersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  shareToText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 12,
    marginRight: 6,
    color: '#000',
  },
  shareUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  shareUserButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  shareUserText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 12,
    color: '#000',
  },

  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },

  menu: {
    width: '90%',
    height: 80,
    backgroundColor: '#88E9FF',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 28,
  },

  searchInputWrapper: {
  position: 'relative',
  width: '68%',
},

clearButton: {
  position: 'absolute',
  right: 8,
  top: 8,
  backgroundColor: '#ddd',
  width: 24,
  height: 24,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
},

clearText: {
  fontSize: 14,
  color: '#333',
},

});
