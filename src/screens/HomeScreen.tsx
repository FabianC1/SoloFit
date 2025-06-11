import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const HomeScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Welcome back, Hunter.</Text>
          <Text style={styles.quote}>“From E-Class to S-Class.”</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Workout</Text>
            <Text style={styles.cardItem}>• 100 Pushups</Text>
            <Text style={styles.cardItem}>• 100 Situps</Text>
            <Text style={styles.cardItem}>• 100 Squats</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Progress</Text>
            <Text style={styles.placeholder}>[Graph coming soon]</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // charcoal black
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 16,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#60a5fa', // sky blue
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1f2937', // darker gray
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#facc15', // yellow accent
    marginBottom: 10,
  },
  cardItem: {
    fontSize: 16,
    color: '#e5e7eb',
    marginBottom: 4,
  },
  placeholder: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
