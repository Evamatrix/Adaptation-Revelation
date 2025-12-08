import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Alert,
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
import Colors from '../src/constants/colors';
import { getFont, useAppFonts } from '../src/constants/fonts';
import { useClubs } from '../src/context/ClubContext';

export default function CreateClub() {
  const router = useRouter();

  const fontsLoaded = useAppFonts(); // always call this hook
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { setClubData } = useClubs();
  const [showDropdown, setShowDropdown] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [tags, setTags] = useState("")

  if (!fontsLoaded) {
    // render a simple loading view instead of returning null
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </SafeAreaView>
    );
  }

  const availableTags = [
    "American", "Indian", "Chinese", "Vietnamese", "Mexican", 
    "English", "Spanish", "Mandarin", "Hindi", "Arabic",
    "Christian", "Muslim", "Hindu", "Jewish",
    "Sports", "Music", "Reading", "Writing", "Film", "Cooking", "Finance", "Engineering", "Social"
  ];


  const toggleTag = (tag:string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleToggleDropdown = () => {
    setShowDropdown(prev => !prev);
    if (!showDropdown) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  };

  const handleAddClub = () => {
    if (!name.trim()) {
      Alert.alert('Please enter a club name.');
      return;
    }


    setClubData(name.trim(), {
      description: description.trim(),
      members: 1,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      joined: true,
    });

    router.push('/club-explore');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CREATE CLUB</Text>

      <Image source={require('../src/assets/images/splash-icon.png')} style={styles.icon} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.formScroll} 
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.label}>CLUB NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter club name"
          placeholderTextColor={Colors.placeholder}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter description"
          placeholderTextColor={Colors.placeholder}
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
                {availableTags.map(tag => {
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
          {selectedTags.map(tag => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagChipText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddClub} activeOpacity={0.8}>
        <Text style={styles.addText}>ADD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: Colors.primary,
    zIndex: 10,
  },
  backText: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text },

  title: {
    color: Colors.text,
    textAlign: 'center',
    fontFamily: getFont("heading"),
    fontSize: Platform.select({ web: 48, default: 45 }),
    marginBottom: 60,
    textTransform: 'uppercase',
  },

  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    tintColor: Colors.icon,
  },

  formScroll: { flex: 1 },
  formContainer: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 200 },

  label: {
    fontFamily: getFont("mono"),
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 6,
    color: Colors.text,
  },

  input: {
    width: '85%',
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    fontSize: 18,
    fontFamily: getFont("mono"),
    padding: 10,
    marginBottom: 20,
    color: Colors.text,
  },

  descriptionInput: { height: 120, textAlignVertical: 'top' },

  dropdownButton: {
    width: '85%',
    padding: 10,
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  dropdownButtonText: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text },

  dropdownList: {
    width: '85%',
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginBottom: 20,
    overflow: 'hidden',
  },

  dropdownButtonContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 6 },

  dropdownItem: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  dropdownItemSelected: { backgroundColor: Colors.success },

  dropdownItemText: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text },
  dropdownItemTextSelected: { fontWeight: 'bold', color: Colors.text },

  selectedTagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  tagChip: {
    backgroundColor: Colors.success,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagChipText: { fontFamily: getFont("mono"), fontSize: 14, color: Colors.text },

  addButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 140 : 120,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 8,
    paddingHorizontal: 60,
    paddingVertical: 12,
    marginTop: 10,
  },
  addText: { fontFamily: getFont("mono"), fontSize: 22, color: Colors.text },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },

  menu: {
    width: '90%',
    height: 80,
    backgroundColor: Colors.backgroundColorful,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 26,
    color: Colors.text,
    fontFamily: getFont("mono"),
  },
});
