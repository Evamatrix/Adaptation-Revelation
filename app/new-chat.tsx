import { useRouter } from 'expo-router';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SharedClub() {
  const router = useRouter();

  const messages = [
    { sender: 'Evelyn', text: 'i love grilling!' },
    { sender: 'Me', text: 'same!!' },
    { sender: 'Evelyn', text: 'we should make a grilling club!!' },
    { sender: 'Me', text: 'will do!' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Evelyn H.</Text>

      <View style={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageBubble,
              msg.sender === 'Evelyn' ? styles.leftBubble : styles.rightBubble,
            ]}
          >
              <Text style={[
                styles.messageText,
                msg.sender === 'Me' ? { color: '#fff' } : { color: '#000' }
              ]}>
                {msg.text}
              </Text>
            <Text style={styles.messageTime}>10:35 am</Text>
          </View>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a text message"
          placeholderTextColor="#888"
          editable={false} 
        />
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/homescreen')}>
            <Text style={styles.menuIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/connect')}>
            <Text style={styles.menuIcon}>🧭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/chats')}>
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
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20, 
    backgroundColor: '#FFF8F9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#000',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Koulen_400Regular',
    color: '#000',
    marginTop: 100,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    width: '90%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    width: '90%',
    marginTop: 30,
    paddingBottom: 100,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 10,
  },
  leftBubble: {
    backgroundColor: '#d9d9d9',
    alignSelf: 'flex-start',
  },
  rightBubble: {
    backgroundColor: '#597aa4',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 12,
    color: '#5c5c5c',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 140 : 120,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 48,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 16,
    backgroundColor: '#f2f2f2',
    color: '#000',
  },
  addButton: {
    marginLeft: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4b75b3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'JetBrainsMono_400Regular',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  menu: {
    width: '90%',
    height: 80,
    backgroundColor: '#88E9FF',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 28,
  },
});
