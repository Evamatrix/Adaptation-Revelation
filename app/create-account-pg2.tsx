import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useUser } from '../src/context/UserContext';
import { useFonts, Koulen_400Regular } from '@expo-google-fonts/koulen';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import AppLoading from 'expo-app-loading';

export default function CreateAccountPg2() {
  const {
    currentEmail,
    getUserDataForEmail,
    setUserDataForEmail,
  } = useUser();

  // ✅ Load user-specific data
  const userData = currentEmail ? getUserDataForEmail(currentEmail) : {};

  const [nationality, setNationality] = useState(userData.nationality || '');
  const [languages, setLanguages] = useState(userData.languages || '');
  const [religion, setReligion] = useState(userData.religion || '');
  const [interests, setInterests] = useState(userData.interests || '');

  // ✅ Load existing data when email changes
  useEffect(() => {
    if (currentEmail) {
      const existingData = getUserDataForEmail(currentEmail);
      setNationality(existingData.nationality || '');
      setLanguages(existingData.languages || '');
      setReligion(existingData.religion || '');
      setInterests(existingData.interests || '');
    }
  }, [currentEmail]);

  const [fontsLoaded] = useFonts({
    Koulen_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  const handleFinish = () => {
    if (currentEmail) {
      setUserDataForEmail(currentEmail, {
        nationality,
        languages,
        religion,
        interests,
      });
    }
    router.push('/user-profile');
  };

  const handleBack = () => {
    router.push('/account-page1');
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <Text style={styles.title}>SELECT</Text>

        {/* INPUT FIELDS */}
        <Text style={styles.label}>NATIONALITY:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Nationality"
          placeholderTextColor="#A0A0A0"
          value={nationality}
          onChangeText={setNationality}
        />

        <Text style={styles.label}>LANGUAGES:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Languages"
          placeholderTextColor="#A0A0A0"
          value={languages}
          onChangeText={setLanguages}
        />

        <Text style={styles.label}>RELIGION:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Religion"
          placeholderTextColor="#A0A0A0"
          value={religion}
          onChangeText={setReligion}
        />

        <Text style={styles.label}>INTERESTS:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Interests"
          placeholderTextColor="#A0A0A0"
          value={interests}
          onChangeText={setInterests}
        />

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>FINISH</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ---------- Styles ----------
const { width } = Dimensions.get('window');
const FIXED_WIDTH = Math.min(width * 0.85, 380);

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Koulen_400Regular',
    color: '#000',
    textAlign: 'center',
    fontSize: Platform.select({ web: 48, default: 36 }),
    marginVertical: 30,
  },
  label: {
    color: '#000',
    alignSelf: 'flex-start',
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 20, default: 16 }),
    fontWeight: 'bold',
    marginBottom: 8,
    width: FIXED_WIDTH,
  },
  input: {
    width: FIXED_WIDTH,
    height: 44,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff8f9',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 20, default: 16 }),
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: FIXED_WIDTH,
    marginTop: 10,
  },
  button: {
    width: '48%',
    height: 44,
    backgroundColor: '#fff8f9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 20, default: 16 }),
    color: '#000',
  },
});
