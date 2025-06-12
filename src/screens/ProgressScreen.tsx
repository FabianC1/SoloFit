import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const today = new Date().toISOString().split('T')[0];

const ProgressScreen = () => {
  const handleDayPress = (day: any) => {
    console.log('Tapped day', day);
    // TODO: navigate to daily summary screen with day.dateString
  };

  const markedDates = {
    '2025-06-10': { marked: true, dotColor: '#a855f7' },
    [today]: { marked: true, dotColor: '#a855f7', selected: true },
    // Add more marked dates dynamically from your workout logs
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Progress</Text>

      <View style={styles.calendarWrapper}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            todayTextColor: '#60a5fa',
            arrowColor: '#60a5fa',
            monthTextColor: '#f9fafb',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textDayHeaderFontSize: 14,
            backgroundColor: '#1f2937',
            calendarBackground: '#1f2937',
            dayTextColor: '#e5e7eb',
            textSectionTitleColor: '#9ca3af',
            textInactiveColor: '#4b5563',
          }}
        />

      </View>

      {/* Placeholder for Selected Day Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Tap a day to view details</Text>
      </View>
    </ScrollView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 32,
  },
  calendarWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#60a5fa',
    marginBottom: 12,
  },
});
