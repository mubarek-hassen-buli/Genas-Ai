import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { User, Lock, Globe, Moon, Bell, Crown, LogOut } from 'lucide-react-native';
import SettingsItem from '@/components/SettingItem';
import Switch from '@/components/Switch';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeStore } from '@/hooks/useThemeStore';
import { useUserStore } from '@/hooks/useUserStore';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { darkMode, language, notifications, toggleDarkMode, setLanguage, toggleNotifications } = useThemeStore();
  const { profile } = useUserStore();

  const handleEditProfile = () => {
    router.push('/settings/edit-profile');
  };

  const handleChangePassword = () => {
    router.push('/settings/change-password');
  };

  const handleLanguage = () => {
    router.push('/settings/language');
  };

  const handleManageSubscription = () => {
    router.push('/settings/subscription');
  };

  const handleFeedback = () => {
    router.push('/settings/feedback');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => router.replace('/splash') 
        }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>{profile.name}</Text>
          <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{profile.email}</Text>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ACCOUNT</Text>
        <SettingsItem
          icon={<User size={20} color={colors.primary} />}
          title="Edit Profile"
          onPress={handleEditProfile}
        />
        <SettingsItem
          icon={<Lock size={20} color={colors.primary} />}
          title="Change Password"
          onPress={handleChangePassword}
        />
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>PREFERENCES</Text>
        <SettingsItem
          icon={<Globe size={20} color={colors.primary} />}
          title="Language"
          value={language}
          onPress={handleLanguage}
        />
        <SettingsItem
          icon={<Moon size={20} color={colors.primary} />}
          title="Dark Mode"
          showArrow={false}
          rightComponent={<Switch value={darkMode} onValueChange={toggleDarkMode} />}
          onPress={() => toggleDarkMode()}
        />
        <SettingsItem
          icon={<Bell size={20} color={colors.primary} />}
          title="Notifications"
          showArrow={false}
          rightComponent={<Switch value={notifications} onValueChange={toggleNotifications} />}
          onPress={() => toggleNotifications()}
        />
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SUBSCRIPTION</Text>
        <SettingsItem
          icon={<Crown size={20} color={colors.primary} />}
          title="Current Plan"
          value={profile.plan}
          showArrow={false}
          onPress={() => {}}
        />
        <View style={[styles.subscriptionInfo, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.renewalInfo}>
            <Text style={[styles.renewalLabel, { color: colors.textSecondary }]}>Renewal Date</Text>
            <Text style={[styles.renewalDate, { color: colors.text }]}>{profile.renewalDate}</Text>
          </View>
          <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
            <View style={[styles.progressBar, { width: `${profile.progress * 100}%`, backgroundColor: colors.primary }]} />
          </View>
        </View>
        <SettingsItem
          icon={<User size={20} color={colors.primary} />}
          title="Manage Subscription"
          onPress={handleManageSubscription}
        />
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>CUSTOMER SUPPORT</Text>
        <SettingsItem
          icon={<User size={20} color={colors.primary} />}
          title="Give us feedback"
          onPress={handleFeedback}
        />
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: darkMode ? '#3A1A1A' : '#FFEBEE' }]} 
        onPress={handleLogout}
      >
        <LogOut size={20} color={colors.error} style={styles.logoutIcon} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
      </TouchableOpacity>

      <Text style={[styles.versionText, { color: colors.textTertiary }]}>App Version 1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  settingsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  subscriptionInfo: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  renewalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  renewalLabel: {
    fontSize: 14,
  },
  renewalDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 100,
  },
});