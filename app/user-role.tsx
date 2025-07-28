import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const roles = [
  {
    key: 'student',
    label: 'Student',
    desc: 'Manage assignments and coursework',
    icon: 'school-outline',
  },
  {
    key: 'teacher',
    label: 'Teacher',
    desc: 'Create and track assignment',
    icon: 'teach',
  },
  {
    key: 'creator',
    label: 'Content Creator',
    desc: 'Organize creative projects',
    icon: 'vector-arrange-above',
  },
  {
    key: 'researcher',
    label: 'Researcher',
    desc: 'Generate structured summaries, abstracts, and research',
    icon: 'file-document-outline',
  },
];

export default function UserRole() {
  const [selected, setSelected] = useState('student');
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Who Are You?</Text>
      <Text style={styles.subheadline}>Tell us how you'll use Genas</Text>
      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.key}
            style={[styles.roleCard, selected === role.key && styles.selectedCard]}
            onPress={() => setSelected(role.key)}
            activeOpacity={0.8}
          >
            <Icon name={role.icon} size={28} color={selected === role.key ? '#6C3EF5' : '#222'} style={styles.roleIcon} />
            <View>
              <Text style={[styles.roleLabel, selected === role.key && { color: '#6C3EF5' }]}>{role.label}</Text>
              <Text style={styles.roleDesc}>{role.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/discovery-source')}>
        <Text style={styles.buttonText}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  rolesContainer: {
    width: '100%',
    marginBottom: 24,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCard: {
    borderColor: '#6C3EF5',
    backgroundColor: '#F4F0FF',
  },
  roleIcon: {
    marginRight: 18,
  },
  roleLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  roleDesc: {
    fontSize: 13,
    color: '#888',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#6C3EF5',
    width: 20,
  },
  button: {
    backgroundColor: '#6C3EF5',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: width * 0.85,
    alignSelf: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 