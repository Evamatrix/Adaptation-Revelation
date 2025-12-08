import AsyncStorage from "@react-native-async-storage/async-storage";

export type Message = { sender: string; text: string; time: string };

const keyForFriend = (friend: string) => `chat:${friend}`;

export async function getMessages(friend: string): Promise<Message[]> {
  try {
    const stored = await AsyncStorage.getItem(keyForFriend(friend));
    if (stored) return JSON.parse(stored);
    // Default starter message
    return [
      {
        sender: friend,
        text: `Hey! It's ${friend}.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  } catch (e) {
    console.error("Error loading messages", e);
    return [];
  }
}

export async function addMessage(friend: string, message: Message) {
  try {
    const current = await getMessages(friend);
    const updated = [...current, message];
    await AsyncStorage.setItem(keyForFriend(friend), JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error saving message", e);
    return [];
  }
}
