import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FileText, Presentation, FileType } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface FileFormatOptionProps {
  type: 'Word' | 'PPT' | 'PDF';
  selected: boolean;
  onPress: () => void;
}

const FileFormatOption = ({ type, selected, onPress }: FileFormatOptionProps) => {
  const { colors } = useTheme();
  
  const renderIcon = () => {
    switch (type) {
      case 'Word':
        return <FileText size={24} color={colors.text} />;
      case 'PPT':
        return <Presentation size={24} color={colors.text} />;
      case 'PDF':
        return <FileType size={24} color={colors.text} />;
      default:
        return <FileText size={24} color={colors.text} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <Text style={[styles.title, { color: colors.text }]}>{type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
  },
});

export default FileFormatOption;