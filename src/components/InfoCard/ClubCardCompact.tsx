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
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number; width: number }>({
    x: 0,
    y: 0,
    width: 0,
  });
  const [shareVisible, setShareVisible] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const cardRef = useRef<View>(null);

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
        const left = pageX + width - menuWidth;
        setMenuPosition({ x: left, y: pageY + height, width: menuWidth });
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
    if (selectedFriends.length === 0) return;

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
      top: menuPosition.y,
      left: menuPosition.x,
      backgroundColor: Colors.backgroundSecondary,
      borderRadius: 8,
      overflow: "hidden",
      width: menuPosition.width,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    menuOption: { paddingVertical: 12, paddingHorizontal: 16 },
    menuOptionText: { fontSize: 16, fontFamily: getFont("mono"), color: Colors.text },

    shareModal: {
      backgroundColor: Colors.backgroundSecondary,
      marginHorizontal: 20,
      borderRadius: 12,
      padding: 16,
      maxHeight: "80%",
    },
    friendItem: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginVertical: 4,
      backgroundColor: Colors.background,
    },
    friendText: { fontFamily: getFont("mono"), fontSize: 16, color: Colors.text },
    friendTextSelected: { fontWeight: "bold", color: "#fff" },
    input: {
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 8,
      padding: 8,
      marginTop: 12,
      fontFamily: getFont("mono"),
      color: Colors.text,
    },
    sendButton: {
      backgroundColor: Colors.success,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 12,
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
            <View style={styles.menuModal}>
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
            style={styles.menuModalContainer}
          >
            <View style={styles.menuOverlay} />
            <View style={styles.shareModal}>
              <Text style={styles.friendText}>Select friends to share "{name}" with:</Text>
              <FlatList
                data={allFriends}
                keyExtractor={f => f.id.toString()}
                renderItem={({ item }) => {
                  const selected = selectedFriends.includes(item.id);
                  return (
                    <TouchableOpacity
                      onPress={() => toggleFriendSelection(item.id)}
                      style={[
                        styles.friendItem,
                        selected && { backgroundColor: Colors.primary },
                      ]}
                    >
                      <Text style={[styles.friendText, selected && styles.friendTextSelected]}>
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
