import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import Button from '@/components/Button';
import CategoryCard from '@/components/CategoryCard';
import TemplateCard from '@/components/TemplateCard';
import SectionHeader from '@/components/SectionHeader';
import HistoryItem from '@/components/HistoryItem';
import { categories, templates, savedProjects } from '@/constants/mockData';

export default function HomeScreen() {
  const { colors, isDark } = useTheme();

  const handleGenerateNow = () => {
    router.push('/generate-assignment');
  };

  const handleCategoryPress = (categoryId: string) => {
    // TODO: Filter templates by category
    console.log('Category pressed:', categoryId);
  };

  const handleTemplatePress = (templateId: string) => {
    // TODO: Select template
    console.log('Template pressed:', templateId);
  };

  const handleTemplatePreview = (templateId: string) => {
    // TODO: Preview template
    console.log('Template preview:', templateId);
  };

  const handleViewAllTemplates = () => {
    router.push('/templates');
  };

  const handleViewAllHistory = () => {
    router.push('/(tabs)/history');
  };

  const handleViewProject = (projectId: string) => {
    router.push('/assignment-ready');
  };

  // Get current time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>Hello, Hayatuden!</Text>
        <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>{getGreeting()}</Text>
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://i.imgur.com/JR0JnH9.jpeg' }}
          style={styles.bannerBackground}
          resizeMode="cover"
        />
        <View style={styles.bannerContent}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Ready to Submit Assignments in Seconds</Text>
            <Text style={styles.bannerSubtitle}>Just your topic, your style — AI handles the rest.</Text>
            <Button
              title="Generate now"
              onPress={handleGenerateNow}
              style={styles.generateButton}
              textStyle={styles.generateButtonText}
            />
          </View>
          <Image
            source={{ uri: 'https://i.imgur.com/Yx3oiTG.png' }}
            style={styles.personImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.categorySection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              icon={category.icon}
              color={category.color}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.templateSection}>
        <SectionHeader
          title="Popular Template"
          actionText="View all"
          onAction={handleViewAllTemplates}
        />
        <View style={styles.templateGrid}>
          {templates.slice(0, 2).map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              type={template.type}
              image={template.image}
              onPress={() => handleTemplatePress(template.id)}
              // Remove onPreview prop since it's not defined in TemplateCardProps
            />
          ))}
        </View>
      </View>

      <View style={styles.recentHistorySection}>
        <SectionHeader
          title="Recent History"
          actionText="View all"
          onAction={handleViewAllHistory}
        />
        <View style={styles.historyList}>
          {savedProjects.slice(0, 2).map((project) => (
            <HistoryItem
              key={project.id}
              title={project.title}
              date={project.date}
              onView={() => handleViewProject(project.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
  },
  bannerContainer: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    height: 180,
    backgroundColor: '#1A237E',
  },
  bannerBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  generateButton: {
    height: 36,
    width: 140,
    backgroundColor: '#FFFFFF',
  },
  generateButtonText: {
    color: '#1A237E',
    fontSize: 14,
  },
  personImage: {
    width: 100,
    height: 140,
    alignSelf: 'flex-end',
  },
  categorySection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryList: {
    paddingRight: 24,
  },
  templateSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recentHistorySection: {
    paddingHorizontal: 24,
    marginBottom: 100,
  },
  historyList: {
    marginTop: 8,
  },
});