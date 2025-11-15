// src/context/UserContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserData {
  firstName?: string;
  lastName?: string;
  pronoun?: string;
  nationality?: string[];
  languages?: string[];
  religion?: string[];
  interests?: string[];
}

interface UserContextType {
  allUsers: Record<string, UserData>;
  currentEmail: string | null;
  setCurrentEmail: (email: string | null) => void;
  getUserDataForEmail: (email: string) => UserData;
  setUserDataForEmail: (email: string, data: Partial<UserData>) => void;
  clearUserData: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers] = useState<Record<string, UserData>>({});
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
 
const getUserDataForEmail = (email: string | null): UserData => {
    if (!email) return {};  
    const user = allUsers[email];
    return user ? user : {};
  };
   
  const setUserDataForEmail = (email: string, data: Partial<UserData>) => {
    setAllUsers((prev) => ({
      ...prev,
      [email]: { ...prev[email], ...data },
    }));
  };
 
  const clearUserData = (email: string) => {
    setAllUsers((prev) => {
      const updated = { ...prev };
      delete updated[email];
      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{
        allUsers,
        currentEmail,
        setCurrentEmail,
        getUserDataForEmail,
        setUserDataForEmail,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
