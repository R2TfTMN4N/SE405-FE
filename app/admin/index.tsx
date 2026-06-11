import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AdminIndex() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={[styles.container, { backgroundColor: Colors[scheme].background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>Admin Dashboard</ThemedText>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/admin/add-product')}>
          <ThemedText type="title" style={styles.cardTitle}>Add Product</ThemedText>
          <ThemedText type="default" style={styles.cardDesc}>Create new products with localized data, price and stock.</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/admin/add-promotion')}>
          <ThemedText type="title" style={styles.cardTitle}>Add Promotion</ThemedText>
          <ThemedText type="default" style={styles.cardDesc}>Create discounts and schedule promotions.</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/admin/add-category')}>
          <ThemedText type="title" style={styles.cardTitle}>Add Category</ThemedText>
          <ThemedText type="default" style={styles.cardDesc}>Manage product categories.</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/admin/send-notification')}>
          <ThemedText type="title" style={styles.cardTitle}>Send Promotion Notification</ThemedText>
          <ThemedText type="default" style={styles.cardDesc}>Send targeted promotion notifications to users.</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 28, marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardDesc: { marginTop: 6, color: '#666' }
});
