import { useRouter } from 'expo-router';
import { JSX, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function CreateAccountPg2(): JSX.Element {
  const [form, setForm] = useState({
    nationality: '',
    languages: '',
    religion: '',
    interests: '',
  });

  const router = useRouter();

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SELECT</Text>

      {Object.keys(form).map((field) => (
        <View key={field} style={styles.section}>
          <Text style={styles.label}>{field.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${field}`}
            value={form[field as keyof typeof form]}
            onChangeText={(value) => handleChange(field as keyof typeof form, value)}
          />
        </View>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fffafa' }]}
          onPress={() => router.back()}        >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fffafa' }]}
          onPress={() => router.push({pathname: '/user-profile', params: { from: 'createAccount' } })}
        >
          <Text style={styles.buttonText}>FINISH</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressDots}>
        <View style={[styles.dot, { backgroundColor: '#D3D3D3' }]} />
        <View style={[styles.dot, { backgroundColor: '#000' }]} />
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
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Koulen',
    fontSize: 45,
    marginVertical: 60,
  },
  section: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 40,
  },
  label: {
    color: '#000',
    fontFamily: 'JetBrains Mono',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fffafa',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'JetBrains Mono',
    fontSize: 18,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    marginTop: 20,
  },
  button: {
    width: '48%',
    height: 56,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Koulen',
    fontSize: 28,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
