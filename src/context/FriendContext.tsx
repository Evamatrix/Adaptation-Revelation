import { createContext, ReactNode, useContext, useState } from 'react';

type Message = {
  id: string;
  friend: string; // the friend’s name
  sender: string; // "You" or friend
  text: string;
  timestamp: number;
};

type FriendContextType = {
  messages: Message[];
  addMessage: (friend: string, sender: string, text: string) => void;
};

const FriendContext = createContext<FriendContextType | undefined>(undefined);

export const FriendProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (friend: string, sender: string, text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      friend,
      sender,
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <FriendContext.Provider value={{ messages, addMessage }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendContext);
  if (!context) throw new Error('useFriends must be used within FriendProvider');
  return context;
};
