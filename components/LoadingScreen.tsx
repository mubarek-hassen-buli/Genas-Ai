import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Generating your assignment..." }: LoadingScreenProps) => {
  const { colors } = useTheme();
  const dot1Opacity = useRef(new Animated.Value(0.4)).current;
  const dot2Opacity = useRef(new Animated.Value(0.7)).current;
  const dot3Opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.4,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.7,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.7,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.4,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.4,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.7,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
      ]).start(() => {
        animateDots();
      });
    };

    animateDots();

    return () => {
      dot1Opacity.stopAnimation();
      dot2Opacity.stopAnimation();
      dot3Opacity.stopAnimation();
    };
  }, [dot1Opacity, dot2Opacity, dot3Opacity]);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.loadingContainer}>
        <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { backgroundColor: colors.primary, opacity: dot1Opacity }]} />
          <Animated.View style={[styles.dot, { backgroundColor: colors.primary, opacity: dot2Opacity }]} />
          <Animated.View style={[styles.dot, { backgroundColor: colors.primary, opacity: dot3Opacity }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});

export default LoadingScreen;