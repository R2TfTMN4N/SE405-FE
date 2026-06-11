import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function AccessoriesIcon({
  width = 24,
  height = 24,
  color,
}: Props) {
  const scheme = useColorScheme() ?? "light";
  const fillColor = color ?? (scheme === "dark" ? "#ffffff" : "#000000");

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2h4l1 4h-6l1-4z M12 6C9.2 6 7 8.2 7 11s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z M10 22h4l1-6h-6l1 6z"
        fill={fillColor}
      />
    </Svg>
  );
}
