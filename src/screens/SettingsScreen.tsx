import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { useQuotePreferences } from '../context/QuotePreferencesContext';

const SettingsScreen = () => {
  const { quoteFilters, setQuoteFilters } = useQuotePreferences();

  const toggleFilter = (type: keyof typeof quoteFilters) => {
    setQuoteFilters(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out. (Placeholder)');
    // TODO: Add actual Firebase auth logout logic
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      {/* Logout */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
    paddingBottom: 40,
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
  logoutButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
