import React, { JSX, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AccountPage1(): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherPronoun, setOtherPronoun] = useState('');

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
 
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>FIRST NAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
 
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>LAST NAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
 
      <View style={styles.pronounSection}>
        <Text style={styles.label}>Pronoun(s):</Text>

        <View style={styles.pronounButton}>
          <Text style={styles.pronounText}>She/Her</Text>
        </View>

        <View style={styles.pronounButton}>
          <Text style={styles.pronounText}>He/Him</Text>
        </View>

        <View style={styles.pronounButton}>
          <Text style={styles.pronounText}>They/Them</Text>
        </View>

        <View style={styles.pronounButton}>
          <Text style={styles.pronounText}>Prefer Not To Say</Text>
        </View>

        <View style={styles.otherContainer}>
          <Text style={styles.label}>Other:</Text>
          <TextInput
            style={styles.otherInput}
            placeholder="i.e. N/A"
            value={otherPronoun}
            onChangeText={setOtherPronoun}
          />
        </View>
      </View>
 
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ffc5cd' }]}
          onPress={() => navigation.navigate('UserVerified' as never)}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ffc5cd' }]}
          onPress={() => navigation.navigate('CreateAccountPg2' as never)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Koulen',
    fontSize: 45,
    textAlign: 'center',
    color: '#000',
    marginVertical: 40,
  },
  fieldContainer: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontFamily: 'JetBrains Mono',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff8f9',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'JetBrains Mono',
    borderRadius: 6,
  },
  pronounSection: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 20,
  },
  pronounButton: {
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff8f9',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  pronounText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 18,
    color: '#000',
  },
  otherContainer: {
    marginTop: 15,
  },
  otherInput: {
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff8f9',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'JetBrains Mono',
    borderRadius: 10,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 380,
    marginTop: 30,
  },
  button: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 18,
    color: '#000',
  },
});
