import { useRef, useState } from "react";
import {
  findNodeHandle,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { useClubs } from "../../context/ClubContext";
import { useFriends } from "../../context/FriendsContext";
import { addMessage as addStoredMessage } from "../../store/chats";

interface ClubCompactProps {
  name: string;
  image?: any;
  onPress?: () => void;
}

export default function ClubCardCompact({ name, image, onPress }: ClubCompactProps) {
  const fontsLoaded = useAppFonts();
  const { setClubData, allClubs } = useClubs();
  const { friends: allFriends } = useFriends();

  const cardRef = useRef<View>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [shareVisible, setShareVisible] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [customMessage, setCustomMessage] = useState("");

  if (!fontsLoaded) return null;

  const handleLeave = () => {
    setClubData(name, {
      joined: false,
      members: (allClubs[name].members || 1) - 1,
    });
    setMenuVisible(false);
  };

  const openMenu = () => {
    const nodeHandle = findNodeHandle(cardRef.current);
    if (nodeHandle) {
      UIManager.measure(nodeHandle, (x, y, width, height, pageX, pageY) => {
        const menuWidth = 160;
        const menuHeight = 100; // approximate, adjust if needed
        setMenuPosition({
          top: pageY + height, // bottom of card
          left: pageX + width - menuWidth, // right aligned
        });
        setMenuVisible(true);
      });
    }
  };

  const openShare = () => {
    setMenuVisible(false);
    setShareVisible(true);
  };

  const toggleFriendSelection = (id: number) => {
    setSelectedFriends(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSendShare = async () => {
    if (!selectedFriends.length) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    for (const friendId of selectedFriends) {
      const friend = allFriends.find(f => f.id === friendId);
      if (!friend) continue;

      const message = {
        sender: "Me",
        text: `${customMessage.trim()}\nCheck out this club → /club-card/${encodeURIComponent(name)}`,
        time: timestamp,
      };

      await addStoredMessage(friend.name, message);
    }

    setSelectedFriends([]);
    setCustomMessage("");
    setShareVisible(false);
  };

  const selectedFriendBg = Colors.primary;
  const selectedFriendText = "#fff";

  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.background,
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: Colors.border,
      justifyContent: "space-between",
    },
    left: { flexDirection: "row", alignItems: "center" },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.tertiary,
    },
    imageText: { fontSize: 18, fontFamily: getFont("mono"), color: Colors.text },
    name: { fontFamily: getFont("heading"), fontSize: 18, color: Colors.text },
    menuButton: { paddingHorizontal: 10, paddingVertical: 6 },
    menuText: { fontSize: 18, fontFamily: getFont("heading"), color: Colors.text },

    menuModalContainer: { flex: 1, backgroundColor: "transparent" },
    menuOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.1)" },
    menuModal: {
      position: "absolute",
      backgroundColor: Colors.backgroundSecondary,
      borderRadius: 8,
      overflow: "hidden",
      width: 160,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    menuOption: { paddingVertical: 12, paddingHorizontal: 16 },
    menuOptionText: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text },

    shareModal: {
      backgroundColor: Colors.secondary,
      marginHorizontal: 24,
      borderRadius: 16,
      padding: 16,
      maxHeight: "75%",
      alignSelf: "center",
      width: "90%",
    },
    modalHeader: {
      fontSize: 18,
      fontFamily: getFont("heading"),
      marginBottom: 12,
      textAlign: "center",
      color: Colors.text,
    },
    friendItem: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 8,
      marginVertical: 4,
      backgroundColor: Colors.background,
    },
    friendText: { fontFamily: getFont("mono"), fontSize: 16, color: Colors.text },
    input: {
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 10,
      padding: 10,
      marginTop: 12,
      fontFamily: getFont("mono"),
      color: Colors.text,
    },
    sendButton: {
      backgroundColor: Colors.success,
      paddingVertical: 12,
      borderRadius: 10,
      marginTop: 16,
      alignItems: "center",
    },
    sendButtonText: { fontFamily: getFont("mono"), color: Colors.text },
  });

  return (
    <>
      <TouchableOpacity ref={cardRef} style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.left}>
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <Text style={styles.imageText}>{name[0]}</Text>
            </View>
          )}
          <Text style={styles.name}>{name}</Text>
        </View>

        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Popup menu */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.menuModalContainer}>
            <View style={styles.menuOverlay} />
            <View style={[styles.menuModal, { top: menuPosition.top, left: menuPosition.left }]}>
              <TouchableOpacity style={styles.menuOption} onPress={handleLeave}>
                <Text style={styles.menuOptionText}>Leave Club</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={openShare}>
                <Text style={styles.menuOptionText}>Share Club</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Share modal */}
      <Modal visible={shareVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShareVisible(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }} // fill the screen
          >
            {/* Full-screen grey overlay */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            />

            {/* Share modal panel */}
            <View style={[styles.shareModal, { marginTop: 60, alignSelf: "center" }]}>
              <Text style={styles.modalHeader}>Share "{name}" with friends</Text>
              <FlatList
                data={allFriends}
                keyExtractor={f => f.id.toString()}
                style={{ maxHeight: 200 }}
                renderItem={({ item }) => {
                  const selected = selectedFriends.includes(item.id);
                  return (
                    <TouchableOpacity
                      onPress={() => toggleFriendSelection(item.id)}
                      style={[
                        styles.friendItem,
                        selected && { backgroundColor: selectedFriendBg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.friendText,
                          selected && { color: selectedFriendText, fontWeight: "bold" },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
              <TextInput
                placeholder="Add a custom message..."
                placeholderTextColor={Colors.subtext}
                style={styles.input}
                value={customMessage}
                onChangeText={setCustomMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendShare}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>


    </>
  );
}
