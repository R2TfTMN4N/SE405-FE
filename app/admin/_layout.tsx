import React from 'react';
import { Stack } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AdminLayout() {
  const scheme = useColorScheme() ?? 'light';
  return (
    <ThemedView style={{ flex: 1, backgroundColor: Colors[scheme].background }}>
      <Stack screenOptions={{ headerShown: true }} />
    </ThemedView>
  );
}
