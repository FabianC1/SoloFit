import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';


const ProgressScreen = () => {
  const today = new Date().toISOString().split('T')[0];

  const [selectedDay, setSelectedDay] = React.useState<string | null>(new Date().toISOString().split('T')[0]);

  type WorkoutEntry = {
    exercises: { name: string; reps: number; unit?: string }[];
    note: string;
  };


  const handleDayPress = (day: any) => {
    setSelectedDay(day.dateString);
  };

  const mockWorkoutLogs: Record<string, WorkoutEntry> = {
    '2025-06-10': {
      exercises: [
        { name: 'Push Ups', reps: 50 },
        { name: 'Squats', reps: 60 },
      ],
      note: 'Felt strong today!',
    },
    '2025-06-11': {
      exercises: [
        { name: 'Plank', reps: 3, unit: 'min' },
        { name: 'Jumping Jacks', reps: 100 },
      ],
      note: 'Quick cardio before breakfast.',
    },
    '2025-06-12': {
      exercises: [
        { name: 'Burpees', reps: 40 },
        { name: 'Lunges', reps: 30 },
        { name: 'Mountain Climbers', reps: 60 },
      ],
      note: 'Full-body HIIT. Drenched!',
    },
    '2025-06-13': {
      exercises: [
        { name: 'Pull Ups', reps: 15 },
        { name: 'Push Ups', reps: 60 },
        { name: 'Sit Ups', reps: 50 },
      ],
      note: 'Upper body focus. Arms shaking.',
    },
    '2025-06-14': {
      exercises: [
        { name: 'Yoga', reps: 45, unit: 'min' },
        { name: 'Breathing Exercises', reps: 10, unit: 'min' },
      ],
      note: 'Recovery day. Felt peaceful.',
    },
  };

  const markedDates = React.useMemo(() => {
    const marks: Record<string, any> = {};

    Object.keys(mockWorkoutLogs).forEach((date) => {
      marks[date] = {
        marked: true,
        dotColor: '#a855f7',
      };
    });

    if (selectedDay) {
      marks[selectedDay] = {
        ...(marks[selectedDay] || { marked: true, dotColor: '#a855f7' }),
        selected: true,
        selectedColor: '#60a5fa',
        selectedTextColor: '#1f2937',
      };
    } else if (today in marks) {
      marks[today] = {
        ...marks[today],
        selected: true,
        selectedColor: '#1f2937',
        selectedTextColor: '#60a5fa',
      };
    }

    return marks;
  }, [mockWorkoutLogs, selectedDay]);





  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Progress</Text>

      <View style={styles.calendarWrapper}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}

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
        {selectedDay && mockWorkoutLogs[selectedDay] ? (
          <>
            <Text style={styles.summaryTitle}>Workout Summary</Text>
            {mockWorkoutLogs[selectedDay].exercises.map((exercise: { name: string; reps: number; unit?: string }, index: number) => (
              <Text key={index} style={styles.summaryItem}>
                • {exercise.name}: {exercise.reps} {exercise.unit || 'reps'}
              </Text>
            ))}
            <Text style={styles.note}>
              Note: {mockWorkoutLogs[selectedDay].note}
            </Text>
          </>
        ) : selectedDay ? (
          <Text style={styles.summaryTitle}>No workout logged on this day.</Text>
        ) : (
          <Text style={styles.summaryTitle}>Tap a day to view details</Text>
        )}
      </View>


      {/* Last Completed Workout */}
      <View style={styles.lastCompletedCard}>
        <Text style={styles.lastCompletedText}>
          Last completed: June 10
        </Text>
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
  lastCompletedText: {
    color: '#a855f7',
    fontSize: 16,
    fontWeight: '600',
  },
  lastCompletedCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
    marginTop: 16,
  },
  summaryItem: {
    color: '#f9fafb',
    fontSize: 16,
    marginBottom: 4,
  },
  note: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#9ca3af',
  }

});
