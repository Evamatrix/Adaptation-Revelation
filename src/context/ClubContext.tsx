import { createContext, ReactNode, useContext, useState } from "react";

export interface ClubData {
  description?: string;
  members?: number;
  tags?: string[];
  joined?: boolean;
}

interface ClubContextType {
  allClubs: Record<string, ClubData>;
  currentClub: string | null;
  setCurrentClub: (clubName: string | null) => void;
  getClubData: (clubName: string) => ClubData;
  setClubData: (clubName: string, data: Partial<ClubData>) => void;
  clearClubData: (clubName: string) => void;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider = ({ children }: { children: ReactNode }) => {
  const [allClubs, setAllClubs] = useState<Record<string, ClubData>>({
    "Chess Club": { description: "For chess lovers", members: 42, tags: ["games", "strategy"], joined: false },
    "Book Club": { description: "Discuss novels", members: 30, tags: ["reading", "literature"], joined: false },
    "Coding Club": { description: "Learn to code together", members: 55, tags: ["tech", "education"], joined: false },
    "Music Club": { description: "Jam sessions and music appreciation", members: 18, tags: ["music", "arts"], joined: false },
    "Cooking Club": { description: "Explore recipes and cuisines", members: 25, tags: ["food", "social"], joined: false },
    "Screenwriter's Club": { description: "Collaborate on scripts, share feedback, and explore storytelling together.", members: 12, tags: ["writing", "film", "storytelling"], joined: false },
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

  return (
    <ClubContext.Provider
      value={{
        allClubs,
        currentClub,
        setCurrentClub,
        getClubData,
        setClubData,
        clearClubData,
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
