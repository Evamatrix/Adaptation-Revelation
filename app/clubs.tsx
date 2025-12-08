import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useClubs } from '../src/context/ClubConText';
 
const EXTRA_TAGS = [ 
  "American", "African American", "Hispanic/Latino", "South Asian", "Southeast Asian", "Native American",
  "English", "Spanish", "Chinese", "Tagalog", "Hindi", "Vietnamese", "Arabic", "Korean", "Russian", "German", "Urdu", "Telugu",
  "Christian", "Muslim", "Hindu", "Jewish", "Buddhist",
  "Sports", "Music", "Reading", "Writing", "Film", "Cooking", "Finance", "Engineering", "Social", "Art", "Career", "Pre-med", "Science"
];

export default function Clubs() {
  const router = useRouter(); 
  const { clubs, toggleJoinClub } = useClubs();

  const [search, setSearch] = useState("");
  const [showShare, setShowShare] = useState<number | null>(null);
 
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"join" | "leave" | null>(null); 
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  const [shareVisible, setShareVisible] = useState(false);
  const [shareClub, setShareClub] = useState<string | null>(null);

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
        <Ionicons name="add" size={20} color="black" />
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

              {/* JOIN and SHARE BUTTONS */}
              <View style={styles.buttonGroup}>
                
                {/* JOIN BUTTON */}
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    club.joined ? styles.leaveButton : styles.joinButton,
                  ]}
                  onPress={() => {
                    setSelectedClub(club.name);
                    if (!club.joined) {
                      toggleJoinClub(club.name);
                      setConfirmAction("join");     
                      setConfirmVisible(true);        
                    } else {
                      setConfirmAction("leave");
                      setConfirmVisible(true);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>
                    {club.joined ? "LEAVE" : "JOIN"}
                  </Text>
                </TouchableOpacity>

                {/* SHARE BUTTON */}
                <TouchableOpacity
                  style={[styles.actionButton, styles.shareButton]}
                  onPress={() => {
                    setShareClub(club.name);
                    setShareVisible(true);
                  }}
                >
                  <Ionicons name="share" size={20} color="black" />
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
                <View style={styles.shareInput}>
                  <Text style={{ color: '#000', fontFamily: 'JetBrainsMono_400Regular' }}>
                  </Text>
                </View>
                
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

      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>

            {confirmAction === "leave" && (
          <>
            <Text style={styles.confirmTitle}>Leave this club?</Text>
            <Text style={styles.confirmMessage}>
              Are you sure you want to leave this club?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.confirmYesButton}
                onPress={() => {
                  if (selectedClub) toggleJoinClub(selectedClub);
                  setConfirmVisible(false);
                }}
              >
                <Text style={styles.confirmButtonText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.confirmNoButton}
                  onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.confirmButtonText}>NO</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {confirmAction === "join" && (
        <>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setConfirmVisible(false)}
            >
              <Ionicons name="close-circle" size={20} color="black" />
            </TouchableOpacity>
          <Text style={styles.confirmTitle}>Club Joined!</Text>
          <Text style={styles.confirmMessage}>
            You have successfully joined this club.
          </Text>
            <TouchableOpacity
              style={styles.confirmNoButton}
              onPress={() => {
                setConfirmVisible(false);
                router.push({
                  pathname: "/club-chat",
                  params: {
                    clubName: selectedClub,
                  },
                });
              }}
            >
              <Text style={styles.confirmButtonText}>View Club Chat</Text>
            </TouchableOpacity>

        </>
      )}
       
          </View>
        </View>
      </Modal>

      <Modal visible={shareVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.shareModalBox}>
            <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShareVisible(false)}
            >
              <Ionicons name="close-circle" size={20} color="black" />
            </TouchableOpacity>
            
            <Text style={styles.shareText}>Share: {shareClub}</Text>

            <TextInput
              style={styles.shareInput}
              value={`Check out this club: ${shareClub}!`}
              editable={false}
            />

            <View style={styles.shareUsersWrapper}>
              <Text style={styles.shareToText}>TO:</Text>

              <View style={styles.shareUsersContainer}>
                {["Evelyn", "Jamie", "Alex"].map((userName, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.shareUserButton}
                    onPress={() => {
                      router.push({
                        pathname: "/shared-chat",
                        params: {
                          userName: userName,
                          clubName: shareClub,
                          msg: `Check out this club: ${shareClub}!`,
                        },
                      });
                      setShareVisible(false); 
                    }}
                  >
                    <Text style={styles.shareUserText}>{userName}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
    marginTop: 65,
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
    fontFamily: 'JetBrainsMono_400Regular',
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
    backgroundColor: '#B0CAEB',
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
    backgroundColor: '#96D696',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
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
  leaveButton: { backgroundColor: '#E5505B' },  
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

  confirmBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  
  confirmTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  
  confirmMessage: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "JetBrainsMono_400Regular",
  },
  
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  
  confirmYesButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e63946",
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  
  confirmNoButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#457b9d",
    marginLeft: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "JetBrainsMono_400Regular",
  },

  shareModalBox: {
    width: '85%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: '30%',
  },
  
  closeButton: {
    position: 'absolute',
    top: 10,       
    right: 10,     
    zIndex: 10,    
    padding: 5,
  },
  
});
