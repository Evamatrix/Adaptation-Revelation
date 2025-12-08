import { Stack } from "expo-router";
import { ClubProvider } from "../src/context/ClubConText";
import { FriendProvider } from "../src/context/FriendContext";
import { UserProvider } from "../src/context/UserContext";

export default function ChatLayout() {
  return (
    <UserProvider>
      <ClubProvider>
        <FriendProvider>
          <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="[name]" /> */}
          </Stack> 
        </FriendProvider>
      </ClubProvider>
    </UserProvider>
  );
}
