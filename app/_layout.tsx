import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// app/_layout.tsx
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import { AuthProvider } from "./auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Agrandir300: require("../assets/fonts/Agrandir-GrandLight.otf"),
    Agrandir900: require("../assets/fonts/Agrandir-GrandHeavy.otf"),
    CourseStructure: require("../assets/fonts/course-structure.ttf"),
    GeneralSans200: require("../assets/fonts/GeneralSans-Variable.ttf"),
    GeneralSans300: require("../assets/fonts/GeneralSans-Variable.ttf"),
    GeneralSans400: require("../assets/fonts/GeneralSans-Variable.ttf"),
    GeneralSans500: require("../assets/fonts/GeneralSans-Variable.ttf"),
    GeneralSans600: require("../assets/fonts/GeneralSans-Variable.ttf"),
    GeneralSans700: require("../assets/fonts/GeneralSans-Variable.ttf"),
    Icon1: require("../assets/fonts/icon1.ttf"),
    Kreadon200: require("../assets/fonts/Kreadon-EL.otf"),
    Kreadon300: require("../assets/fonts/Kreadon-L.otf"),
    Kreadon400: require("../assets/fonts/Kreadon-R.otf"),
    Kreadon500: require("../assets/fonts/Kreadon-M.otf"),
    Kreadon600: require("../assets/fonts/Kreadon-D.otf"),
    Kreadon700: require("../assets/fonts/Kreadon-B.otf"),
    Kreadon800: require("../assets/fonts/Kreadon-EB.otf"),
    Lato400: require("../assets/fonts/Lato-Regular.ttf"),
    Montserrat400: require("../assets/fonts/Montserrat-Regular.ttf"),
    Mukta400: require("../assets/fonts/Mukta-Regular.ttf"),
    Nunito400: require("../assets/fonts/Nunito-Regular.ttf"),
    OldEnglishFive: require("../assets/fonts/OldEnglishFive.ttf"),
    Poppins400: require("../assets/fonts/Poppins-Regular.ttf"),
    Rubik400: require("../assets/fonts/Rubik-Regular.ttf"),
    VarelaRound400: require("../assets/fonts/VarelaRound-Regular.ttf"),
    Verdanab700: require("../assets/fonts/verdanab.ttf"),
    WorkSans400: require("../assets/fonts/WorkSans-Regular.ttf"),
    WorkSans500: require("../assets/fonts/WorkSans-Medium.ttf"),
    WorkSans600: require("../assets/fonts/WorkSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  console.log("Hello");
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="homepage" options={{ headerShown: false }} />
            <Stack.Screen name="contacts" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}