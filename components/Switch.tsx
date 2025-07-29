import React from 'react';
import { StyleSheet, Switch as RNSwitch, View } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Switch = ({ value, onValueChange }: SwitchProps) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <RNSwitch
        trackColor={{ false: '#E0E0E0', true: colors.primaryLight }}
        thumbColor={value ? colors.primary : '#F5F5F5'}
        ios_backgroundColor="#E0E0E0"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
});

export default Switch;