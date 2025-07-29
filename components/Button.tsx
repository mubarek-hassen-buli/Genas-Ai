import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  icon?: boolean;
}

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon = false,
}: ButtonProps) => {
  const { colors } = useTheme();
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.button, { backgroundColor: colors.primary }, style];
      case 'secondary':
        return [styles.button, { backgroundColor: colors.primaryLight }, style];
      case 'outline':
        return [styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary }, style];
      case 'text':
        return [styles.button, { backgroundColor: 'transparent', paddingHorizontal: 0 }, style];
      default:
        return [styles.button, { backgroundColor: colors.primary }, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.buttonText, { color: colors.buttonText }, textStyle];
      case 'secondary':
        return [styles.buttonText, { color: colors.buttonText }, textStyle];
      case 'outline':
        return [styles.buttonText, { color: colors.primary }, textStyle];
      case 'text':
        return [styles.buttonText, { color: colors.primary }, textStyle];
      default:
        return [styles.buttonText, { color: colors.buttonText }, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), (disabled || loading) && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.buttonText} />
      ) : (
        <>
          <Text style={getTextStyle()}>{title}</Text>
          {icon && <ArrowRight size={18} color={variant === 'outline' ? colors.primary : colors.buttonText} style={styles.icon} />}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Button;