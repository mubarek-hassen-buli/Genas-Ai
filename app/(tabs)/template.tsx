import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import TemplateCard from '@/components/TemplateCard';
import { templates } from '@/constants/mockData';
import { useTheme } from '@/components/ThemeProvider';

export default function TemplateScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Modern', 'Academic', 'Minimal'];

  const handleTemplatePress = (templateId: string) => {
    // TODO: Select template
    console.log('Template pressed:', templateId);
  };

  const handleTemplatePreview = (templateId: string) => {
    // TODO: Preview template
    console.log('Template preview:', templateId);
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Templates Library</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Pick a formats for your assignment</Text>
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
            <Text
              key={tab}
              style={[
                styles.tab,
                { color: activeTab === tab ? colors.text : colors.textSecondary },
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              {tab}
            </Text>
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
              onPress={() => handleTemplatePress(template.id)}
              onPreview={() => handleTemplatePreview(template.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
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
    fontSize: 14,
  },
  activeTab: {
    fontWeight: '600',
  },
  templatesContainer: {
    flex: 1,
  },
  templatesContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});