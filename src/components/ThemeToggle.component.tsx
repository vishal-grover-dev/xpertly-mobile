import React from "react";
import { View, StyleSheet } from "react-native";
import { Switch, Text, RadioButton } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";

export const ThemeToggle = () => {
  const { themeMode, isLightTheme, toggleTheme, setThemeMode } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Dark Mode</Text>
        <Switch value={!isLightTheme} onValueChange={toggleTheme} />
      </View>

      <RadioButton.Group
        onValueChange={(value) => setThemeMode(value as "light" | "dark" | "system")}
        value={themeMode}
      >
        <View style={styles.radioOption}>
          <RadioButton value='light' />
          <Text>Light</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton value='dark' />
          <Text>Dark</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton value='system' />
          <Text>System</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
});
