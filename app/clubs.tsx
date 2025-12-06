import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Modal,
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
 
const EXTRA_TAGS = [ 
  "American", "Indian", "Chinese", "Vietnamese", "Mexican", "Other",
  "English", "Spanish", "Mandarin", "Hindi", "Vietnamese", "Arabic", "Other", 
  "Christian", "Muslim", "Hindu", "Jewish", "Other", 
  "Sports", "Music", "Reading", "Writing", "Film",
  "Cooking", "Finance", "Engineering", "Social",
];

export default function Clubs() {
  const router = useRouter(); 
  const { clubs, toggleJoinClub } = useClubs();

  const [search, setSearch] = useState("");
  const [showShare, setShowShare] = useState<number | null>(null);
 
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();

    // add tags
    clubs.forEach(club => {
      (club.tags || []).forEach((t: string) => tagSet.add(t));
    }); 
    EXTRA_TAGS.forEach(tag => tagSet.add(tag));

    return Array.from(tagSet);
  }, [clubs]);
 
  const toggleFilter = (tag: string) => {
    setSelectedFilters(prev =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag]
    );
  };

  // Reset filters
  const clearFilters = () => setSelectedFilters([]);
 
  const filteredClubs = clubs
    .filter((club) =>
      club.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((club) => {
      if (selectedFilters.length === 0) return true;
      const lowerClubTags = (club.tags || []).map((t) => t.toLowerCase());
      return selectedFilters.some(filterTag =>
        lowerClubTags.includes(filterTag.toLowerCase())
      );
    });

  return (
    <SafeAreaView style={styles.safeArea}> 
       
      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>
  
      {/* SEARCH BAR */}
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

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={styles.filterText}>FILTER</Text>
        </TouchableOpacity>
      </View>

      {/* CREATE BUTTON */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/create-club')}
      >
        <Text style={styles.createText}> CREATE NEW CLUB</Text>
      </TouchableOpacity>

      {/* CLUB LIST */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredClubs.map((club, index) => (
          <View key={index} style={styles.clubCard}>
            
            <View style={styles.clubHeader}>
              <Text style={styles.clubTitle}>{club.name}</Text>

              {/* JOIN + SHARE BUTTONS */}
              <View style={styles.buttonGroup}>
                
                {/* JOIN BUTTON */}
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    club.joined ? styles.leaveButton : styles.joinButton,
                  ]}
                  onPress={() => toggleJoinClub(club.name)}
                >
                  <Text style={styles.buttonText}>
                    {club.joined ? "Join" : "JOIN"}
                  </Text>
                </TouchableOpacity>

                {/* SHARE BUTTON */}
                <TouchableOpacity
                  style={[styles.actionButton, styles.shareButton]}
                  onPress={() => setShowShare(showShare === index ? null : index)}
                >
                  <Text style={styles.buttonText}>SHARE</Text>
                </TouchableOpacity>

              </View>
            </View>
 
            <Text style={styles.clubSubtext}>MEMBERS: {club.members}</Text>
            <Text style={styles.clubDescription}>
              DESCRIPTION: {club.description}
            </Text>

            {/* TAG DISPLAY */}
            <View style={styles.tagContainer}>
              {(club.tags || []).map((tag: string, tagIndex: number) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* SHARE BOX */}
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
                    {["Evelyn", "Alex", "Jamie", "Other"].map((userName, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.shareUserButton}
                        onPress={() => {
                          router.push({
                            pathname: "/club-chat",
                            params: {
                              clubName: userName,
                              msg: `Check out this club: ${club.name}!`,
                            },
                          });
                        }}
                      >
                        <Text style={styles.shareUserText}>{userName}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            )}

          </View>
        ))}
      </ScrollView>

      {/* FOOTER */}
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

      {/* FILTER */}
      <Modal visible={filterVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Filter Clubs</Text>
            <Text style={styles.modalSubtitle}>Tags</Text>

            {/* TAG OPTIONS LIST */}
            <View style={styles.filterTagContainer}>
              {availableTags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterTag,
                    selectedFilters.includes(tag) && styles.filterTagActive,
                  ]}
                  onPress={() => toggleFilter(tag)}
                >
                  <Text style={styles.filterTagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.clearFilterButton}
              onPress={() => {
                clearFilters();
                setFilterVisible(false);
              }}
            >
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.closeModalText}>DONE</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
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
  searchInputWrapper: {
    position: 'relative',
    width: '68%',
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
  clearText: { fontSize: 14, color: '#333' },

  filterButton: {
    width: '28%',
    height: 40,
    backgroundColor: '#FFB3A7',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: { fontSize: 16, fontFamily: 'JetBrainsMono_400Regular' },

  createButton: {
    marginTop: 10,
    width: '90%',
    height: 45,
    backgroundColor: '#D9C8FF',
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

  buttonGroup: { flexDirection: 'row', gap: 10 },

  actionButton: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  joinButton: { backgroundColor: '#C9FDC9' },
  leaveButton: { backgroundColor: '#CCCCCC' },  
  shareButton: { backgroundColor: '#D9E9FD' },

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
    backgroundColor: '#FFF',
    fontFamily: 'JetBrainsMono_400Regular',
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
  },
  shareUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  shareUserButton: {
    backgroundColor: '#E0E0E0',
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
  menuIcon: { fontSize: 28 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "JetBrainsMono_400Regular",
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "JetBrainsMono_400Regular",
    marginTop: 10,
    marginBottom: 6,
  },
  filterTagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  filterTag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#EEE",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  filterTagActive: {
    backgroundColor: "#C9FDC9",
  },
  filterTagText: {
    fontFamily: "JetBrainsMono_400Regular",
  },
  clearFilterButton: {
    marginTop: 10,
    backgroundColor: "#FFD7D7",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  clearFilterText: {
    textAlign: "center",
    fontFamily: "JetBrainsMono_400Regular",
  },
  closeModalButton: {
    marginTop: 14,
    backgroundColor: "#D9E9FD",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  closeModalText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "JetBrainsMono_400Regular",
  },
});
