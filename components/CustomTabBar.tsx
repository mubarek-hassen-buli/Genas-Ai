import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, FileText, Clock, User } from 'lucide-react-native';
import FloatingActionButton from './FloatingActionButton';
import { useTheme } from '@/components/ThemeProvider';
import { router } from 'expo-router';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  
  const handleFabPress = () => {
    router.push('/generate-assignment');
  };

  return (
    <View style={styles.container}>
      <FloatingActionButton onPress={handleFabPress} />
      <View style={[styles.tabBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let icon;
          switch (route.name) {
            case 'index':
              icon = <Home size={20} color={isFocused ? colors.primary : colors.textTertiary} />;
              break;
            case 'template':
              icon = <FileText size={20} color={isFocused ? colors.primary : colors.textTertiary} />;
              break;
            case 'history':
              icon = <Clock size={20} color={isFocused ? colors.primary : colors.textTertiary} />;
              break;
            case 'profile':
              icon = <User size={20} color={isFocused ? colors.primary : colors.textTertiary} />;
              break;
            default:
              icon = <Home size={20} color={isFocused ? colors.primary : colors.textTertiary} />;
          }

          // Adjust positioning for better spacing around FAB
          const isTemplate = route.name === 'template';
          const isHistory = route.name === 'history';
          
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[
                styles.tabItem,
                isTemplate && styles.templateTab,
                isHistory && styles.historyTab
              ]}
            >
              {icon}
              <Text 
                style={[
                  styles.tabLabel, 
                  { color: isFocused ? colors.primary : colors.textTertiary }
                ]}
              >
                {label.toString()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateTab: {
    marginRight: 30, // Move template tab to the left
  },
  historyTab: {
    marginLeft: 30, // Move history tab to the right
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default CustomTabBar;