import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import DepthOption from '@/components/DepthOption';
import CheckboxItem from '@/components/CheckboxItem';
import FileFormatOption from '@/components/FileFormatOption';
import { useTheme } from '@/components/ThemeProvider';

export default function GenerateAssignmentScreen() {
  const { colors } = useTheme();
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [depth, setDepth] = useState('Basic');
  const [structure, setStructure] = useState({
    title: true,
    introduction: true,
    body: true,
    conclusion: true,
    references: true,
  });
  const [fileFormat, setFileFormat] = useState('Word');

  const handleBack = () => {
    router.back();
  };

  const handleChooseTemplate = () => {
    router.push('/templates');
  };

  const toggleStructureItem = (item: keyof typeof structure) => {
    setStructure((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Generate assignment</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <InputField
          label="Subject"
          placeholder="Enter the subject"
          value={subject}
          onChangeText={setSubject}
        />

        <InputField
          label="Title"
          placeholder="Enter Your Topic"
          value={title}
          onChangeText={setTitle}
        />

        <InputField
          label="Detail"
          placeholder="Enter detail of the questions.."
          value={detail}
          onChangeText={setDetail}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          style={[styles.detailInput, { backgroundColor: colors.cardBackground }]}
        />

        <View style={styles.depthSection}>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Depth</Text>
          <View style={styles.depthOptions}>
            <DepthOption
              title="Basic"
              selected={depth === 'Basic'}
              onPress={() => setDepth('Basic')}
            />
            <DepthOption
              title="Intermediate"
              selected={depth === 'Intermediate'}
              onPress={() => setDepth('Intermediate')}
            />
            <DepthOption
              title="Detailed"
              selected={depth === 'Detailed'}
              onPress={() => setDepth('Detailed')}
            />
          </View>
        </View>

        <View style={styles.structureSection}>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Structure</Text>
          <View style={styles.structureOptions}>
            <CheckboxItem
              label="Title"
              checked={structure.title}
              onToggle={() => toggleStructureItem('title')}
            />
            <CheckboxItem
              label="Introduction"
              checked={structure.introduction}
              onToggle={() => toggleStructureItem('introduction')}
            />
            <CheckboxItem
              label="Body"
              checked={structure.body}
              onToggle={() => toggleStructureItem('body')}
            />
            <CheckboxItem
              label="Conclusion"
              checked={structure.conclusion}
              onToggle={() => toggleStructureItem('conclusion')}
            />
            <CheckboxItem
              label="References"
              checked={structure.references}
              onToggle={() => toggleStructureItem('references')}
            />
          </View>
          <Text style={[styles.structureHint, { color: colors.textTertiary }]}>Select the structure to include</Text>
        </View>

        <View style={styles.fileFormatSection}>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>File Format</Text>
          <View style={styles.fileFormatOptions}>
            <FileFormatOption
              type="Word"
              selected={fileFormat === 'Word'}
              onPress={() => setFileFormat('Word')}
            />
            <FileFormatOption
              type="PPT"
              selected={fileFormat === 'PPT'}
              onPress={() => setFileFormat('PPT')}
            />
            <FileFormatOption
              type="PDF"
              selected={fileFormat === 'PDF'}
              onPress={() => setFileFormat('PDF')}
            />
          </View>
          <Text style={[styles.fileFormatHint, { color: colors.textTertiary }]}>Choose your preferred output format</Text>
        </View>

        <Button
          title="Choose template >"
          onPress={handleChooseTemplate}
          style={styles.chooseTemplateButton}
        />

        <View style={styles.spacer} />
      </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  detailInput: {
    height: 120,
    paddingTop: 12,
  },
  depthSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  depthOptions: {
    flexDirection: 'row',
  },
  structureSection: {
    marginBottom: 24,
  },
  structureOptions: {
    marginBottom: 8,
  },
  structureHint: {
    fontSize: 14,
  },
  fileFormatSection: {
    marginBottom: 32,
  },
  fileFormatOptions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  fileFormatHint: {
    fontSize: 14,
  },
  chooseTemplateButton: {
    marginBottom: 24,
  },
  spacer: {
    height: 100,
  },
});