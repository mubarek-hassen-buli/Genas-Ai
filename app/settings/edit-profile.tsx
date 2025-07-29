import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Camera, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useTheme } from '@/components/ThemeProvider';
import { useUserStore } from '@/hooks/useUserStore';

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const { profile, updateProfile } = useUserStore();
  
  const [fullName, setFullName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handlePickImage = async () => {
    try {
      setIsUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = () => {
    Alert.alert(
      'Remove Avatar',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          onPress: () => setAvatar('https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')
        }
      ]
    );
  };

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    setLoading(true);
    
    // Update the user profile in the store
    updateProfile({
      name: fullName,
      email: email,
      avatar: avatar
    });
    
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
          title: 'Edit Profile',
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
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              {isUploading ? (
                <View style={[styles.avatar, { backgroundColor: colors.cardBackground }]}>
                  <ActivityIndicator color={colors.primary} />
                </View>
              ) : (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              )}
              <View style={styles.avatarActions}>
                <TouchableOpacity 
                  style={[styles.avatarActionButton, { backgroundColor: colors.primary }]} 
                  onPress={handlePickImage}
                >
                  <Camera size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.avatarActionButton, { backgroundColor: colors.error }]} 
                  onPress={handleRemoveAvatar}
                >
                  <X size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.avatarHint, { color: colors.textSecondary }]}>
              Tap on the buttons to change or remove your profile picture
            </Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              label="Full Name"
              placeholder="Your full name"
              value={fullName}
              onChangeText={setFullName}
            />
            <InputField
              label="Email"
              placeholder="Your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarActions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
  },
  avatarActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarHint: {
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 32,
  },
  saveButton: {
    marginBottom: 24,
  },
});