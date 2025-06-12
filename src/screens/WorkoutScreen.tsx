import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Custom Workouts</Text>
      {/* Add form or list later */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WorkoutScreen;
