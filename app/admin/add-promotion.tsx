import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import adminService from '@/services/adminService';
import FullButton from '@/components/ui/FullButton';

export default function AdminAddPromotion() {
  const scheme = useColorScheme() ?? 'light';
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('0');
  const [value, setValue] = useState('0');
  const [minOrderValue, setMinOrderValue] = useState('0');
  const [maxValue, setMaxValue] = useState('0');
  const [requirePoint, setRequirePoint] = useState('0');
  const [maxUses, setMaxUses] = useState('1');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const submit = async () => {
    try {
      const payload = { code, description, type: Number(type), value: Number(value), min_order_value: Number(minOrderValue || 0), max_value: maxValue ? Number(maxValue) : null, require_point: Number(requirePoint || 0), max_uses: Number(maxUses || 1), start: start || undefined, end: end || undefined, status: 1 };
      await adminService.createPromotion(payload);
      Alert.alert('Success', 'Promotion created');
      setCode(''); setDescription(''); setType('0'); setValue('0'); setMinOrderValue('0'); setMaxValue('0'); setRequirePoint('0'); setMaxUses('1'); setStart(''); setEnd('');
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: Colors[scheme].background }]}>
      <ThemedText type="title" style={styles.title}>Add Promotion</ThemedText>
      <View style={styles.field}>
        <ThemedText>Code</ThemedText>
        <TextInput style={styles.input} value={code} onChangeText={setCode} />
      </View>
      <View style={styles.field}>
        <ThemedText>Description</ThemedText>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      </View>
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <ThemedText>Type (0=percent)</ThemedText>
          <TextInput style={styles.input} value={type} onChangeText={setType} keyboardType="numeric" />
        </View>
        <View style={{ width: 140 }}>
          <ThemedText>Value</ThemedText>
          <TextInput style={styles.input} value={value} onChangeText={setValue} keyboardType="numeric" />
        </View>
      </View>

      <View style={styles.field}>
        <ThemedText>Min Order Value</ThemedText>
        <TextInput style={styles.input} value={minOrderValue} onChangeText={setMinOrderValue} keyboardType="numeric" />
      </View>
      <View style={styles.field}>
        <ThemedText>Max Value</ThemedText>
        <TextInput style={styles.input} value={maxValue} onChangeText={setMaxValue} keyboardType="numeric" />
      </View>
      <View style={styles.cta}><FullButton text="Create Promotion" onPress={submit} /></View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 12 },
  field: { marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cta: { marginTop: 12 }
});
