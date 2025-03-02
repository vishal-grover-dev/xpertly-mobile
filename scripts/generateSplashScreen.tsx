import React from "react";
import { renderToString } from "react-dom/server";
import { View, StyleSheet, Text } from "react-native";
import fs from "fs";
import Logo from "../src/components/Logo";
import { darkBrandColors } from "../src/theme/paperTheme";

// This is a simplified version - in a real implementation, you'd need to
// convert the React Native components to SVG or HTML for rendering

const SplashScreenTemplate = () => {
  // Use the text.primary color from the dark theme
  const backgroundColor = darkBrandColors.text.primary;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
        <Logo size='large' darkMode={true} />
        <View style={styles.taglineContainer}>
          <Text style={[styles.tagline, { color: "#FFFFFF" }]}>Bridging You to Trusted Professionals</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 80, // This moves the content up
  },
  taglineContainer: {
    marginTop: 20,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "500",
  },
});

// In a real implementation, you'd convert this to an image
const splashScreenHtml = renderToString(<SplashScreenTemplate />);
fs.writeFileSync("./assets/splash-template.html", splashScreenHtml);

console.log("Splash screen template generated!");
