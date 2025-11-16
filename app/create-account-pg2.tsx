import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { Koulen_400Regular, useFonts } from '@expo-google-fonts/koulen';
import AppLoading from 'expo-app-loading';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useUser } from '../src/context/UserContext';


/*Options*/
const NAT_OPTS = ["American", "Indian", "Chinese", "Vietnamese", "Mexican", "Other"];
const LANG_OPTS = ["English", "Spanish", "Mandarin", "Hindi", "Vietnamese", "Arabic", "Other"];
const REL_OPTS = ["Christian", "Muslim", "Hindu", "Jewish", "Other"];
const INT_OPTS = ["Sports", "Music", "Reading", "Writing", "Film", "Cooking", "Finance", "Engineering", "Social"];

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

type DropdownSectionProps = {
  title: string;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  options: string[];
  selected: string[];
  toggleSelection: (opt: string) => void;
};

/*Checkboxes for options instead of textbox for easier recommending*/
const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <TouchableOpacity
    onPress={onChange}
    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}
  >
    <View
      style={{
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: checked ? '#000' : 'transparent',
        marginRight: 10,
      }}
    />
    <Text style={{ fontFamily: 'JetBrainsMono_400Regular', fontSize: 16 }}>
      {label}
    </Text>
  </TouchableOpacity>
);

const DropdownSection = ({
  title,
  expanded,
  setExpanded,
  options,
  selected,
  toggleSelection,
}: DropdownSectionProps) => (
  <View style={{ width: FIXED_WIDTH, marginBottom: 20 }}>
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => setExpanded(!expanded)}
      >
        <Text style={{ fontFamily: 'JetBrainsMono_400Regular', fontSize: 18 }}>
          {title}
        </Text>

        <Text style={{ fontSize: 18 }}>
          {expanded ? "▲" : "▼"}
        </Text>
    </TouchableOpacity>

    {expanded && (
      <View style={{ marginTop: 10 }}>
        {options.map((opt) => (
          <Checkbox
            key={opt}
            label={opt}
            checked={selected.includes(opt)}
            onChange={() => toggleSelection(opt)}
          />
        ))}
        </View>
    )}
  </View>
);

export default function CreateAccountPg2() {
  const {
    currentEmail,
    getUserDataForEmail,
    setUserDataForEmail,
  } = useUser();
 
  const userData = currentEmail ? getUserDataForEmail(currentEmail) : {};

  const [nationality, setNationality] = useState(userData.nationality || []);
  const [languages, setLanguages] = useState(userData.languages || []);
  const [religion, setReligion] = useState(userData.religion || []);
  const [interests, setInterests] = useState(userData.interests || []);
 
  const [showNationality, setShowNationality] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showReligion, setShowReligion] = useState(false);
  const [showInterests, setShowInterests] = useState(false);

  useEffect(() => {
    if (currentEmail) {
      const existingData = getUserDataForEmail(currentEmail);
      setNationality(existingData.nationality || []);
      setLanguages(existingData.languages || []);
      setReligion(existingData.religion || []);
      setInterests(existingData.interests || []);
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
    router.push({ pathname: '/user-profile', params: { from: 'createAccount' } });
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
        <Text style={styles.title}>SELECT</Text>
 
        <DropdownSection
          title="NATIONALITY"
          expanded={showNationality}
          setExpanded={setShowNationality}
          options={NAT_OPTS}
          selected={nationality}
          toggleSelection={(opt) =>
            setNationality((prev) =>
            prev.includes(opt) ? prev.filter(i => i != opt) : [...prev, opt]
            )
          }
        />

        <DropdownSection
          title="LANGUAGES"
          expanded={showLanguages}
          setExpanded={setShowLanguages}
          options={LANG_OPTS}
          selected={languages}
          toggleSelection={(opt) =>
            setLanguages((prev) =>
            prev.includes(opt) ? prev.filter(i => i != opt) : [...prev, opt]
            )
          }
        />

        <DropdownSection
          title="RELIGION"
          expanded={showReligion}
          setExpanded={setShowReligion}
          options={REL_OPTS}
          selected={religion}
          toggleSelection={(opt) =>
            setReligion((prev) =>
              prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]
            )
          }
        />

        <DropdownSection
          title="INTERESTS"
          expanded={showInterests}
          setExpanded={setShowInterests}
          options={INT_OPTS}
          selected={interests}
          toggleSelection={(opt) =>
            setInterests((prev) =>
              prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]
            )
          }
        />

 
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
