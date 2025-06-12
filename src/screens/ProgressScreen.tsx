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
    [today]: {
      marked: true,
      dotColor: '#a855f7',
      selected: true,
      selectedColor: '#1f2937',
      selectedTextColor: '#60a5fa', // manually set
    },

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Progress</Text>

      <View style={styles.calendarWrapper}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            '2025-06-10': {
              marked: true,
              dotColor: '#a855f7',
            },
            [today]: {
              marked: true,
              dotColor: '#a855f7',
              selected: true,
              selectedColor: '#60a5fa',
              selectedTextColor: '#1f2937',
            },
          }}
          hideExtraDays={false}
          disableAllTouchEventsForInactiveDays={false}
          theme={{
            calendarBackground: '#1f2937',
            backgroundColor: '#1f2937',
            todayTextColor: '#60a5fa',
            dayTextColor: '#e5e7eb',
            textDisabledColor: '#6b7280',
            textInactiveColor: '#6b7280',
            monthTextColor: '#f9fafb',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textDayHeaderFontSize: 14,
            textSectionTitleColor: '#9ca3af',
            arrowColor: '#60a5fa',
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
