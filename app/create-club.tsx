import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
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

export default function CreateClub() {
  const router = useRouter();
  const { addClub } = useClubs();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const availableTags = [
    "American", "Indian", "Chinese", "Vietnamese", "Mexican", 
    "English", "Spanish", "Mandarin", "Hindi", "Arabic",
    "Christian", "Muslim", "Hindu", "Jewish",
    "Sports", "Music", "Reading", "Writing", "Film", "Cooking", "Finance", "Engineering", "Social"
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
    if (!name.trim()) {
      alert('Please enter a club name.');
      return;
    }

    addClub({
      name,
      members: 1,
      description: description.trim() || 'No description provided.',
      tags: selectedTags,
      joined: true,
    });

    router.replace('/clubs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CREATE CLUB</Text>

      <Image source={require('../assets/images/splash-icon.png')} style={styles.icon} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.formScroll} 
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.label}>CLUB NAME</Text>
        <TextInput style={styles.input} placeholder="Enter club name" value={name} onChangeText={setName} />

        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Select Tags</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={handleToggleDropdown}>
          <Text style={styles.dropdownButtonText}>Select Tags</Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            <ScrollView style={{ maxHeight: 200 }}>
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

        <View style={styles.selectedTagsContainer}>
          {selectedTags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagChipText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddClub} activeOpacity={0.8}>
        <Text style={styles.addText}>ADD</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.menu}>
          <Text style={styles.menuIcon}>🏠</Text>
          <Text style={styles.menuIcon}>🧭</Text>
          <Text style={styles.menuIcon}>💬</Text>
          <Text style={styles.menuIcon}>👤</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF'},

 
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
    zIndex: 10,
  },
  backText: { fontSize: 16, fontFamily: 'JetBrainsMono_400Regular', color: '#000' },

  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 48, default: 45 }),
    fontWeight: '400',
    marginBottom: 60,
    textTransform: 'uppercase',
  },

  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    marginBottom: 20,
    tintColor: '#000',
  },

  formScroll: {
    flex: 1,
  },

  formContainer: { 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingBottom: 200,
  },  

  label: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 6,
    color: '#000',
  },

  input: {
    width: '85%',
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    fontSize: 18,
    fontFamily: 'JetBrainsMono_400Regular',
    padding: 10,
    marginBottom: 20,
  },

  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  dropdownButton: {
    width: '85%',
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  dropdownButtonText: { fontSize: 16, fontFamily: 'JetBrainsMono_400Regular', color: '#000' },

  dropdownList: {
    width: '85%',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginBottom: 20,
    overflow: 'hidden',
  },

  dropdownButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    padding: 6,
  },

  dropdownItem: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },

  dropdownItemSelected: {
    backgroundColor: '#C9FDC9',
  },
  
  dropdownItemText: { fontSize: 16, fontFamily: 'JetBrainsMono_400Regular', color: '#000' },
  dropdownItemTextSelected: { fontWeight: 'bold', color: '#000' },

  selectedTagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
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
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 60,
    paddingVertical: 12,
    marginTop: 10,
  },

  addText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 22,
    color: '#000',
  },

  footer: {
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

  menuIcon: { fontSize: 26 },

});
