import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import SourceOption from '@/components/SourceOption';
import ProgressDots from '@/components/ProgressDots';
import { onboardingSources } from '@/constants/mockData';
import { useTheme } from '@/components/ThemeProvider';

export default function SourceScreen() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const { colors, isDark } = useTheme();

  const handleSourceSelect = (id: string) => {
    setSelectedSource(id);
  };

  const handleContinue = () => {
    router.replace('/onboarding/user-type');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>How Did You Find Genas?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Just a quick question to help Genas grow</Text>
        </View>

        <View style={styles.optionsContainer}>
          {onboardingSources.map((source) => (
            <SourceOption
              key={source.id}
              icon={source.icon}
              title={source.name}
              onPress={() => handleSourceSelect(source.id)}
              selected={selectedSource === source.id}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <ProgressDots total={3} current={0} />
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedSource}
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