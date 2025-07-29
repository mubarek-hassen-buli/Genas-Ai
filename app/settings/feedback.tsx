import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Star } from 'lucide-react-native';
import { Stack } from 'expo-router';
import Button from '@/components/Button';
import { useTheme } from '@/components/ThemeProvider';

export default function FeedbackScreen() {
  const { colors } = useTheme();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const handleBack = () => {
    router.back();
  };

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
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
          title: 'Give Feedback',
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
          <Text style={[styles.title, { color: colors.text }]}>
            How would you rate your experience with Genas?
          </Text>
          
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                style={styles.starButton}
              >
                <Star
                  size={36}
                  color={star <= rating ? colors.primary : colors.border}
                  fill={star <= rating ? colors.primary : 'none'}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={[styles.feedbackLabel, { color: colors.text }]}>
            Tell us what you think
          </Text>
          
          <TextInput
            style={[
              styles.feedbackInput,
              {
                backgroundColor: colors.cardBackground,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Your feedback helps us improve..."
            placeholderTextColor={colors.textTertiary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={feedback}
            onChangeText={setFeedback}
          />
          
          <Button
            title="Submit Feedback"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  starButton: {
    padding: 8,
  },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  feedbackInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 150,
    marginBottom: 32,
  },
  submitButton: {
    marginBottom: 24,
  },
});