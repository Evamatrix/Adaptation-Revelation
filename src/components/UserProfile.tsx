import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function UserProfile() {
  const {
    currentEmail,
    getUserDataForEmail,
    clearUserData,
    setCurrentEmail,
  } = useUser();
  const router = useRouter();

  // ✅ Load current user's data safely
  const userData = currentEmail ? getUserDataForEmail(currentEmail) : {};

  // ✅ Fallback values
  const {
    firstName = 'First',
    lastName = 'Last',
    pronoun = 'They/Them',
    nationality,
    languages,
    religion,
    interests,
  } = userData;

  const safeValue = (value?: string) =>
    value && value.trim() !== '' ? value : 'N/A';

  // ✅ Sign out logic
  const handleSignOut = () => {
    if (currentEmail) clearUserData(currentEmail);
    setCurrentEmail(null); // clear session
    router.replace('/signup'); // back to first screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🔹 Sign Out Button */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
        activeOpacity={0.8}
      >
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.photo} />
          <View style={styles.headerText}>
            <Text style={styles.greeting}>HELLO,</Text>
            <Text style={styles.name}>
              {`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
            </Text>
            <Text style={styles.pronouns}>{pronoun.toUpperCase()}</Text>
          </View>
        </View>

        {/* Info Section */}
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

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.replace('/account-page1')}
          >
            <Text style={styles.buttonText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Menu */}
        <View style={styles.menu}>
          <Text style={styles.menuIcon}>🏠</Text>
          <Text style={styles.menuIcon}>🧭</Text>
          <Text style={styles.menuIcon}>💬</Text>
          <Text style={styles.menuIcon}>👤</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Styles ----------
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Koulen',
    color: '#000',
  },
  container: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 18,
    marginBottom: 30,
  },
  photo: {
    width: 120,
    height: 120,
    backgroundColor: '#E6E6E6',
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerText: { flex: 1, justifyContent: 'center' },
  greeting: {
    fontSize: 26,
    fontFamily: 'Koulen',
    color: '#000',
    marginBottom: -4,
  },
  name: { fontSize: 40, fontFamily: 'Koulen', color: '#000' },
  pronouns: {
    fontSize: 20,
    color: '#5C5C5C',
    fontFamily: 'Koulen',
    marginTop: 4,
  },
  info: { width: '100%', marginTop: 10, marginBottom: 30 },
  infoBlock: { marginBottom: 22 },
  infoLabel: {
    fontSize: 22,
    fontFamily: 'Koulen',
    color: '#000',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: '#5C5C5C',
    fontFamily: 'Koulen',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 440,
    marginTop: -30,
    marginBottom: 40,
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
  menu: {
    width: '100%',
    height: 90,
    backgroundColor: '#88E9FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: -10,
  },
  menuIcon: { fontSize: 28 },
});
