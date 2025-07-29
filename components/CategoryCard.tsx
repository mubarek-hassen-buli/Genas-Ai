import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GraduationCap, FileText, Briefcase } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface CategoryCardProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const CategoryCard = ({ title, icon, color, onPress }: CategoryCardProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'graduation-cap':
        return <GraduationCap size={24} color="#333" />;
      case 'file-text':
        return <FileText size={24} color="#333" />;
      case 'briefcase':
        return <Briefcase size={24} color="#333" />;
      default:
        return <FileText size={24} color="#333" />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
});

export default CategoryCard;