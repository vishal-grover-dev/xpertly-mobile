import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useBrandColors } from "@/src/theme/ThemeContext";

type LogoProps = {
  size?: "small" | "medium" | "large";
  color?: string;
  darkMode?: boolean;
  variant?: "default" | "minimal" | "glitch";
};

const Logo: React.FC<LogoProps> = ({ size = "medium", color, darkMode = false, variant = "default" }) => {
  const brandColors = useBrandColors();

  // Default color is white for dark backgrounds, black for light backgrounds
  const defaultColor = darkMode ? "#FFFFFF" : "#000000";
  const textColor = color || defaultColor;

  // Get theme colors for the chromatic effect
  const primaryColor = brandColors.primary.main;

  // Size mapping
  const sizeMap = {
    small: {
      fontSize: 20,
      letterSpacing: 0.5,
      xOffset: 1.2,
      xScale: 1.15,
    },
    medium: {
      fontSize: 32,
      letterSpacing: 1,
      xOffset: 1.8,
      xScale: 1.15,
    },
    large: {
      fontSize: 48,
      letterSpacing: 1.5,
      xOffset: 2.5,
      xScale: 1.15,
    },
  };

  const currentSize = sizeMap[size];

  // Default variant with subtle chromatic aberration
  return (
    <View style={styles.container}>
      {/* Primary color X */}
      <Text
        style={[
          styles.xLetter,
          {
            color: primaryColor,
            fontSize: currentSize.fontSize * currentSize.xScale,
            left: -currentSize.xOffset,
            opacity: 0.6,
          },
        ]}
      >
        X
      </Text>

      {/* Accent color X */}
      <Text
        style={[
          styles.xLetter,
          {
            color: primaryColor,
            fontSize: currentSize.fontSize * currentSize.xScale,
            left: currentSize.xOffset,
            opacity: 0.6,
          },
        ]}
      >
        X
      </Text>

      {/* Base text with enhanced X */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.xLetterBase,
            {
              color: textColor,
              fontSize: currentSize.fontSize * currentSize.xScale,
            },
          ]}
        >
          X
        </Text>
        <Text
          style={[
            styles.restOfText,
            {
              color: textColor,
              fontSize: currentSize.fontSize,
              letterSpacing: currentSize.letterSpacing,
            },
          ]}
        >
          PERTLY
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  xLetter: {
    fontWeight: "900",
    position: "absolute",
    fontFamily: "System",
    zIndex: 1,
    textShadowRadius: 2,
    textShadowColor: "rgba(0,0,0,0.1)",
  },
  xLetterBase: {
    fontWeight: "900",
    fontFamily: "System",
    zIndex: 2,
  },
  restOfText: {
    fontWeight: "bold",
    fontFamily: "System",
    zIndex: 2,
    marginLeft: -2, // Adjust spacing between X and PERTLY
  },
  text: {
    fontWeight: "bold",
    fontFamily: "System",
    zIndex: 2,
  },
});

export default Logo;
