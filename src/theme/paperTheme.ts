import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { useColorScheme } from "react-native";

// Light Theme Colors
const lightBrandColors = {
  // Primary Colors
  primary: {
    main: "#2962FF", // Electric Blue
    light: "#5B83FF", // Lighter variant
    dark: "#0039CB", // Darker variant
    text: "#FFFFFF", // Text on primary
  },

  // Secondary Colors
  secondary: {
    main: "#CFD8DC", // Cool Gray
    dark: "#A7B7C0", // Darker variant for borders
    text: "#616161", // Medium Gray for descriptions
    muted: "#9E9E9E", // Less important text
  },

  // Accent Colors
  accent: {
    main: "#8BC34A", // Lime Green
    light: "#AED581", // Lighter variant
    dark: "#689F38", // Darker variant
    text: "#FFFFFF", // Text on accent
  },

  // Text Colors
  text: {
    primary: "#212121", // Dark Gray for high readability
    secondary: "#616161", // Medium Gray for descriptions
  },

  // Background
  background: {
    main: "#F5F5F5", // Soft White
  },

  // Feedback Colors
  feedback: {
    success: "#28A745",
    warning: "#FFC107",
    error: "#DC3545",
    info: "#17A2B8",
  },
};

// Dark Theme Colors
const darkBrandColors = {
  // Primary Colors
  primary: {
    main: "#448AFF", // Neon Blue
    light: "#83B9FF", // Lighter variant
    dark: "#005ECB", // Darker variant
    text: "#FFFFFF", // Text on primary
  },

  // Secondary Colors
  secondary: {
    main: "#2C2C2C", // Dark Gray
    dark: "#212121", // Darker variant for borders
    text: "#B0BEC5", // Gray for less important text
    muted: "#78909C", // Muted text
  },

  // Accent Colors
  accent: {
    main: "#76FF03", // Bright Lime
    light: "#B0FF57", // Lighter variant
    dark: "#32CB00", // Darker variant
    text: "#000000", // Text on accent (black for readability)
  },

  // Text Colors
  text: {
    primary: "#E0E0E0", // Soft White for high contrast
    secondary: "#B0BEC5", // Gray for less important text
  },

  // Background
  background: {
    main: "#121212", // Charcoal Black
  },

  // Feedback Colors
  feedback: {
    success: "#00E676",
    warning: "#FFAB00",
    error: "#FF5252",
    info: "#00B0FF",
  },
};

// Create light theme
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: lightBrandColors.primary.main,
    primaryContainer: lightBrandColors.primary.light,
    onPrimary: lightBrandColors.primary.text,
    secondary: lightBrandColors.accent.main,
    secondaryContainer: lightBrandColors.accent.light,
    onSecondary: lightBrandColors.accent.text,
    tertiary: lightBrandColors.secondary.main,
    tertiaryContainer: lightBrandColors.secondary.dark,
    onTertiary: lightBrandColors.secondary.text,
    error: lightBrandColors.feedback.error,
    background: lightBrandColors.background.main,
    surface: "#FFFFFF",
    onSurface: lightBrandColors.text.primary,
    surfaceVariant: lightBrandColors.secondary.main,
    outline: lightBrandColors.secondary.muted,
  },
};

// Create dark theme
const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkBrandColors.primary.main,
    primaryContainer: darkBrandColors.primary.light,
    onPrimary: darkBrandColors.primary.text,
    secondary: darkBrandColors.accent.main,
    secondaryContainer: darkBrandColors.accent.light,
    onSecondary: darkBrandColors.accent.text,
    tertiary: darkBrandColors.secondary.main,
    tertiaryContainer: darkBrandColors.secondary.dark,
    onTertiary: darkBrandColors.text.secondary,
    error: darkBrandColors.feedback.error,
    background: darkBrandColors.background.main,
    surface: "#1E1E1E",
    onSurface: darkBrandColors.text.primary,
    surfaceVariant: darkBrandColors.secondary.main,
    outline: darkBrandColors.secondary.muted,
  },
};

// Export function to get the appropriate theme based on color scheme
export const getTheme = (colorScheme: string) => {
  return colorScheme === "dark" ? darkTheme : lightTheme;
};

// Export the brand colors for both themes
export { lightBrandColors, darkBrandColors };

// Default export is the light theme
export default lightTheme;
