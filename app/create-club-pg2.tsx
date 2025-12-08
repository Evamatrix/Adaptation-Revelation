import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useClubs } from '../src/context/ClubConText';

export default function CreateClubPg2() {
  const router = useRouter();
  const { addClub } = useClubs();

  const params = useLocalSearchParams<{
    name?: string;
    description?: string;
    profileImage?: string;
  }>();

  const name = params.name ?? '';
  const description = params.description ?? '';
  const profileImage = params.profileImage ?? '';

  const availableTags = [
    "American", "African American", "Hispanic/Latino", "South Asian", 
    "Southeast Asian", "Native American",
    "English", "Spanish", "Chinese", "Tagalog", "Hindi", 
    "Vietnamese", "Arabic", "Korean", "Russian", "German", "Urdu",
    "Christian", "Muslim", "Hindu", "Jewish", "Buddhist",
    "Sports", "Music", "Reading", "Writing", "Film", "Cooking", "Finance", 
    "Engineering", "Social", "Art", "Career", "Pre-med", "Science"
    ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTag = (tag:string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);

    if (!showDropdown) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  };

  const handleAddClub = () => {
    addClub({
      name,
      profileImage,
      members: 1,
      description: description.trim(),
      tags: selectedTags,
      joined: true,
    });

    router.push({
      pathname: '/club-confirm',
      params: {
        name: name,
        description: description,
        profileImage: profileImage,
        tags: JSON.stringify(selectedTags), 
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CREATE CLUB</Text>

      <Text style={styles.label}>Select Tags</Text>

          <TouchableOpacity style={styles.dropdownButton} onPress={handleToggleDropdown}>
            <View style={styles.dropdownButtonContent}>
              {selectedTags.length === 0 ? (
                <Text style={styles.dropdownButtonText}>Select Tags</Text>
              ) : (
                <View style={styles.selectedTagsFlexBox}>
                  {selectedTags.map((tag) => (
                    <View key={tag} style={styles.tagChip}>
                      <Text style={styles.tagChipText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.dropdownButtonIcon}>
              <Ionicons name="caret-down" size={32} color="black" />
            </View>
          </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            <ScrollView 
              style={{ maxHeight: 200 }}
              persistentScrollbar={true}  
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.dropdownButtonContainer}>
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}


      <TouchableOpacity style={styles.addButton} onPress={handleAddClub} activeOpacity={0.8}>
        <Text style={styles.addText}>CREATE CLUB</Text>
      </TouchableOpacity>


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
    marginVertical: 40,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  label: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 6,
    color: '#000',
  },

  formScroll: {
    flex: 1,
  },

  formContainer: { 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingBottom: 50,
  },  

  dropdownButton: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  dropdownButtonContent: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },

  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },

  dropdownButtonIcon: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 6,
  },

  selectedTagsInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingRight: 6,
  },

  dropdownButtonText: { 
    fontSize: 18, 
    fontFamily: 'JetBrainsMono_400Regular', 
    color: '#000',
  },

  dropdownList: {
    width: '85%',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginBottom: 10,
    overflow: 'hidden',
    paddingVertical: 6,
    alignSelf: 'center',
  },

  dropdownButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    padding: 6,
  },

  dropdownItem: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  dropdownItemSelected: {
    backgroundColor: '#D9FCD9',
  },
  
  selectedTagsFlexBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    maxHeight: 200,      
    overflow: "hidden",    
  },

  dropdownItemText: { fontSize: 14, fontFamily: 'JetBrainsMono_400Regular', color: '#000' },
  dropdownItemTextSelected: { fontWeight: 'bold', color: '#000' },

  tagChip: {
    backgroundColor: '#D9FCD9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagChipText: { fontFamily: 'JetBrainsMono_400Regular', fontSize: 14, color: '#000' },

  addButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 140 : 120,
    alignSelf: 'center',
    backgroundColor: '#a9f59f',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    marginTop: 40,
    marginBottom: -20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },

  addText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 30,
    color: '#000',
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

  menuIcon: { fontSize: 26 },

});
