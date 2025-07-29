import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface DepthOptionProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const DepthOption = ({ title, selected, onPress }: DepthOptionProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.title, selected && styles.selectedTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.cardBackground,
    marginRight: 8,
  },
  selectedContainer: {
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedTitle: {
    color: Colors.buttonText,
    fontWeight: '600',
  },
});

export default DepthOption;