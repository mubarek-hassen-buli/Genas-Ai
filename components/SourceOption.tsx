import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Music, Image, MessageCircle, Users, Search, MoreHorizontal, Check } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';

interface SourceOptionProps {
  icon: string;
  title: string;
  onPress: () => void;
  selected?: boolean;
}

const SourceOption = ({ icon, title, onPress, selected = false }: SourceOptionProps) => {
  const { colors } = useTheme();
  
  const renderIcon = () => {
    switch (icon) {
      case 'brand-tiktok':
        return <Music size={24} color={colors.text} />;
      case 'brand-instagram':
        return <Image size={24} color={colors.text} />;
      case 'brand-telegram':
        return <MessageCircle size={24} color={colors.text} />;
      case 'users':
        return <Users size={24} color={colors.text} />;
      case 'brand-google':
        return <Search size={24} color={colors.text} />;
      case 'dots-horizontal':
        return <MoreHorizontal size={24} color={colors.text} />;
      default:
        return <MoreHorizontal size={24} color={colors.text} />;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: colors.cardBackground },
        selected && { borderColor: colors.primary, borderWidth: 2 }
      ]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
        {renderIcon()}
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {selected && (
        <View style={[styles.checkContainer, { backgroundColor: colors.primary }]}>
          <Check size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SourceOption;