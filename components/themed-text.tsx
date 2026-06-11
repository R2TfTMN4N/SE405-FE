import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

const Fonts = {
  heading: "Poppins_600SemiBold",
  headingBold: "Poppins_700Bold",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodyBold: "Inter_600SemiBold",
} as const;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "caption";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color, fontFamily: Fonts?.body },
        type === "default" ? styles.default : undefined,
        type === "title" ? [styles.title, { fontFamily: Fonts?.heading }] : undefined,
        type === "defaultSemiBold" ? [styles.defaultSemiBold, { fontFamily: Fonts?.heading }] : undefined,
        type === "subtitle" ? [styles.subtitle, { fontFamily: Fonts?.heading }] : undefined,
        type === "link" ? styles.link : undefined,
        type === "caption" ? styles.caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  defaultSemiBold: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Fonts.bodyBold,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.headingBold,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.heading,
    letterSpacing: -0.2,
  },
  link: {
    lineHeight: 24,
    fontSize: 15,
    color: "#2563EB",
    fontFamily: Fonts.bodyBold,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    opacity: 0.8,
  }
});

