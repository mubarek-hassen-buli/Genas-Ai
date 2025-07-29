import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, Bell } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface HeaderButtonProps {
  icon: 'back' | 'notification';
  onPress: () => void;
}

const HeaderButton = ({ icon, onPress }: HeaderButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {icon === 'back' ? (
        <ChevronLeft size={24} color={Colors.text} />
      ) : (
        <Bell size={24} color={Colors.text} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderButton;