import React, { useState, useEffect, JSX } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type UserVerifiedRouteProp = RouteProp<RootStackParamList, 'UserVerified'>;

export default function UserVerified(): JSX.Element {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const route = useRoute<UserVerifiedRouteProp>();

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params]);

  const handleEnter = () => {
    if (email && email.includes('@') && email.includes('.edu')) {
        // @ts-ignore
      navigation.navigate('AccountPage1', { email });
    } else {
      Alert.alert('Invalid Email', 'Please enter a valid school email address');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkIcon}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      </View>

      <Text style={styles.title}>user verified</Text>
      <Text style={styles.signInLabel}>sign in:</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="name@school.edu"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={handleEnter}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEnter}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 440,
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 20,
  },
  checkIcon: {
    marginVertical: 60,
    alignItems: 'center',
  },
  checkCircle: {
    width: 130,
    height: 130,
    backgroundColor: '#39ba4d',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#a9f59f',
    fontSize: 60,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Koulen',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 30,
  },
  signInLabel: {
    fontFamily: 'Koulen',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    maxWidth: 294,
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'snow',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    fontFamily: 'JetBrains Mono',
    fontSize: 22,
    textAlign: 'center',
    color: '#5c5c5c',
  },
  button: {
    width: 160,
    height: 48,
    backgroundColor: 'snow',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Koulen',
    fontSize: 30,
    textAlign: 'center',
    color: '#000',
  },
});
