import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Onboarding1() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Image source={require('../assets/images/onboarding1-illustration.png')} style={styles.illustration} resizeMode="contain" />
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.headline}>Stuck with last-minute <Text style={styles.highlight}>assignments?</Text></Text>
        <Text style={styles.subheadline}>Not enough time? No idea where to start?{"\n"}You need help?</Text>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding2')}>
        <Text style={styles.buttonText}>See the Solution →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C3EF5',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 24,
  },
  illustration: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 16,
  },
  middleSection: {
    alignItems: 'center',
    width: '100%',
  },
  headline: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  highlight: {
    color: '#6C3EF5',
  },
  subheadline: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#6C3EF5',
    width: 20,
  },
  button: {
    backgroundColor: '#6C3EF5',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: width * 0.85,
    alignSelf: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 