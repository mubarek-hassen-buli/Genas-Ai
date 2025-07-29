import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const CheckboxItem = ({ label, checked, onToggle }: CheckboxItemProps) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      <View 
        style={[
          styles.checkbox, 
          { borderColor: colors.primary },
          checked && { backgroundColor: colors.primary }
        ]}
      >
        {checked && <Check size={16} color="#FFFFFF" />}
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
});

export default CheckboxItem;