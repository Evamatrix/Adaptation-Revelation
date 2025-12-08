import AsyncStorage from "@react-native-async-storage/async-storage";

export async function clearAllChats() {
  try {
    await AsyncStorage.clear();
    console.log("All chats cleared successfully.");
  } catch (e) {
    console.error("Error clearing chats:", e);
  }
}

export type Message = { sender: string; text: string; time: string };

const keyForChat = (chatName: string) => `chat:${chatName}`;

export async function getMessages(chatName: string): Promise<Message[]> {
  try {
    const stored = await AsyncStorage.getItem(keyForChat(chatName));
    if (stored) return JSON.parse(stored);
    return [
      {
        sender: chatName,
        text: `Hey! It's ${chatName}.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  } catch (e) {
    console.error("Error loading messages", e);
    return [];
  }
}

export async function addMessage(chatName: string, message: Message) {
  try {
    const current = await getMessages(chatName);
    const updated = [...current, message];
    await AsyncStorage.setItem(keyForChat(chatName), JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error saving message", e);
    return [];
  }
}
