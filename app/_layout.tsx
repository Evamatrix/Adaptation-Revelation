import { Slot } from 'expo-router';
import { ClubProvider } from '../src/context/ClubConText';
import { UserProvider } from '../src/context/UserContext';

export default function Layout() {
  return (
    <UserProvider>
      <ClubProvider>
        <Slot />
      </ClubProvider>
    </UserProvider>
  );
}
