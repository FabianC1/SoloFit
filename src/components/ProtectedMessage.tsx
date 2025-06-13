import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import AnimatedGradientBorder from './AnimatedGradientBorder';

const { width } = Dimensions.get('window');

const ProtectedMessage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.heading}>Access Denied</Text>
        <Text style={styles.description}>
          You need to be logged in to use this screen. Sign in or create an account to unlock your progress.
        </Text>

        <View style={styles.buttonGroup}>
          <Text style={styles.subtext}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <Text style={[styles.subtext, { marginTop: 20 }]}>New here?</Text>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProtectedMessage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 24,
  },
  container: {
    width: width * 0.85,
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 28,
    borderWidth: 2,
    borderColor: '#7c3aed',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  subtext: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#60a5fa',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  registerButton: {
    backgroundColor: '#7c3aed',
  },
  buttonText: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
