import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import adminService from '@/services/adminService';
import FullButton from '@/components/ui/FullButton';

export default function AdminAddCategory() {
  const scheme = useColorScheme() ?? 'light';
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submit = async () => {
    try {
      await adminService.createCategory({ name, description });
      Alert.alert('Success', 'Category created');
      setName(''); setDescription('');
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: Colors[scheme].background }]}>
      <ThemedText type="title" style={styles.title}>Add Category</ThemedText>
      <View style={styles.field}>
        <ThemedText>Name</ThemedText>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.field}>
        <ThemedText>Description</ThemedText>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      </View>
      <View style={styles.cta}><FullButton text="Create Category" onPress={submit} /></View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 12 },
  field: { marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8 },
  cta: { marginTop: 12 }
});
