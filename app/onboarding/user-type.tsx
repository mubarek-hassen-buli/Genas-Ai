import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import UserTypeOption from '@/components/UserTypeOption';
import ProgressDots from '@/components/ProgressDots';
import { userTypes } from '@/constants/mockData';
import { useTheme } from '@/components/ThemeProvider';

export default function UserTypeScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { colors, isDark } = useTheme();

  const handleTypeSelect = (id: string) => {
    setSelectedType(id);
  };

  const handleContinue = () => {
    router.replace('/auth/signup');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Who Are You?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Tell us how you'll use Genas</Text>
        </View>

        <View style={styles.optionsContainer}>
          {userTypes.map((type) => (
            <UserTypeOption
              key={type.id}
              icon={type.icon}
              title={type.name}
              description={type.description}
              onPress={() => handleTypeSelect(type.id)}
              selected={selectedType === type.id}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <ProgressDots total={3} current={1} />
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedType}
            icon
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
  },
});