import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ChevronLeft } from 'lucide-react-native';
import Button from '@/components/Button';
import TemplateCard from '@/components/TemplateCard';
import { templates } from '@/constants/mockData';
import { useTheme } from '@/components/ThemeProvider';

export default function TemplatesScreen() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tabs = ['All', 'Modern', 'Academic', 'Minimal'];

  const handleBack = () => {
    router.back();
  };

  const handleTemplatePress = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerateNow = () => {
    if (selectedTemplate) {
      setLoading(true);
      // Navigate to loading screen
      router.push('/loading-assignment');
    }
  };

  const filteredTemplates = templates.filter((template) => {
    if (activeTab !== 'All') {
      // This is a mock filter, in a real app you would have a category field
      return template.title.toLowerCase().includes(activeTab.toLowerCase());
    }
    return true;
  }).filter((template) => {
    if (searchQuery) {
      return template.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Templates Library</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Pick a format for your assignment</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
        <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search templates"
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab ? { ...styles.activeTab, backgroundColor: colors.primary } : null
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? '#FFFFFF' : colors.textSecondary }
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.templatesContainer}
        contentContainerStyle={styles.templatesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.templateGrid}>
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              type={template.type}
              image={template.image}
              selected={selectedTemplate === template.id}
              onPress={() => handleTemplatePress(template.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <Button
          title="Generate now >"
          onPress={handleGenerateNow}
          disabled={!selectedTemplate}
          loading={loading}
          style={styles.generateButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    marginLeft: 4,
  },
  titleContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    fontWeight: '600',
  },
  tabText: {
    fontSize: 14,
  },
  templatesContainer: {
    flex: 1,
  },
  templatesContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  generateButton: {
    backgroundColor: '#6C3CE9',
  }
});