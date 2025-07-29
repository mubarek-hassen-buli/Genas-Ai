import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';

export default function SplashScreen() {
  const { colors, isDark } = useTheme();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      // Navigate to onboarding or auth screen
      router.replace('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: isDark ? 'https://i.imgur.com/Yx3oiTG.png' : 'https://i.imgur.com/JkCEfTL.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.loadingContainer}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.loadingText, { color: colors.text }]}>Preparing your Assignment</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
});