import { useLocalSearchParams } from "expo-router";
import ClubChat from "../../src/components/Chat/ClubChat"; // adjust path if needed

export default function ClubChatPage() {
  const { clubName } = useLocalSearchParams();
  const name = Array.isArray(clubName) ? clubName[0] : clubName || "Club";

  return <ClubChat name={name} />; // ✅ matches ClubChatProps
}
