import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, Globe } from 'lucide-react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeStore } from '@/hooks/useThemeStore';

const languages = [
  { id: '1', name: 'English', code: 'en' },
  { id: '2', name: 'Spanish', code: 'es' },
  { id: '3', name: 'French', code: 'fr' },
  { id: '4', name: 'German', code: 'de' },
  { id: '5', name: 'Chinese', code: 'zh' },
  { id: '6', name: 'Japanese', code: 'ja' },
  { id: '7', name: 'Arabic', code: 'ar' },
  { id: '8', name: 'Russian', code: 'ru' },
  { id: '9', name: 'Portuguese', code: 'pt' },
  { id: '10', name: 'Hindi', code: 'hi' },
];

export default function LanguageScreen() {
  const { colors } = useTheme();
  const { language, setLanguage } = useThemeStore();
  
  const handleBack = () => {
    router.back();
  };

  const handleSelectLanguage = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setTimeout(() => {
      router.replace('/(tabs)/profile');
    }, 500);
  };

  const renderLanguageItem = ({ item }: { item: typeof languages[0] }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        { borderBottomColor: colors.border }
      ]}
      onPress={() => handleSelectLanguage(item.name)}
    >
      <View style={styles.languageInfo}>
        <Globe size={20} color={colors.primary} style={styles.languageIcon} />
        <Text style={[styles.languageName, { color: colors.text }]}>{item.name}</Text>
      </View>
      {language === item.name && (
        <Check size={20} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Language',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }} 
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Select your preferred language for the app interface
        </Text>
        
        <FlatList
          data={languages}
          renderItem={renderLanguageItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  listContent: {
    paddingHorizontal: 24,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
  },
});