import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '@/components/LoadingScreen';
import { useTheme } from '@/components/ThemeProvider';

export default function LoadingAssignmentScreen() {
  const { colors } = useTheme();
  const [message, setMessage] = useState("Analyzing your topic...");

  useEffect(() => {
    // Simulate loading time with changing messages
    const loadingMessages = [
      "Analyzing your topic...",
      "Researching relevant information...",
      "Structuring your assignment...",
      "Finalizing your document...",
    ];
    
    let currentMessage = 0;
    const messageInterval = setInterval(() => {
      currentMessage = (currentMessage + 1) % loadingMessages.length;
      setMessage(loadingMessages[currentMessage]);
    }, 2000);
    
    // Navigate to the assignment-ready page after loading completes
    const timer = setTimeout(() => {
      clearInterval(messageInterval);
      router.replace('/assignment-ready');
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <LoadingScreen message={message} />
    </SafeAreaView>
  );
}