import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { QuotePreferencesProvider } from './src/context/QuotePreferencesContext';
import { WorkoutProvider } from './src/context/WorkoutContext';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';

import { Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');
const isLargeScreen = height > 800;


const Tab = createBottomTabNavigator();
export default function App() {
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return (
    <WorkoutProvider>
      <QuotePreferencesProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  borderTopColor: '#1f2937',
                  borderTopWidth: 1,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  overflow: 'hidden',
                  position: 'absolute',
                },
                tabBarItemStyle: {
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 4,
                },
                tabBarIconStyle: {
                  paddingTop: isLargeScreen ? 6 : 2,
                },
                tabBarActiveTintColor: '#60a5fa',
                tabBarInactiveTintColor: '#c7c7c7',
                tabBarIcon: ({ color, size }) => {
                  let iconName: keyof typeof Ionicons.glyphMap;

                  if (route.name === 'Home') iconName = 'home';
                  else if (route.name === 'Workouts') iconName = 'barbell';
                  else if (route.name === 'Settings') iconName = 'settings';
                  else iconName = 'ellipse';

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Workouts" component={WorkoutScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </QuotePreferencesProvider>
    </WorkoutProvider>
  );
}
