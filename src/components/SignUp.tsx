import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useFonts, Koulen_400Regular } from '@expo-google-fonts/koulen';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import AppLoading from 'expo-app-loading';
import { useUser } from '../context/UserContext'; // ✅ Import user context

const windowHeight = Dimensions.get('window').height;

export default function SignUp() {
  const [email, setEmail] = useState('');
  const { setCurrentEmail } = useUser(); // ✅ Access context function

  // Load fonts
  const [fontsLoaded] = useFonts({
    Koulen_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // ✅ Verify email and store in context
  const handleVerify = () => {
    if (email && email.includes('@') && email.includes('.edu')) {
      const cleanEmail = email.trim().toLowerCase();

      // ✅ Store the current email in global context
      setCurrentEmail(cleanEmail);

      // ✅ Navigate to verification page
      router.push({
        pathname: '/user-verified',
        params: { email: cleanEmail },
      });
    } else {
      Alert.alert('Invalid Email', 'Please enter a valid school email address');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>sign up</Text>

      <Text style={styles.label}>Enter school email:</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="name@school.edu"
          placeholderTextColor="#5C5C5C"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={handleVerify}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    alignSelf: 'center',
    minHeight: windowHeight,
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 48, default: 45 }),
    fontWeight: '400',
    marginBottom: 60,
    textTransform: 'uppercase',
  },
  label: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 22, default: 20 }),
    fontWeight: '400',
    marginBottom: 30,
    width: '90%',
  },
  inputWrapper: {
    width: '100%',
    maxWidth: 294,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFFAFA',
    justifyContent: 'center',
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: '100%',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 20, default: 18 }),
    paddingHorizontal: 15,
  },
  button: {
    width: '100%',
    maxWidth: 183,
    height: 56,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 28, default: 26 }),
  },
});
