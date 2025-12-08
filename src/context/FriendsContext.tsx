import { createContext, ReactNode, useContext, useState } from "react";

export interface Friend {
  id: number;
  name: string;
  avatar: string;
  tags?: string[];
  description?: string;
}

interface FriendsContextType {
  friends: Friend[];
  addFriend: (friend: Friend) => void;
  removeFriend: (id: number) => void;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const FriendsProvider = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 1,
      name: "Alex",
      avatar: "https://i.pravatar.cc/100?img=1",
      tags: ["Sports", "Music"],
      description: "Loves basketball and playing guitar.",
    },
    {
      id: 2,
      name: "Jamie",
      avatar: "https://i.pravatar.cc/100?img=2",
      tags: ["Cooking", "Finance"],
      description: "Enjoys experimenting with recipes and investing.",
    },
    {
      id: 3,
      name: "Taylor",
      avatar: "https://i.pravatar.cc/100?img=3",
      tags: ["Reading", "Film"],
      description: "Avid reader and movie buff.",
    },
    {
      id: 4,
      name: "Jordan",
      avatar: "https://i.pravatar.cc/100?img=4",
      tags: ["Engineering", "Social"],
      description: "Engineer who loves networking and meeting new people.",
    },
    {
      id: 5,
      name: "Riley",
      avatar: "https://i.pravatar.cc/100?img=5",
      tags: ["Writing", "Music"],
      description: "Writes poetry and plays piano.",
    },
    {
      id: 6,
      name: "Sam",
      avatar: "https://i.pravatar.cc/100?img=6",
      tags: ["Sports", "Cooking"],
      description: "Soccer player and foodie.",
    },
    {
      id: 7,
      name: "Casey",
      avatar: "https://i.pravatar.cc/100?img=7",
      tags: ["Finance", "Reading"],
      description: "Enjoys reading about markets and history.",
    },
    {
      id: 8,
      name: "Morgan",
      avatar: "https://i.pravatar.cc/100?img=8",
      tags: ["Social", "Film"],
      description: "Loves hosting movie nights.",
    },
  ]);

  const addFriend = (friend: Friend) => {
    setFriends((prev) => {
      if (prev.some((f) => f.id === friend.id)) return prev; // avoid duplicates
      return [...prev, friend];
    });
  };

  const removeFriend = (id: number) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FriendsContext.Provider value={{ friends, addFriend, removeFriend }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const ctx = useContext(FriendsContext);
  if (!ctx) {
    throw new Error("useFriends must be used within a FriendsProvider");
  }
  return ctx;
};
