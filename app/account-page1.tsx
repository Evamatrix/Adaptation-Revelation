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
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useFonts, Koulen_400Regular } from '@expo-google-fonts/koulen';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import AppLoading from 'expo-app-loading';
import { useUser } from '../src/context/UserContext';

export default function AccountPage1() {
  const {
    currentEmail,
    getUserDataForEmail,
    setUserDataForEmail,
  } = useUser();

  // ✅ Load the data for the currently logged-in email
  const userData = currentEmail ? getUserDataForEmail(currentEmail) : {};

  const [firstName, setFirstName] = useState(userData.firstName || '');
  const [lastName, setLastName] = useState(userData.lastName || '');
  const [otherPronoun, setOtherPronoun] = useState('');
  const [selectedPronoun, setSelectedPronoun] = useState<string | null>(
    userData.pronoun || null
  );

  useEffect(() => {
    if (currentEmail) {
      const existingData = getUserDataForEmail(currentEmail);
      setFirstName(existingData.firstName || '');
      setLastName(existingData.lastName || '');
      setSelectedPronoun(existingData.pronoun || null);
    }
  }, [currentEmail]);

  const [fontsLoaded] = useFonts({
    Koulen_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  const pronouns = ['She/Her', 'He/Him', 'They/Them', 'Prefer Not To Say'];

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Missing Information', 'Please enter both first and last name.');
      return;
    }

    if (!selectedPronoun && !otherPronoun.trim()) {
      Alert.alert('Missing Information', 'Please select or enter your pronoun.');
      return;
    }

    if (currentEmail) {
      setUserDataForEmail(currentEmail, {
        firstName,
        lastName,
        pronoun: otherPronoun || selectedPronoun || '',
      });
    }

    router.push('/create-account-pg2');
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <Text style={styles.title}>WELCOME!</Text>

        {/* FIRST NAME */}
        <Text style={styles.label}>FIRST NAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#A0A0A0"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* LAST NAME */}
        <Text style={styles.label}>LAST NAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#A0A0A0"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* PRONOUNS */}
        <Text style={styles.label}>PRONOUN(S):</Text>
        {pronouns.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.pronounBox,
              selectedPronoun === item && styles.pronounSelected,
            ]}
            onPress={() => setSelectedPronoun(item)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.pronounText,
                selectedPronoun === item && styles.pronounTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}

        {/* OTHER PRONOUN */}
        <View style={styles.otherContainer}>
          <Text style={styles.otherLabel}>Other:</Text>
          <TextInput
            style={styles.otherInput}
            placeholder="i.e. N/A"
            placeholderTextColor="#A0A0A0"
            value={otherPronoun}
            onChangeText={setOtherPronoun}
          />
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/user-verified')}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT</Text>
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
  pronounBox: {
    width: FIXED_WIDTH,
    height: 44,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff8f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  pronounSelected: {
    backgroundColor: '#ffc5cd',
    borderColor: '#ff4b6e',
  },
  pronounText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 20, default: 16 }),
    color: '#000',
  },
  pronounTextSelected: {
    fontWeight: 'bold',
  },
  otherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: FIXED_WIDTH,
    marginTop: 10,
    marginBottom: 24,
  },
  otherLabel: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 20, default: 16 }),
    color: '#000',
    marginRight: 8,
  },
  otherInput: {
    flex: 1,
    height: 42,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff8f9',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 18, default: 14 }),
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
