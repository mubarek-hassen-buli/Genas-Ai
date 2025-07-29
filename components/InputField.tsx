import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

const InputField = ({ label, error, isPassword = false, ...props }: InputFieldProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const { colors } = useTheme();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View 
        style={[
          styles.inputContainer, 
          { 
            borderColor: error ? colors.error : colors.border,
            backgroundColor: colors.cardBackground 
          }
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
            {secureTextEntry ? (
              <Eye size={20} color={colors.textSecondary} />
            ) : (
              <EyeOff size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  eyeIcon: {
    padding: 10,
  },
});

export default InputField;