import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Eye, Download } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface ProjectItemProps {
  title: string;
  date: string;
  onView: () => void;
  onDownload: () => void;
}

const ProjectItem = ({ title, date, onView, onDownload }: ProjectItemProps) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>Created {date}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onView}>
          <Eye size={16} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDownload}>
          <Download size={16} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 4,
  },
});

export default ProjectItem;