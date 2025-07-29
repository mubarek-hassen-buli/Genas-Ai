import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, Crown } from 'lucide-react-native';
import { Stack } from 'expo-router';
import Button from '@/components/Button';
import { useTheme } from '@/components/ThemeProvider';
import { useUserStore } from '@/hooks/useUserStore';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      'Basic assignment generation',
      '3 assignments per month',
      'Standard templates',
      'Text-only output',
    ],
    current: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99',
    period: 'month',
    features: [
      'Unlimited assignments',
      'All templates',
      'Priority support',
      'Multiple file formats',
      'Advanced customization',
    ],
    current: true,
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$19.99',
    period: 'month',
    features: [
      'Everything in Premium',
      'API access',
      'Team collaboration',
      'Custom branding',
      'Advanced analytics',
      'Dedicated support',
    ],
    current: false,
  },
];

export default function SubscriptionScreen() {
  const { colors } = useTheme();
  const { profile } = useUserStore();
  
  const handleBack = () => {
    router.back();
  };

  const handleUpgrade = (planId: string) => {
    Alert.alert('Upgrade Plan', `You selected the ${planId} plan. This feature will be available soon.`);
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => {
          Alert.alert('Subscription Cancelled', 'Your subscription has been cancelled. You will have access until the end of your billing period.', [
            { text: 'OK', onPress: () => router.replace('/(tabs)/profile') }
          ]);
        }}
      ]
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Manage Subscription',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }} 
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.currentPlanSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Current Plan</Text>
            <View style={[styles.currentPlanCard, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.planHeader}>
                <View>
                  <Text style={[styles.planName, { color: colors.text }]}>{profile.plan}</Text>
                  <Text style={[styles.planPrice, { color: colors.primary }]}>
                    {profile.plan === 'Premium' ? '$9.99/month' : 'Free'}
                  </Text>
                </View>
                <Crown size={24} color={colors.primary} />
              </View>
              
              <View style={[styles.renewalInfo, { borderTopColor: colors.border }]}>
                <Text style={[styles.renewalLabel, { color: colors.textSecondary }]}>Renewal Date</Text>
                <Text style={[styles.renewalDate, { color: colors.text }]}>{profile.renewalDate}</Text>
              </View>
              
              <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${profile.progress * 100}%`, backgroundColor: colors.primary }
                  ]} 
                />
              </View>
              
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {Math.round(profile.progress * 100)}% of subscription period used
              </Text>
            </View>
          </View>
          
          <View style={styles.plansSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Plans</Text>
            
            {plans.map((plan) => (
              <View 
                key={plan.id}
                style={[
                  styles.planCard,
                  { 
                    backgroundColor: colors.cardBackground,
                    borderColor: plan.current ? colors.primary : 'transparent',
                    borderWidth: plan.current ? 2 : 0,
                  }
                ]}
              >
                <View style={styles.planCardHeader}>
                  <View>
                    <Text style={[styles.planCardName, { color: colors.text }]}>{plan.name}</Text>
                    <Text style={[styles.planCardPrice, { color: colors.primary }]}>
                      {plan.price}/{plan.period}
                    </Text>
                  </View>
                  {plan.current && (
                    <View style={[styles.currentBadge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.currentBadgeText}>Current</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Check size={16} color={colors.primary} style={styles.featureIcon} />
                      <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                {!plan.current && (
                  <Button
                    title={`Upgrade to ${plan.name}`}
                    onPress={() => handleUpgrade(plan.id)}
                    style={styles.upgradeButton}
                  />
                )}
              </View>
            ))}
          </View>
          
          {profile.plan !== 'Free' && (
            <TouchableOpacity 
              style={[styles.cancelButton, { borderColor: colors.error }]} 
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: colors.error }]}>
                Cancel Subscription
              </Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  currentPlanSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  currentPlanCard: {
    borderRadius: 12,
    padding: 16,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  renewalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    marginBottom: 16,
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
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
  plansSection: {
    marginBottom: 32,
  },
  planCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planCardName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  planCardPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  currentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
  },
  upgradeButton: {
    marginTop: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
});