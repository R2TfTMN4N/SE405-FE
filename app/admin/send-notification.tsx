import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import adminService from '@/services/adminService';
import FullButton from '@/components/ui/FullButton';

export default function AdminSendNotification() {
  const scheme = useColorScheme() ?? 'light';
  const [userid, setUserid] = useState('');
  const [promotionid, setPromotionid] = useState('');

  const submit = async () => {
    try {
      await adminService.sendPromotionNotification({ userid: Number(userid), promotionid: Number(promotionid) });
      Alert.alert('Success', 'Notification sent');
      setUserid(''); setPromotionid('');
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: Colors[scheme].background }]}>
      <ThemedText type="title" style={styles.title}>Send Promotion Notification</ThemedText>
      <View style={styles.field}>
        <ThemedText>User ID</ThemedText>
        <TextInput style={styles.input} value={userid} onChangeText={setUserid} keyboardType="numeric" />
      </View>
      <View style={styles.field}>
        <ThemedText>Promotion ID</ThemedText>
        <TextInput style={styles.input} value={promotionid} onChangeText={setPromotionid} keyboardType="numeric" />
      </View>
      <View style={styles.cta}><FullButton text="Send Notification" onPress={submit} /></View>
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
