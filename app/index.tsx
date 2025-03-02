import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text, Divider, FAB } from "react-native-paper";
import { useAppTheme } from "../src/theme/useAppTheme";

export default function HomeScreen() {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      {/* Primary color usage - App Header */}
      <Appbar.Header>
        <Appbar.Content title='Home' />
        <Appbar.Action icon='magnify' onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Card with primary branding */}
        <Card style={styles.card}>
          <Card.Title title='Using Your Theme' />
          <Card.Content>
            <Text variant='bodyMedium'>
              This example shows how to use your color hierarchy with React Native Paper.
            </Text>

            {/* Primary button */}
            <Button mode='contained' style={styles.button} onPress={() => {}}>
              Primary Button
            </Button>

            {/* Secondary button */}
            <Button mode='outlined' style={styles.button} onPress={() => {}}>
              Secondary Button
            </Button>

            {/* Accent/CTA button */}
            <Button
              mode='contained'
              buttonColor={theme.brandColors.accent.main}
              textColor={theme.brandColors.accent.text}
              style={styles.button}
              onPress={() => {}}
            >
              Call to Action
            </Button>
          </Card.Content>
        </Card>

        {/* Accent color - FAB */}
        <FAB icon='plus' style={[styles.fab, { backgroundColor: theme.brandColors.accent.main }]} onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
