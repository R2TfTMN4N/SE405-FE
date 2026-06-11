import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function ElectronicsIcon({
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
        d="M3 4C1.89543 4 1 4.89543 1 6V16C1 17.1046 1.89543 18 3 18H8V20H5V22H19V20H16V18H21C22.1046 18 23 17.1046 23 16V6C23 4.89543 22.1046 4 21 4H3ZM3 6H21V14H3V6ZM10 18H14V20H10V18ZM5 16V15H19V16H5Z"
        fill={fillColor}
      />
    </Svg>
  );
}
