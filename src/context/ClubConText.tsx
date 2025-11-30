import React, { createContext, useContext, useState } from "react";
import uuid from "react-native-uuid";
 
export interface Club {
  name: string;
  members: number;
  description: string;
  tags: string[];
  joined: boolean; // <-- NEW
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
  addClub: (club: Club) => void;

  toggleJoinClub: (clubName: string) => void;   // <-- NEW

  messages: Message[];
  addMessage: (clubName: string, sender: string, text: string) => void;

  notifications: Notification[];
  addNotification: (text: string) => void;
}

export const ClubContext = createContext<ClubContextType | undefined>(
  undefined
);

export const ClubProvider = ({ children }: { children: React.ReactNode }) => {

  const [clubs, setClubs] = useState<Club[]>([
    { 
      name: "Screenwriters", 
      members: 5, 
      description: "We like to write and discuss movie scripts!",
      tags: ["Film", "Writing"],
      joined: false,   // <-- NEW
    },
    { 
      name: "Eating Club",
      members: 15,
      description: "Trying local restaurants and cafes...",
      tags: ["Food", "Social"],
      joined: false,   // <-- NEW
    },
    { 
      name: "Unicycle Club",
      members: 5,
      description: "Join if you want to learn/ride unicycles",
      tags: ["Sports"],
      joined: false,   // <-- NEW
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addClub = (club: Club) => {
    setClubs((prev) => [...prev, club]);
  };

  // NEW FUNCTION — toggles club join status
  const toggleJoinClub = (clubName: string) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.name === clubName
          ? { ...c, joined: !c.joined }
          : c
      )
    );
  };

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
        addClub,

        toggleJoinClub,   // <-- EXPOSED

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

export const useClubs = () => {
  const ctx = useContext(ClubContext);
  if (!ctx) {
    throw new Error("useClubs must be used inside ClubProvider");
  }
  return ctx;
};
