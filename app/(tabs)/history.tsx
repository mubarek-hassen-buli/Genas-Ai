import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { router } from 'expo-router';
import { Search, ChevronDown, ChevronUp, Check } from 'lucide-react-native';
import ProjectItem from '@/components/ProjectItem';
import { savedProjects } from '@/constants/mockData';
import { useTheme } from '@/components/ThemeProvider';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Date(newest)');
  const [showSortModal, setShowSortModal] = useState(false);

  const sortOptions = [
    'Date(newest)',
    'Date(oldest)',
    'Name(A-Z)',
    'Name(Z-A)',
  ];

  const handleViewProject = (projectId: string) => {
    router.push('/assignment-ready');
  };

  const handleDownloadProject = (projectId: string) => {
    // TODO: Download project
    console.log('Download project:', projectId);
  };

  const toggleSortModal = () => {
    setShowSortModal(!showSortModal);
  };

  const selectSortOption = (option: string) => {
    setSortOption(option);
    setShowSortModal(false);
  };

  const sortProjects = (projects: typeof savedProjects) => {
    const sorted = [...projects];
    switch (sortOption) {
      case 'Date(newest)':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'Date(oldest)':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'Name(A-Z)':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'Name(Z-A)':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const filteredProjects = sortProjects(
    savedProjects.filter((project) => {
      if (searchQuery) {
        return project.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Saved Project</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
        <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Projects..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <TouchableOpacity style={styles.sortContainer} onPress={toggleSortModal}>
        <Text style={[styles.sortText, { color: colors.textSecondary }]}>Sort by: {sortOption}</Text>
        {showSortModal ? 
          <ChevronUp size={16} color={colors.textSecondary} /> : 
          <ChevronDown size={16} color={colors.textSecondary} />
        }
      </TouchableOpacity>

      <ScrollView
        style={styles.projectsContainer}
        contentContainerStyle={styles.projectsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredProjects.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            date={project.date}
            onView={() => handleViewProject(project.id)}
            onDownload={() => handleDownloadProject(project.id)}
          />
        ))}
      </ScrollView>

      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleSortModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleSortModal}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Sort by</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionItem, { borderBottomColor: colors.border }]}
                onPress={() => selectSortOption(option)}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                {sortOption === option && <Check size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sortText: {
    fontSize: 14,
    marginRight: 4,
  },
  projectsContainer: {
    flex: 1,
  },
  projectsContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});