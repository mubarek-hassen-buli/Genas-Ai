import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Define dark mode colors
const darkColors = {
  primary: '#6C3CE9',
  primaryLight: '#8A65F0',
  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  textTertiary: '#777777',
  border: '#333333',
  error: '#FF5252',
  success: '#4CAF50',
  cardBackground: '#2A2A2A',
  buttonText: '#FFFFFF',
  logoBlue: '#1E90FF',
  logoGreen: '#34A853',
};

// Define light mode colors
const lightColors = {
  primary: '#6C3CE9',
  primaryLight: '#8A65F0',
  background: '#FFFFFF',
  backgroundSecondary: '#F8F8F8',
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#EEEEEE',
  error: '#FF3B30',
  success: '#34C759',
  cardBackground: '#F5F5F5',
  buttonText: '#FFFFFF',
  logoBlue: '#1E90FF',
  logoGreen: '#34A853',
};

export interface ThemeState {
  darkMode: boolean;
  language: string;
  notifications: boolean;
  colors: typeof lightColors;
  toggleDarkMode: () => void;
  setLanguage: (language: string) => void;
  toggleNotifications: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: false,
      language: 'English',
      notifications: true,
      colors: lightColors,
      toggleDarkMode: () => set((state) => ({ 
        darkMode: !state.darkMode,
        colors: !state.darkMode ? darkColors : lightColors
      })),
      setLanguage: (language) => set({ language }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
    }),
    {
      name: 'theme-storage',
      storage: Platform.OS !== 'web' 
        ? createJSONStorage(() => AsyncStorage) 
        : createJSONStorage(() => localStorage),
    }
  )
);

// Helper function to get theme-based colors
export const getThemeColors = (isDarkMode: boolean) => {
  return isDarkMode ? darkColors : lightColors;
};