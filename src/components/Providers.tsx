import { ReactNode } from "react";
import { ClubProvider } from "../context/ClubContext";
import { FriendsProvider } from "../context/FriendsContext";
import { UserProvider } from "../context/UserContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ClubProvider>
        <FriendsProvider>{children}</FriendsProvider>
      </ClubProvider>
    </UserProvider>
  );
}
