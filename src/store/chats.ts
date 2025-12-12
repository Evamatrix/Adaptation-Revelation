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
    return []; // return empty array, we’ll preload if needed
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

/**
 * Preload initial messages into a chat if none exist.
 * @param chatName name of the chat
 * @param initialMessages array of messages to preload
 * @returns the updated list of messages
 */
export async function preloadMessages(chatName: string, initialMessages: Message[]): Promise<Message[]> {
  const existing = await getMessages(chatName);
  if (existing.length > 0) return existing; // already have messages
  if (initialMessages.length > 0) {
    for (const msg of initialMessages) {
      await addMessage(chatName, msg);
    }
    return await getMessages(chatName);
  }
  return [];
}
