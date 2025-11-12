import React, { createContext, useContext, useState } from 'react';

type Club = {
  name: string;
  members: number;
  description: string;
};

type ClubContextType = {
  clubs: Club[];
  addClub: (newClub: Club) => void;
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>;  
};

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider = ({ children }: { children: React.ReactNode }) => {
  const [clubs, setClubs] = useState<Club[]>([
    { name: 'Aardvark Club', members: 24, description: 'A club for aardvark lovers.' },
    { name: 'Screen Writers', members: 5, description: 'We love movies and scripts!' },
  ]);

  const addClub = (newClub: Club) => {
    setClubs((prev) => [newClub, ...prev]);  
  };

  return (
    <ClubContext.Provider value={{ clubs, addClub, setClubs }}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClubs = () => {
  const context = useContext(ClubContext);
  if (!context) throw new Error('useClubs must be used within a ClubProvider');
  return context;
};
