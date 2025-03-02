import { useTheme as usePaperTheme } from "react-native-paper";
import { useBrandColors } from "./ThemeContext";

// Custom hook that provides access to both Paper theme and raw brand colors
export const useAppTheme = () => {
  const paperTheme = usePaperTheme();
  const brandColors = useBrandColors();

  return {
    ...paperTheme,
    brandColors,
  };
};
