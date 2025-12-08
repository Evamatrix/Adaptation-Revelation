import { useLocalSearchParams } from "expo-router";
import FriendChat from "../../src/components/Chat/FriendChat"; // adjust path if needed

export default function FriendChatPage() {
  const { name } = useLocalSearchParams();
  const chatName = Array.isArray(name) ? name[0] : name;

  return <FriendChat name={chatName} />;
}