import { Slot } from 'expo-router';
import { ClubProvider } from '../src/context/ClubConText';
import { FriendProvider } from '../src/context/FriendContext';
import { UserProvider } from '../src/context/UserContext';

export default function Layout() {
  return (
    <UserProvider>
      <ClubProvider>
        <FriendProvider>
        <Slot />
        </FriendProvider>
      </ClubProvider>
    </UserProvider>
  );
}
