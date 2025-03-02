import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightBrandColors, darkBrandColors } from "./paperTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Theme options
type ThemeMode = "light" | "dark" | "system";

// Context interface
interface ThemeContextType {
  themeMode: ThemeMode;
  isLightTheme: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  brandColors: typeof lightBrandColors;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  isLightTheme: true,
  toggleTheme: () => {},
  setThemeMode: () => {},
  brandColors: lightBrandColors,
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  // Determine if we should use light theme based on theme mode
  const isLightTheme = themeMode === "system" ? deviceTheme !== "dark" : themeMode === "light";

  // Get the appropriate brand colors
  const brandColors = isLightTheme ? lightBrandColors : darkBrandColors;

  // Load saved theme preference on startup
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themeMode");
        if (savedTheme) {
          setThemeMode(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.log("Error loading theme preference:", error);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    const saveThemePreference = async () => {
      try {
        await AsyncStorage.setItem("themeMode", themeMode);
      } catch (error) {
        console.log("Error saving theme preference:", error);
      }
    };

    saveThemePreference();
  }, [themeMode]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isLightTheme,
        toggleTheme,
        setThemeMode,
        brandColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Get the appropriate brand colors based on the color scheme
const getBrandColors = (colorScheme: string | null | undefined) => {
  return colorScheme === "dark" ? darkBrandColors : lightBrandColors;
};

// Create a context for accessing raw brand colors
const BrandColorsContext = createContext(lightBrandColors);

// Custom hook to access brand colors
export const useBrandColors = () => useContext(BrandColorsContext);

// Add this to your BrandColorsProvider component
interface BrandColorsProviderProps {
  children: React.ReactNode;
  forcedColors?: typeof lightBrandColors;
}

// Provider component
export const BrandColorsProvider: React.FC<BrandColorsProviderProps> = ({ children, forcedColors }) => {
  const colorScheme = useColorScheme();
  const brandColors = forcedColors || (colorScheme === "dark" ? darkBrandColors : lightBrandColors);

  return <BrandColorsContext.Provider value={brandColors}>{children}</BrandColorsContext.Provider>;
};
