import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Logo from "../components/Logo";

const LogoExample = () => {
  const theme = useTheme();
  const isDarkMode = theme.dark;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" }]}>
      {/* Default logo */}
      <View style={styles.logoContainer}>
        <Logo darkMode={isDarkMode} />
      </View>

      {/* Small logo with primary color */}
      <View style={styles.logoContainer}>
        <Logo size='small' color={theme.colors.primary} darkMode={isDarkMode} />
      </View>

      {/* Large logo */}
      <View style={styles.logoContainer}>
        <Logo size='large' darkMode={isDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    marginVertical: 20,
  },
});

export default LogoExample;
