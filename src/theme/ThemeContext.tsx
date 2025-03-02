import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { lightBrandColors, darkBrandColors } from "./paperTheme";

// Get the appropriate brand colors based on the color scheme
const getBrandColors = (colorScheme: string | null | undefined) => {
  return colorScheme === "dark" ? darkBrandColors : lightBrandColors;
};

// Create a context for accessing raw brand colors
const BrandColorsContext = createContext(lightBrandColors);

// Custom hook to access brand colors
export const useBrandColors = () => useContext(BrandColorsContext);

// Provider component
export const BrandColorsProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const brandColors = getBrandColors(colorScheme);

  return <BrandColorsContext.Provider value={brandColors}>{children}</BrandColorsContext.Provider>;
};
