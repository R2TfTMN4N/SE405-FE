import { Platform } from "react-native";

// High-End Professional Palette: Royal Blue and Charcoal
const tintColorLight = "#2563EB"; // Royal Blue
const tintColorDark = "#3B82F6"; // Lighter Blue for Dark Mode

export const Colors = {
  light: {
    text: "#0F172A",
    secondaryText: "#475569",
    background: "#F8FAFC",
    backgroundSecondary: "#FFFFFF",
    tint: tintColorLight,
    icon: "#475569",
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorLight,
    border: "#E2E8F0",
    modalBackground: "#FFFFFF",
    modalOverlay: "rgba(15, 23, 42, 0.5)",
    tabBackground: "#FFFFFF",
    tabButtonBG: "#2563EB",
    activeTabText: "#FFFFFF",
    success: "#10B981",
    error: "#EF4444",
    cardSurface: "#FFFFFF",
    primary: "#2563EB",
    surface: "#FFFFFF",
    accent: "#F59E0B",
  },
  dark: {
    text: "#F1F5F9",
    secondaryText: "#94A3B8",
    background: "#020617",
    backgroundSecondary: "#0F172A",
    tint: tintColorDark,
    icon: "#94A3B8",
    tabIconDefault: "#475569",
    tabIconSelected: tintColorDark,
    border: "#1E293B",
    modalBackground: "#0F172A",
    modalOverlay: "rgba(0, 0, 0, 0.7)",
    tabBackground: "#0F172A",
    tabButtonBG: tintColorDark,
    activeTabText: "#F8FAFC",
    success: "#10B981",
    error: "#EF4444",
    cardSurface: "#0F172A",
    primary: "#3B82F6",
    surface: "#0F172A",
    accent: "#FBBF24",
  },
};

export const Fonts = {
  heading: "Poppins_600SemiBold",
  headingBold: "Poppins_700Bold",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodyBold: "Inter_600SemiBold",
};

