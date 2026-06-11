import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Alert, Pressable, ScrollView, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import adminService, { uploadProductImage } from '@/services/adminService';
import { http } from '@/services/http';
import FullButton from '@/components/ui/FullButton';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

export default function AdminAddProduct() {
  const scheme = useColorScheme() ?? 'light';
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesid, setCategoriesid] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await http.get<any[]>('/categories');
        if (!mounted) return;
        setCategories(list || []);
      } catch (e) {}
    })();
    return () => { mounted = false; };
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow photo library access to upload a product image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const submit = async () => {
    try {
      if (!categoriesid) return Alert.alert('Validation', 'Select category');
      if (!brand) return Alert.alert('Validation', 'Enter brand');
      setUploading(true);
      const payload = { categoriesid: Number(categoriesid), name, price: Number(price || 0), description, brand, quantity: Number(quantity || 0), languagecode: 'en' };
      const created = await adminService.createProduct(payload);
      if (created?.id && imageUri) {
        await uploadProductImage(created.id, imageUri);
      }
      Alert.alert('Success', 'Product created');
      setName(''); setPrice(''); setDescription(''); setBrand(''); setQuantity('0'); setCategoriesid('');
      setImageUri(null);
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.page}>
      <ThemedView style={[styles.container, { backgroundColor: Colors[scheme].background }]}>
        <ThemedView style={styles.hero}>
          <ThemedText type="title" style={styles.title}>Add Product</ThemedText>
          <ThemedText style={styles.subtitle}>Create a product, then attach a Cloudinary image in one flow.</ThemedText>
        </ThemedView>

        <Pressable style={styles.imageCard} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} contentFit="cover" />
          ) : (
            <View style={styles.placeholderBox}>
              <ThemedText style={styles.placeholderTitle}>Tap to choose an image</ThemedText>
              <ThemedText style={styles.placeholderSubtitle}>JPG or PNG, uploaded after product creation</ThemedText>
            </View>
          )}
        </Pressable>
        <View style={styles.ctaRow}>
          <FullButton text={imageUri ? 'Change Image' : 'Choose Image'} onPress={pickImage} />
        </View>

        <View style={styles.field}>
          <ThemedText>Name</ThemedText>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.field}>
          <ThemedText>Brand</ThemedText>
          <TextInput style={styles.input} value={brand} onChangeText={setBrand} />
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <ThemedText>Price</ThemedText>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
          </View>
          <View style={{ width: 120 }}>
            <ThemedText>Qty</ThemedText>
            <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
          </View>
        </View>
        <View style={styles.field}>
          <ThemedText>Category ID</ThemedText>
          <TextInput style={styles.input} value={categoriesid} onChangeText={setCategoriesid} placeholder="Enter category id" />
        </View>
        <View style={styles.categoryWrap}>
          <ThemedText style={styles.sectionTitle}>Quick pick categories</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setCategoriesid(String(item.id))}
                style={[
                  styles.categoryChip,
                  categoriesid === String(item.id) && styles.categoryChipActive,
                ]}
              >
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.field}>
          <ThemedText>Description</ThemedText>
          <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline />
        </View>
        <View style={styles.cta}>
          <FullButton text={uploading ? 'Creating...' : 'Create Product'} onPress={submit} />
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, paddingBottom: 24 },
  container: {
    flex: 1,
    borderRadius: 28,
    padding: 16,
    overflow: 'hidden',
  },
  hero: {
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { marginTop: 8, fontSize: 14, lineHeight: 20, color: '#6B7280' },
  imageCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    minHeight: 220,
    marginBottom: 14,
  },
  previewImage: { width: '100%', height: 220 },
  placeholderBox: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  placeholderTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  placeholderSubtitle: { marginTop: 8, fontSize: 13, color: '#6B7280', textAlign: 'center' },
  ctaRow: { marginBottom: 12 },
  field: { marginBottom: 12 },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  categoryWrap: { marginBottom: 12 },
  sectionTitle: { marginBottom: 10, fontWeight: '700' },
  categoryRow: { paddingRight: 4 },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },
  categoryChipActive: {
    borderColor: '#111827',
    backgroundColor: '#111827',
  },
  categoryText: { color: '#111827', fontWeight: '600' },
  textArea: { minHeight: 110, textAlignVertical: 'top' },
  cta: { marginTop: 4 },
});
