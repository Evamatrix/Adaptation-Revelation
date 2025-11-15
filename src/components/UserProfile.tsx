import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUser } from '../context/UserContext';

export default function UserProfile() {
  const { currentEmail, getUserDataForEmail, clearUserData, setCurrentEmail } = useUser();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  // Pick image function
  const pickImage = async () => {
    console.log('Pick image pressed');
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission required to access photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const userData = currentEmail ? getUserDataForEmail(currentEmail) : {};
  const {
    firstName = 'First',
    lastName = 'Last',
    pronoun = 'They/Them',
    nationality,
    languages,
    religion,
    interests,
  } = userData;

  console.log('Current email:', currentEmail);
  console.log('User data:', userData);


  const safeValue = (value?: string) => (value && value.trim() !== '' ? value : 'N/A');

  const handleSignOut = () => {
    if (currentEmail) clearUserData(currentEmail);
    setCurrentEmail(null);
    router.replace('/signup');
  };

  return (
    <SafeAreaView style={styles.safeArea}> 
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
        activeOpacity={0.8}
      >
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}> 
        <View style={styles.header}>
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            style={styles.photoContainer}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.photoImage} />
            ) : (
              <Text style={styles.plusSign}>+</Text>
            )}
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.greeting}>HELLO,</Text>
            <Text style={styles.name}>
              {`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
            </Text>
            <Text style={styles.pronouns}>{pronoun.toUpperCase()}</Text>
          </View>
        </View>
 
        <View style={styles.info}>
          {[
            { label: 'NATIONALITY', value: safeValue(nationality) },
            { label: 'LANGUAGES', value: safeValue(languages) },
            { label: 'RELIGION', value: safeValue(religion) },
            { label: 'INTERESTS', value: safeValue(interests) },
          ].map((item, index) => (
            <View key={index} style={styles.infoBlock}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>
 
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.replace('/account-page1')}
          >
            <Text style={styles.buttonText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
 
      <View style={styles.footerContainer}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/homescreen')}>
            <Text style={styles.menuIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/connect')}>
            <Text style={styles.menuIcon}>🧭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/chat-room')}>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  signOutButton: {
    position: 'absolute',
    top: 125,
    right: 20,
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Koulen',
    color: '#000',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,  
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 20,
  },

  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,              // keeps it circular
  },

  plusSign: {
    fontSize: 48,                  // adjust to taste
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
  },


  headerText: { flex: 1 },
  greeting: { fontSize: 26, fontFamily: 'Koulen', color: '#000' },
  name: { fontSize: 40, fontFamily: 'Koulen', color: '#000' },
  pronouns: { fontSize: 20, color: '#5C5C5C', fontFamily: 'Koulen' },
  info: { marginBottom: 30 },
  infoBlock: { marginBottom: 22 },
  infoLabel: { fontSize: 22, fontFamily: 'Koulen', color: '#000' },
  infoValue: { fontSize: 18, fontFamily: 'Koulen', color: '#5C5C5C' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  navButton: {
    width: '48%',
    height: 52,
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { fontSize: 22, fontFamily: 'Koulen', color: '#000' },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  menu: {
    width: '90%',
    height: 80,
    backgroundColor: '#88E9FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
  },
  menuIcon: {
    fontSize: 28,
  },
});