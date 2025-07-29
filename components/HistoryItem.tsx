import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Eye } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface HistoryItemProps {
  title: string;
  date: string;
  onView: () => void;
}

const HistoryItem = ({ title, date, onView }: HistoryItemProps) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>Created {date}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={onView}>
        <Eye size={16} color={colors.primary} />
        <Text style={[styles.viewText, { color: colors.primary }]}>View</Text>
      </TouchableOpacity>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  viewText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default HistoryItem;