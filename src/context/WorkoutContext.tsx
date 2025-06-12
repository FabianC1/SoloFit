import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Workout = {
  id: string;
  name: string;
  target: number;
  completed: number;
};

type WorkoutContextType = {
  workouts: Workout[];
  addWorkout: (workout: Omit<Workout, 'id' | 'completed'>) => void;
  removeWorkout: (id: string) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addWorkout = (workout: Omit<Workout, 'id' | 'completed'>) => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      completed: 0,
      ...workout,
    };
    setWorkouts(prev => [...prev, newWorkout]);
  };

  const removeWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, removeWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkoutContext must be used within WorkoutProvider");
  return ctx;
};
