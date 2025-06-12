import React, { useRef } from 'react';
import {
  Animated,
  Easing,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useQuotePreferences } from '../context/QuotePreferencesContext';

const SettingsScreen = () => {
  const { quoteFilters, setQuoteFilters } = useQuotePreferences();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleFilter = (type: keyof typeof quoteFilters) => {
    setQuoteFilters(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out. (Placeholder)');
    // TODO: Add actual Firebase logout logic
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start(() => handleLogout());
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Settings</Text>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.option}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={true} disabled />
        </View>
        <Text style={styles.placeholder}>Custom themes coming soon</Text>
      </View>

      {/* Quote Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quote Preferences</Text>
        {Object.entries(quoteFilters).map(([key, value]) => (
          <View key={key} style={styles.option}>
            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)} Quotes</Text>
            <Switch
              value={value}
              onValueChange={() => toggleFilter(key as keyof typeof quoteFilters)}
              thumbColor={value ? '#0099ff' : '#4b5563'}
              trackColor={{ false: '#374151', true: '#ffffff' }}
            />
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutButtonWrapper}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={[styles.logoutButton, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.logoutText}>Log Out</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    padding: 20,
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 32,
  },
  section: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#60a5fa',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#e5e7eb',
  },
  placeholder: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: -8,
  },
  logoutButtonWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ef4444',
    backgroundColor: '#1f2937',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
