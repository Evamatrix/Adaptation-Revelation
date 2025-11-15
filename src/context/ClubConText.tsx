import React, { createContext, useContext, useState } from "react";
import uuid from "react-native-uuid";
 
export interface Club {
  name: string;
  members: number;
  description: string;
  tags: string[];
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
      name: "Screen Writers", 
      members: 5, 
      description: "We like to write and discuss movie scripts!",
      tags: ["Film", "Writing"]
    },
    { 
      name: "Eating Club", 
      members: 15, 
      description: "Trying local restaurants and cafes...",
      tags: ["Food", "Social"] 
    },
    { 
      name: "Unicycle Club", 
      members: 5, 
      description: "Join if you want to learn/ride unicycles",
      tags: ["Sports"]
     },
  ]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

 
  const addClub = (club: Club) => {
    setClubs((prev) => [...prev, club]);
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
