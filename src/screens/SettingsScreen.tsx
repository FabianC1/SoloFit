import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';

const SettingsScreen = () => {
  const [quoteFilters, setQuoteFilters] = useState({
    solofit: true,
    bible: true,
    anime: true,
    movie: true,
  });

  const toggleFilter = (type: keyof typeof quoteFilters) => {
    setQuoteFilters(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Quote Preferences</Text>

      {Object.entries(quoteFilters).map(([key, value]) => (
        <View key={key} style={styles.option}>
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)} Quotes</Text>
          <Switch
            value={value}
            onValueChange={() => toggleFilter(key as keyof typeof quoteFilters)}
            thumbColor={value ? '#facc15' : '#4b5563'}
            trackColor={{ false: '#374151', true: '#fde68a' }}
          />
        </View>
      ))}
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#e5e7eb',
  },
});
