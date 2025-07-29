import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

export const unstable_settings = {
  initialRouteName: "splash",
};

// Create a client
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    FontAwesome: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { colors, isDark } = useTheme();
  
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="splash" options={{ animation: 'none' }} />
            <Stack.Screen name="onboarding" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="auth" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
            <Stack.Screen name="generate-assignment" options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="assignment-ready" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="templates" options={{ animation: 'slide_from_right' }} />
          </Stack>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
}