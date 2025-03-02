import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getTheme } from "../src/theme/paperTheme";
import { ThemeProvider, useTheme } from "../src/theme/ThemeContext";
import * as SplashScreen from "expo-splash-screen";
import CustomSplashScreen from "@/src/components/Splash.component";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch((error) => {
  console.log("🚀 ~ error:", error);
});

// App content with theme applied
const AppContent = () => {
  const { isLightTheme, brandColors } = useTheme();
  const theme = getTheme(isLightTheme ? "light" : "dark");
  
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setSplashAnimationComplete] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      const timer = setTimeout(async () => {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn("Error hiding splash screen:", e);
        } finally {
          setSplashAnimationComplete(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  if (!isSplashAnimationComplete) {
    return <CustomSplashScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PaperProvider>
  );
};

// Root layout with theme provider
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
