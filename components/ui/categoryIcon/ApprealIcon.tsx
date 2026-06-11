import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function ApparelIcon({ width = 24, height = 24, color }: Props) {
  const scheme = useColorScheme() ?? "light";
  const fillColor = color ?? (scheme === "dark" ? "#ffffff" : "#000000");

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zM8 7v2H6V7h2zm0 6H6v-2h2v2zm10 0h-2v-2h2v2zm0-4h-2V7h2v2z"
        fill={fillColor}
      />
    </Svg>
  );
}
