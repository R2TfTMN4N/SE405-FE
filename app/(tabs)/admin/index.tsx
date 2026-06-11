import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FullButton from "@/components/ui/FullButton";

export default function AdminIndex() {
  const router = useRouter();
  const scheme = useColorScheme() ?? "light";

  const cards = [
    {
      title: "Add Product",
      desc: "Create products with image upload and category selection.",
      icon: "cube-outline" as const,
      route: "/admin/add-product",
      accent: "#2563EB",
    },
    {
      title: "Add Promotion",
      desc: "Build discounts and schedule campaigns.",
      icon: "pricetag-outline" as const,
      route: "/admin/add-promotion",
      accent: "#7C3AED",
    },
    {
      title: "Add Category",
      desc: "Keep your catalog organized and easy to browse.",
      icon: "folder-outline" as const,
      route: "/admin/add-category",
      accent: "#059669",
    },
    {
      title: "Send Notification",
      desc: "Send promotion alerts to selected users.",
      icon: "notifications-outline" as const,
      route: "/admin/send-notification",
      accent: "#F59E0B",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: Colors[scheme].background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={[styles.kicker, { color: Colors[scheme].tint }]}>
          Administration
        </Text>
        <Text style={[styles.title, { color: Colors[scheme].text }]}>
          Admin Center
        </Text>
        <Text
          style={[styles.subtitle, { color: Colors[scheme].secondaryText }]}
        >
          Manage catalog, promotions, categories and notifications from one
          place.
        </Text>
      </View>

      <View style={styles.grid}>
        {cards.map((item) => (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.88}
            onPress={() => router.push(item.route as any)}
            style={[
              styles.card,
              {
                borderColor: Colors[scheme].border,
                backgroundColor: Colors[scheme].background,
              },
            ]}
          >
            <View
              style={[styles.iconWrap, { backgroundColor: item.accent + "18" }]}
            >
              <Ionicons name={item.icon} size={22} color={item.accent} />
            </View>
            <Text style={[styles.cardTitle, { color: Colors[scheme].text }]}>
              {item.title}
            </Text>
            <Text
              style={[styles.cardDesc, { color: Colors[scheme].secondaryText }]}
            >
              {item.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.ctaBox}>
        <FullButton
          text="Open Product Creator"
          onPress={() => router.push("/admin/add-product")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, minHeight: "100%", paddingBottom: 110 },
  heroCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  pillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  pillText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#22C55E",
  },
  title: { fontSize: 30, fontWeight: "800", lineHeight: 36, marginBottom: 6 },
  subtitle: { fontSize: 14, lineHeight: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  cardDesc: { fontSize: 12, lineHeight: 17 },
  ctaBox: { marginTop: 8 },
});
