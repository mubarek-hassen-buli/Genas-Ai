import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';

interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots = ({ total, current }: ProgressDotsProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: Colors.primary,
  },
});

export default ProgressDots;