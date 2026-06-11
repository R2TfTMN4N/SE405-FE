import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FC } from "react";
import { Pressable, StyleProp, ViewStyle, Animated } from "react-native";
import { ThemedText } from "../themed-text";

type FullButtonProps = {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
};

const FullButton: FC<FullButtonProps> = ({ onPress, text, style }) => {
  const schemeRaw = useColorScheme();
  const scheme = (schemeRaw ?? "light") as keyof typeof Colors;
  const bgColor = Colors[scheme].tint;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: bgColor,
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: pressed ? 0.12 : 0.08,
          shadowRadius: 12,
          elevation: 6,
          opacity: pressed ? 0.95 : 1,
          transform: [{ scale: pressed ? 0.995 : 1 }],
        },
        style,
      ]}
    >
      <ThemedText style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
        {text}
      </ThemedText>
    </Pressable>
  );
};

export default FullButton;
