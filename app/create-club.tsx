import Screen from '@/src/components/Screen';
import showSuccess from '@/src/utils/showToast';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '../src/constants/colors';
import { getFont, useAppFonts } from '../src/constants/fonts';
import { useClubs } from '../src/context/ClubContext';

export default function CreateClub() {
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const scrollViewRef = useRef<ScrollView>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { allClubs, createClub } = useClubs();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  const availableTags = [
    "American", "African American", "Hispanic/Latino", "South Asian", "Southeast Asian", "Native American", 
    "English", "Spanish", "Chinese", "Tagalog", "Hindi", "Vietnamese", "Arabic", "Korean", "Russian", "German", "Urdu", "Telugu",
    "Christian", "Muslim", "Hindu", "Jewish", "Buddhist",
    "Sports", "Music", "Reading", "Writing", "Film", "Cooking", "Finance", "Engineering", "Social", "Art", "Career", "Pre-med", "Science,", "Games"
  ];

  const toggleTag = (tag: string) => {
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
    const clubName = name.trim();
    if (!clubName) return Alert.alert("Please enter a club name.");
    if (allClubs[clubName]) return Alert.alert("A club with this name already exists.");

    createClub(clubName, {
      description: description.trim(),
      tags: selectedTags,
    });

    // notify success and navigate back to club explore
    showSuccess('Club created successfully!');
    router.push("/club-explore");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.safeArea}>
            <Text style={styles.title}>CREATE CLUB</Text>

            <Image source={require('../src/assets/images/create-club.png')} style={styles.icon} />

            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled"
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

              <TouchableOpacity style={styles.addButton} onPress={handleAddClub} activeOpacity={0.8}>
                <Text style={styles.addText}>ADD</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background, paddingTop: Platform.OS === 'android' ? 25 : 0 },
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
  title: { color: Colors.text, textAlign: 'center', fontFamily: getFont("heading"), fontSize: Platform.select({ web: 48, default: 45 }), paddingTop: 60, marginBottom: 20, textTransform: 'uppercase' },
  icon: { width: 100, height: 100, alignSelf: 'center', marginVertical: 20, tintColor: Colors.icon },
  formContainer: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 40 },
  label: { fontFamily: getFont("mono"), fontSize: 20, alignSelf: 'flex-start', marginLeft: 40, marginBottom: 6, color: Colors.text },
  input: { width: '85%', backgroundColor: Colors.secondary, borderRadius: 4, fontSize: 18, fontFamily: getFont("mono"), padding: 10, marginBottom: 20, color: Colors.text },
  descriptionInput: { height: 120, textAlignVertical: 'top' },
  dropdownButton: { width: '85%', padding: 10, borderWidth: 1.5, borderColor: Colors.text, borderRadius: 6, backgroundColor: Colors.primary, marginBottom: 10 },
  dropdownButtonText: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text },
  dropdownList: { width: '85%', borderWidth: 1.5, borderColor: Colors.text, borderRadius: 6, backgroundColor: Colors.primary, marginBottom: 20, overflow: 'hidden' },
  dropdownButtonContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 6 },
  dropdownItem: { backgroundColor: Colors.secondary, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, margin: 4 },
  dropdownItemSelected: { backgroundColor: Colors.success },
  dropdownItemText: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text },
  dropdownItemTextSelected: { fontWeight: 'bold', color: Colors.text },
  selectedTagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  tagChip: { backgroundColor: Colors.success, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginRight: 6, marginBottom: 6 },
  tagChipText: { fontFamily: getFont("mono"), fontSize: 14, color: Colors.text },
  addButton: { width: '85%', paddingVertical: 14, backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.text, borderRadius: 8, marginTop: 10, alignSelf: 'center' },
  addText: { fontFamily: getFont("mono"), fontSize: 22, color: Colors.text, textAlign: 'center' },
});
