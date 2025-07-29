import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Colors from '@/constants/colors';
import { useTheme } from '@/components/ThemeProvider';

interface TemplateCardProps {
  title: string;
  type: string;
  image: string;
  onPress: () => void;
  selected?: boolean;
}

const TemplateCard = ({ title, type, image, onPress, selected = false }: TemplateCardProps) => {
  const { colors, isDark } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.cardBackground }]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.typeTag}>
        <Text style={styles.typeText}>{type}</Text>
      </View>
      
      {/* Radio button */}
      <View style={[styles.radioContainer, selected && { borderColor: colors.primary }]}>
        {selected && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
      </View>
      
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 8,
  },
  typeTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  radioContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  }
});

export default TemplateCard;