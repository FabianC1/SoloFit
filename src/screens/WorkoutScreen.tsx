import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useWorkoutContext } from '../context/WorkoutContext';

const WorkoutScreen = () => {
  const { workouts, addWorkout, removeWorkout } = useWorkoutContext();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleAdd = () => {
    if (!name || !target) return;

    addWorkout({ name, target: parseInt(target, 10) });
    setName('');
    setTarget('');

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Your Custom Workouts</Text>
          <Text style={styles.subheading}>Set your daily grind goals</Text>

          {/* Add Workout Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add Workout</Text>
            <TextInput
              placeholder="Workout name (e.g. Pushups)"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
              style={styles.input}
            />
            <TextInput
              placeholder="Target reps (e.g. 100)"
              value={target}
              onChangeText={setTarget}
              keyboardType="numeric"
              placeholderTextColor="#888"
              style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>+ Add Workout</Text>
            </TouchableOpacity>
          </View>

          {/* Workout List */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Plan</Text>
            {workouts.length === 0 ? (
              <Text style={styles.placeholder}>No workouts added yet.</Text>
            ) : (
              <FlatList
                data={workouts}
                keyExtractor={(item) => item.id}
                scrollEnabled={false} // disable internal scroll
                renderItem={({ item }) => (
                  <Animated.View style={{ opacity: fadeAnim }}>
                    <View style={styles.workoutItem}>
                      <Text style={styles.workoutText}>
                        {item.name} — {item.completed}/{item.target}
                      </Text>
                      <TouchableOpacity onPress={() => removeWorkout(item.id)}>
                        <Text style={styles.remove}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                )}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // charcoal
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 4,
    marginTop: 40,
  },
  subheading: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#60a5fa',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#facc15',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#111827',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#60a5fa',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  workoutItem: {
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutText: {
    color: '#fff',
    fontSize: 15,
  },
  remove: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  placeholder: {
    color: '#9ca3af',
    fontSize: 14,
  },
});

export default WorkoutScreen;
