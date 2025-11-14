import { useRouter } from 'expo-router';
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
  const { clubs, setClubs, addNotification } = useClubs();

  const handleJoinClub = (index: number) => {
    const clubName = clubs[index].name;

    setClubs((prev) =>
      prev.map((club, i) =>
        i === index ? { ...club, members: club.members + 1 } : club
      )
    );

    addNotification(`Joined club: ${clubName}`);
  };

  const handleDeleteClub = (index: number) => {
    const clubName = clubs[index].name;

    setClubs((prev) => prev.filter((_, i) => i !== index));

    addNotification(`Deleted club: ${clubName}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}> 
      
      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>
 
      {/* SEARCH + FILTER */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="search clubs"
          style={styles.searchInput}
          placeholderTextColor="#777"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>FILTER</Text>
        </TouchableOpacity>
      </View>
 
      {/* CREATE NEW CLUB */}
      <TouchableOpacity
        style={styles.createButton}
        activeOpacity={0.8}
        onPress={() => router.push('/create-club')}
      >
        <Text style={styles.createText}>+ CREATE NEW CLUB</Text>
      </TouchableOpacity>
 
      {/* CLUB CARDS */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {clubs.map((club, index) => (
          <View key={index} style={styles.clubCard}>

            {/* Header */}
            <View style={styles.clubHeader}>
              <Text style={styles.clubTitle}>{club.name}</Text>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.joinButton]}
                  onPress={() => handleJoinClub(index)}
                >
                  <Text style={styles.buttonText}>JOIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteClub(index)}
                >
                  <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Body */}
            <Text style={styles.clubSubtext}>MEMBERS: {club.members}</Text>
            <Text style={styles.clubDescription}>
              DESCRIPTION: {club.description}
            </Text>
          </View>
        ))}
      </ScrollView>
 
      {/* FOOTER MENU */}
      <View style={styles.footerContainer}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/homescreen')}>
            <Text style={styles.menuIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/connect')}>
            <Text style={styles.menuIcon}>🧭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/messages')}>
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

  /* BACK BUTTON (original design) */
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
    fontFamily: 'Koulen',
    color: '#000',
  },

  /* SEARCH + FILTER */
  searchContainer: {
    flexDirection: 'row',
    marginTop: 100,
    width: '90%',
    justifyContent: 'space-between',
  },
  searchInput: {
    width: '68%',
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
    fontFamily: 'Koulen',
  },

  /* CREATE NEW CLUB */
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
    fontFamily: 'Koulen',
    color: '#000',
  },

  scrollContainer: { width: '90%', marginTop: 15 },

  /* CLUB CARD */
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
    fontFamily: 'Koulen',
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
  deleteButton: {
    backgroundColor: '#FDC9C9',
  },

  buttonText: {
    fontFamily: 'Koulen',
    fontSize: 14,
    color: '#000',
  },

  clubSubtext: {
    fontSize: 14,
    fontFamily: 'Koulen',
    color: '#333',
    marginTop: 6,
  },

  clubDescription: {
    fontSize: 14,
    fontFamily: 'Koulen',
    color: '#666',
    marginTop: 4,
  },

  /* FOOTER */
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
});
