import React, { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { getTheme, lightBrandColors, darkBrandColors } from "../src/theme/paperTheme";
import { BrandColorsProvider } from "../src/theme/ThemeContext";
import * as SplashScreen from 'expo-splash-screen';
import CustomSplashScreen from '@/src/components/SplashScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme || "light");
  const brandColors = colorScheme === "dark" ? darkBrandColors : lightBrandColors;
  
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setSplashAnimationComplete] = useState(false);

  useEffect(() => {
    // Prepare your app resources here
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        // Artificially delay for a smoother splash experience
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
      // Wait for a short delay to allow our custom splash screen to show
      setTimeout(() => setSplashAnimationComplete(true), 1000);
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  if (!isSplashAnimationComplete) {
    return <CustomSplashScreen />;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <BrandColorsProvider>
        <PaperProvider theme={theme}>
          <Stack />
        </PaperProvider>
      </BrandColorsProvider>
    </SafeAreaProvider>
  );
}
