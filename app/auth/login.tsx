import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useTheme } from '@/components/ThemeProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors, isDark } = useTheme();

  const handleLogin = () => {
    setLoading(true);
    // TODO: Call Supabase function here
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  const navigateToSignup = () => {
    router.replace('/auth/signup');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple login
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
          <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Let's get you into Genas</Text>
        </View>

        <View style={styles.formContainer}>
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

          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
            <Text style={[styles.forgotPasswordText, { color: colors.textSecondary }]}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign in"
            onPress={handleLogin}
            style={styles.loginButton}
            loading={loading}
            disabled={!email || !password}
          />

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <Button
            title="Continue with Google"
            onPress={handleGoogleLogin}
            style={styles.googleButton}
            textStyle={[styles.socialButtonText, { color: colors.text }]}
            variant="outline"
          />

          <Button
            title="Continue with Apple"
            onPress={handleAppleLogin}
            style={styles.appleButton}
            textStyle={[styles.socialButtonText, { color: colors.text }]}
            variant="outline"
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>Don't have an account?</Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={[styles.signupText, { color: colors.primary }]}>Signup</Text>
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  forgotPasswordText: {
  },
  loginButton: {
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  signupText: {
    fontWeight: '600',
  },
});