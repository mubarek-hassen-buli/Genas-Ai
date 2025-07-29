import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface SettingsItemProps {
  icon: ReactNode;
  title: string;
  value?: string;
  onPress: () => void;
  showArrow?: boolean;
  rightComponent?: ReactNode;
}

const SettingsItem = ({
  icon,
  title,
  value,
  onPress,
  showArrow = true,
  rightComponent,
}: SettingsItemProps) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.cardBackground }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>{icon}</View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      <View style={styles.rightContent}>
        {value && <Text style={[styles.value, { color: colors.primary }]}>{value}</Text>}
        {rightComponent}
        {showArrow && <ChevronRight size={20} color={colors.textTertiary} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    marginRight: 4,
  },
});

export default SettingsItem;