import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface FloatingActionButtonProps {
  onPress: () => void;
}

const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    zIndex: 999,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default FloatingActionButton;