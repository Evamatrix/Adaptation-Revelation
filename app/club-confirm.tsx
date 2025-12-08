import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ClubConfirmationProps {
  name: string;
  description: string;
  profileImage?: string | null;
  tags: string[];
}

export default function ClubConfirmation() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const clubData: ClubConfirmationProps = {
    name: params.name as string,
    description: params.description as string,
    profileImage: params.profileImage as string,
    tags: params.tags ? (JSON.parse(params.tags as string) as string[]) : [],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <View style={styles.checkIcon}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      </View>

      <Text style={styles.title}>Club Created</Text>

      {clubData.profileImage && (
        <Image source={{ uri: clubData.profileImage }} style={styles.clubImage} />
      )}

      <Text style={styles.label}>CLUB NAME:</Text>
      <Text style={styles.value}>{clubData.name}</Text>

      <Text style={styles.label}>CLUB DESCRIPTION:</Text>
      <Text style={styles.value}>{clubData.description}</Text>

      <Text style={styles.label}>CLUB TAGS:</Text>
      <View style={styles.tagsContainer}>
        {clubData.tags.map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagChipText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.bottomButton}
            onPress={() => router.push('/clubs')}
          >
            <Text style={styles.buttonText}>VIEW CLUBS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => router.push({
              pathname: '/club-chat',
              params: { clubName: clubData.name }
            })}
          >
            <Text style={styles.buttonText}>VIEW CLUB CHAT</Text>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF'},

 
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#FFF8F9',
    zIndex: 10,
  },
  backText: { fontSize: 16, fontFamily: 'JetBrainsMono_400Regular', color: '#000' },

  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 48, default: 45 }),
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  checkIcon: {
    marginTop: 40,
    alignItems: 'center',
  },
  checkCircle: {
    width: 75,
    height: 75,
    backgroundColor: '#39ba4d',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#a9f59f',
    fontSize: 60,
    textAlign: 'center',
  },

  clubImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },

  label: {
    textAlign: 'center',
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  value: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
    justifyContent: 'center',
    marginBottom: 30,
  },

  tagChip: {
    backgroundColor: '#D9FCD9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 2,
  },

  tagChipText: { fontFamily: 'JetBrainsMono_400Regular', fontSize: 18, color: '#000' },


  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },

  bottomButton: {
    width: '48%',
    height: 52,
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: { fontSize: 20, fontFamily: 'JetBrainsMono_400Regular', color: '#000' },

});
