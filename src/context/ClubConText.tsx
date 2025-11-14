import React, { createContext, useContext, useState } from "react";
import uuid from "react-native-uuid";


// -----------------------------------------
// TYPES
// -----------------------------------------
export interface Club {
  name: string;
  members: number;
  description: string;
}

export interface Message {
  id: string;
  clubName: string;
  sender: string;
  text: string;
  timestamp: number;
}

export interface Notification {
  id: string;
  text: string;
  timestamp: number;
}

export interface ClubContextType {
  clubs: Club[];
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>;

  messages: Message[];
  addMessage: (clubName: string, sender: string, text: string) => void;

  notifications: Notification[];
  addNotification: (text: string) => void;
}

// -----------------------------------------
// CONTEXT
// -----------------------------------------
export const ClubContext = createContext<ClubContextType | undefined>(
  undefined
);

export const ClubProvider = ({ children }: { children: React.ReactNode }) => {
  const [clubs, setClubs] = useState<Club[]>([
    { name: "Screen Writers", members: 5, description: "Writing & film club" },
    { name: "Eating Club", members: 15, description: "Food lovers" },
    { name: "Unicycle Club", members: 5, description: "Balance and fun!" },
  ]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // -----------------------------------------
  // ADD MESSAGE
  // -----------------------------------------
  const addMessage = (clubName: string, sender: string, text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuid.v4().toString(),
        clubName,
        sender,
        text,
        timestamp: Date.now(),
      },
    ]);
  };

  // -----------------------------------------
  // ADD NOTIFICATION
  // -----------------------------------------
  const addNotification = (text: string) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: uuid.v4().toString(),
        text,
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <ClubContext.Provider
      value={{
        clubs,
        setClubs,

        messages,
        addMessage,

        notifications,
        addNotification,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

// -----------------------------------------
// HOOK
// -----------------------------------------
export const useClubs = () => {
  const ctx = useContext(ClubContext);
  if (!ctx) {
    throw new Error("useClubs must be used inside ClubProvider");
  }
  return ctx;
};
