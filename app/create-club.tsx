import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
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

  const handleAddClub = () => {
    if (!name.trim()) {
      alert('Please enter a club name.');
      return;
    }

    addClub({
      name,
      members: 1,
      description: description.trim() || 'No description provided.',
    });

    router.replace('/clubs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* BACK BUTTON (copied styling) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CREATE CLUB</Text>

      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.icon}
      />

      <Text style={styles.label}>CLUB NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter club name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>DESCRIPTION</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddClub}
        activeOpacity={0.8}
      >
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
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' },

  // ✅ COPIED EXACT FROM Clubs.tsx
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
  backText: { fontSize: 16, fontFamily: 'Koulen', color: '#000' },

  title: {
    fontFamily: 'Koulen',
    fontSize: 36,
    marginTop: 80,
    color: '#000',
  },

  icon: {
    width: 100,
    height: 100,
    marginVertical: 20,
    tintColor: '#000',
  },

  label: {
    fontFamily: 'Koulen',
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
    fontFamily: 'JetBrainsMono-Regular',
    padding: 10,
    marginBottom: 20,
  },

  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  addButton: {
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 60,
    paddingVertical: 12,
    marginTop: 10,
  },

  addText: {
    fontFamily: 'Koulen',
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
