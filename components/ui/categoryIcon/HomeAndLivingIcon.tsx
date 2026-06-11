import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function HomeLivingIcon({
  width = 24,
  height = 24,
  color,
}: Props) {
  const scheme = useColorScheme() ?? "light";
  const fillColor = color ?? (scheme === "dark" ? "#ffffff" : "#000000");

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill={fillColor} />
    </Svg>
  );
}
