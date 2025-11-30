import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFonts, Koulen_400Regular } from '@expo-google-fonts/koulen';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import AppLoading from 'expo-app-loading';

const windowHeight = Dimensions.get('window').height;

export default function UserVerified() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Koulen_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}> 
      <View style={styles.checkIcon}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      </View>
 
      <Text style={styles.title}>user verified</Text>
      <Text style={styles.signInLabel}>verified email:</Text>
 
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={email || 'name@school.edu'}
          editable={false} 
          selectTextOnFocus={false}
        />
      </View>
 
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: '/account-page1',
            params: { email }, 
          })
        }
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    minHeight: windowHeight,
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
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 50, default: 45 }),
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
    textTransform: 'lowercase',
  },
  signInLabel: {
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 40, default: 36 }),
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
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
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: Platform.select({ web: 22, default: 20 }),
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
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Koulen_400Regular',
    fontSize: Platform.select({ web: 30, default: 28 }),
    textAlign: 'center',
    color: '#000',
  },
});
