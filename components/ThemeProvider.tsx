import React, { createContext, useContext, ReactNode } from 'react';
import { useThemeStore, getThemeColors } from '@/hooks/useThemeStore';

type ThemeContextType = {
  colors: ReturnType<typeof getThemeColors>;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  colors: getThemeColors(false),
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { darkMode, colors } = useThemeStore();
  
  // Use app setting for dark mode
  const isDark = darkMode;

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};