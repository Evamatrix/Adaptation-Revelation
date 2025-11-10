import React from 'react';
import { Slot } from 'expo-router';       // ✅ this import is required
import { UserProvider } from '../src/context/UserContext';  // ✅ your context path

export default function Layout() {
  return (
    <UserProvider>
      <Slot />  {/* ✅ children routes go here */}
    </UserProvider>
  );
}
