import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import CheckboxItem from '@/components/CheckboxItem';
import { useTheme } from '@/components/ThemeProvider';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors, isDark } = useTheme();

  const handleSignup = () => {
    setLoading(true);
    // TODO: Call Supabase function here
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  const navigateToLogin = () => {
    router.replace('/auth/login');
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google signup
  };

  const handleAppleSignup = () => {
    // TODO: Implement Apple signup
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: isDark ? 'https://i.imgur.com/Yx3oiTG.png' : 'https://i.imgur.com/JkCEfTL.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome To Genas</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Let's create account</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Full name"
            placeholder="Your Full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <InputField
            label="Email"
            placeholder="Your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <CheckboxItem
            label="I accept the terms and privacy policy"
            checked={acceptTerms}
            onToggle={() => setAcceptTerms(!acceptTerms)}
          />

          <Button
            title="Sign up"
            onPress={handleSignup}
            style={styles.signupButton}
            loading={loading}
            disabled={!fullName || !email || !password || !acceptTerms}
          />

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <Button
            title="Continue with Google"
            onPress={handleGoogleSignup}
            style={styles.googleButton}
            textStyle={[styles.socialButtonText, { color: colors.text }]}
            variant="outline"
          />

          <Button
            title="Continue with Apple"
            onPress={handleAppleSignup}
            style={styles.appleButton}
            textStyle={[styles.socialButtonText, { color: colors.text }]}
            variant="outline"
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>Already have an account?</Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={[styles.loginText, { color: colors.primary }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 60,
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  signupButton: {
    marginTop: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  googleButton: {
    marginBottom: 12,
  },
  appleButton: {
    marginBottom: 12,
  },
  socialButtonText: {
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    marginRight: 4,
  },
  loginText: {
    fontWeight: '600',
  },
});