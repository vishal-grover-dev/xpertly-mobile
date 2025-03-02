import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import Logo from "./Logo";
import { useBrandColors } from "@/src/theme/ThemeContext";
import { Text } from "react-native-paper";

const SplashScreen: React.FC = () => {
  const brandColors = useBrandColors();
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
    ]).start();
  }, []);

  // Use the text.primary color from the dark theme for the background
  const backgroundColor = brandColors.text.primary; // Dark Gray from your theme

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
          <Logo size='large' darkMode={true} />
        </Animated.View>
        <Animated.View style={[styles.taglineContainer, { opacity }]}>
          <Text
            style={[
              styles.tagline,
              { color: brandColors.text.primary === backgroundColor ? "#FFFFFF" : brandColors.text.primary },
            ]}
          >
            Bridging You to Trusted Professionals
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 80, // This moves the content up by creating space at the bottom
  },
  taglineContainer: {
    marginTop: 20,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SplashScreen;
