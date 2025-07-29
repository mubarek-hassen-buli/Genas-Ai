import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronDown, ChevronRight, Share2, Edit, Bookmark } from 'lucide-react-native';
import Button from '@/components/Button';
import { useTheme } from '@/components/ThemeProvider';

export default function AssignmentReadyScreen() {
  const { colors } = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>('Introduction');

  const handleBack = () => {
    router.back();
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out my assignment generated with Genas!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    // TODO: Download document
    console.log('Download document');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>Back to home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Your Assignment is Ready!</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Preview and download your document</Text>
      </View>

      <View style={styles.documentContainer}>
        <TouchableOpacity
          style={[styles.sectionHeader, { borderBottomColor: colors.border }]}
          onPress={() => toggleSection('Introduction')}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Introduction</Text>
          {expandedSection === 'Introduction' ? (
            <ChevronDown size={20} color={colors.primary} />
          ) : (
            <ChevronRight size={20} color={colors.text} />
          )}
        </TouchableOpacity>

        {expandedSection === 'Introduction' && (
          <View style={styles.sectionContent}>
            <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
              &lt;h1 "text-white text-[58px] font-semibold leading-[72px] text-center w-[946px] mt-[92px] max-md:max-w-full max-md:text-[28px] max-md:leading-[36px] max-md:mt-10 max-md:px-4 max-md:w-full relative=Unleashing the Future of Technology. &lt;p className="text-[rgba(182,182,182,1)] text-base font-medium text-center mt-[17px] max-md:px-4 max-md:text-sm relative z-10"&gt;
              Turning futuristic concepts into working platforms.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.sectionHeader, { borderBottomColor: colors.border }]}
          onPress={() => toggleSection('Body')}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Body</Text>
          <ChevronRight size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sectionHeader, { borderBottomColor: colors.border }]}
          onPress={() => toggleSection('Conclusion')}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Conclusion</Text>
          <ChevronRight size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sectionHeader, { borderBottomColor: colors.border }]}
          onPress={() => toggleSection('Reference')}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Reference</Text>
          <ChevronRight size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.actionsContainer, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Share2 size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
          <Edit size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
          <Bookmark size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.documentDetails}>
        <Text style={[styles.detailsText, { color: colors.text }]}>Document Details</Text>
        <Text style={[styles.wordCount, { color: colors.textSecondary }]}>2,432 words</Text>
        <Text style={[styles.createdDate, { color: colors.textSecondary }]}>Created: April 15, 2025</Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Download"
          onPress={handleDownload}
          icon
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  documentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContent: {
    paddingVertical: 16,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  documentDetails: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  wordCount: {
    fontSize: 14,
  },
  createdDate: {
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});