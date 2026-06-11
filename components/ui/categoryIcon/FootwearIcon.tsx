import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function FootwearIcon({
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
        d="M21.6 14.8 C 22.8 13.9 22.8 11.1 21.6 10.2 L 19 6.4 L 19 5 C 19 4.4 18.6 4 18 4 L 6 4 C 5.4 4 5 4.4 5 5 L 5 6.4 L 2.4 10.2 C 1.2 11.1 1.2 13.9 2.4 14.8 C 1.4 15.6 0.8 16.7 0.8 18 C 0.8 20.2 2.6 22 4.8 22 C 6.5 22 8 21 8.8 19.5 H 15.2 C 16 21 17.5 22 19.2 22 C 21.4 22 23.2 20.2 23.2 18 C 23.2 16.7 22.6 15.6 21.6 14.8 Z M 4.8 20.4 C 3.5 20.4 2.4 19.3 2.4 18 C 2.4 16.7 3.5 15.6 4.8 15.6 C 6.1 15.6 7.2 16.7 7.2 18 C 7.2 19.3 6.1 20.4 4.8 20.4 Z M 19.2 20.4 C 17.9 20.4 16.8 19.3 16.8 18 C 16.8 16.7 17.9 15.6 19.2 15.6 C 20.5 15.6 21.6 16.7 21.6 18 C 21.6 19.3 20.5 20.4 19.2 20.4 Z"
        fill={fillColor}
      />
    </Svg>
  );
}
