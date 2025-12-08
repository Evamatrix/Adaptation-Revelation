import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateClub() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission required to access photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleAddClub = () => {
    if (!name.trim() || !description.trim()) {
      alert('Please enter a club name and description.');
      return;
    }

    router.push({
      pathname: '/create-club-pg2',
      params: {
        name,
        description,
        profileImage,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CREATE CLUB</Text>

      <Text style={styles.photoLabel}>ADD CLUB PHOTO</Text>
      <View style={{ alignItems: 'center'}}>
        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.8}
          style={styles.photoContainer}
          >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.photoImage} />
            ) : (
            <View style={styles.plusWrapper}>
              <Text style={styles.plusSign}>+</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>CLUB NAME</Text>
      <TextInput style={styles.input} placeholder="Enter your club's name" value={name} onChangeText={setName} />

      <Text style={styles.label}>DESCRIPTION</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Describe your club"
        multiline
        blurOnSubmit={true}
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddClub} activeOpacity={0.8}>
        <Text style={styles.addText}>NEXT</Text>
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
    marginBottom: 20,
    textTransform: 'uppercase',
  },

  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },

  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    alignItems: 'center',
  },

  plusWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },

  plusSign: {
    fontSize: 90,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
  },

  formContainer: { 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingBottom: 100,
  },  

  photoLabel: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 6,
    color: '#000',
  },

  label: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 25,
    textAlign: 'center',
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
    marginBottom: 30,
    marginLeft: 30,
  },

  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },


  addButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 140 : 120,
    alignSelf: 'center',
    backgroundColor: '#a9f59f',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
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
