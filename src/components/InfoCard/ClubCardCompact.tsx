import { useRef, useState } from "react";
import {
  findNodeHandle,
  Image,
  Modal,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";
import Colors from "../../constants/colors";
import { getFont, useAppFonts } from "../../constants/fonts";
import { useClubs } from "../../context/ClubContext";

interface ClubCompactProps {
  name: string;
  image?: any; // optional
  onPress?: () => void;
}

export default function ClubCardCompact({ name, image, onPress }: ClubCompactProps) {
  const fontsLoaded = useAppFonts();
  const { setClubData, allClubs } = useClubs();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number; width: number }>({
    x: 0,
    y: 0,
    width: 0,
  });
  const cardRef = useRef<View>(null);

  if (!fontsLoaded) return null;

  const handleLeave = () => {
    setClubData(name, {
      joined: false,
      members: (allClubs[name].members || 1) - 1,
    });
    setMenuVisible(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this club: ${name}!`,
      });
    } catch (error) {
      console.log("Error sharing club:", error);
    } finally {
      setMenuVisible(false);
    }
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

      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.menuModalContainer}>
            <View style={styles.menuOverlay} />
            <View style={styles.menuModal}>
              <TouchableOpacity style={styles.menuOption} onPress={handleLeave}>
                <Text style={styles.menuOptionText}>Leave Club</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={handleShare}>
                <Text style={styles.menuOptionText}>Share Club</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
