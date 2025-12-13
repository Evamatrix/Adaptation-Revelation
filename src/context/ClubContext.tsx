import { createContext, ReactNode, useContext, useState } from "react";

console.log("🔥 ClubContext file loaded");


export interface ClubData {
  description?: string;
  members?: number;
  tags?: string[];
  joined?: boolean;
  messages?: { sender: string; text: string; time: string }[]; // new field for messages
  createer?: string;
}

interface ClubContextType {
  allClubs: Record<string, ClubData>;
  currentClub: string | null;
  setCurrentClub: (clubName: string | null) => void;
  getClubData: (clubName: string) => ClubData;
  setClubData: (clubName: string, data: Partial<ClubData>) => void;
  clearClubData: (clubName: string) => void;
  createClub: (clubName: string, data: ClubData) => void;
}


const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider = ({ children }: { children: ReactNode }) => {
  const [allClubs, setAllClubs] = useState<Record<string, ClubData>>({
    "Chess Club": { description: "For chess lovers", members: 42, tags: ["Games", "Social"], joined: false },
    "Book Club": { description: "Discuss novels", members: 30, tags: ["Reading"], joined: false },
    "Coding Club": { description: "Learn to code together", members: 55, tags: ["Engineering"], joined: false },
    "Music Club": { description: "Jam sessions and music appreciation", members: 18, tags: ["Music", "Art"], joined: false },
    "Cooking Club": { description: "Explore recipes and cuisines", members: 25, tags: ["Cooking", "Social"], joined: false },
    
    // New club with messages
    "Screenwriters Club": {
      description: "A place for aspiring screenwriters to share ideas and get feedback.",
      members: 8,
      tags: ["Writing", "Film"],
      joined: false,
      messages: [
        { sender: "Evelyn", text: "Hey everyone, just finished the first draft of my script!", time: "10:15 AM" },
        { sender: "Evelyn", text: "Would love some feedback on the dialogue in scene 3.", time: "10:20 AM" },
        { sender: "Evelyn", text: "Also, who’s interested in doing a collaborative short film project?", time: "10:30 AM" },
      ],
    },
  });

  const [currentClub, setCurrentClub] = useState<string | null>(null);

  const getClubData = (clubName: string): ClubData => {
    return allClubs[clubName] || {};
  };

  const setClubData = (clubName: string, data: Partial<ClubData>) => {
    setAllClubs(prev => ({
      ...prev,
      [clubName]: { ...prev[clubName], ...data },
    }));
  };

  const clearClubData = (clubName: string) => {
    setAllClubs(prev => {
      const updated = { ...prev };
      delete updated[clubName];
      return updated;
    });
  };

  const createClub = (clubName: string, data: ClubData) => {
    setAllClubs(prev => ({
      [clubName]: {
        ...data,
        joined: true,
        members: 1,
        messages: [],
      },
      ...prev,
    }));
  };


  return (
    <ClubContext.Provider
      value={{
        allClubs,
        currentClub,
        setCurrentClub,
        getClubData,
        setClubData,
        clearClubData,
        createClub,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export const useClubs = (): ClubContextType => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error("useClubs must be used within a ClubProvider");
  }
  return context;
};
