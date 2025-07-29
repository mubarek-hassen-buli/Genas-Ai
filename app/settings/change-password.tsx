import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Stack } from 'expo-router';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useTheme } from '@/components/ThemeProvider';

export default function ChangePasswordScreen() {
  const { colors } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleBack = () => {
    router.back();
  };

  const validatePassword = (password: string) => {
    // Password should be at least 8 characters with at least one number and one letter
    return password.length >= 8 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
  };

  const handleChangePassword = () => {
    if (!currentPassword) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert('Error', 'Password must be at least 8 characters with at least one number and one letter');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/profile');
    }, 1000);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Change Password',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }} 
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={styles.content}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Create a new password that is at least 8 characters long with at least one number and one letter.
          </Text>
          
          <View style={styles.formContainer}>
            <InputField
              label="Current Password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              isPassword
            />
            
            <InputField
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChangeText={setNewPassword}
              isPassword
            />
            
            <InputField
              label="Confirm New Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
            />
          </View>
          
          <Button
            title="Change Password"
            onPress={handleChangePassword}
            loading={loading}
            disabled={loading}
            style={styles.changeButton}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 32,
  },
  changeButton: {
    marginBottom: 24,
  },
});