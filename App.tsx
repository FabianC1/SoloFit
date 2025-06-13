// Core & React
import React, { useEffect } from 'react';
import { View, Dimensions, Platform, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const RootStack = createNativeStackNavigator();

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as NavigationBar from 'expo-navigation-bar';

// UI & Icons
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Context Providers
import { AuthProvider } from './src/context/AuthContext';
import { WorkoutProvider } from './src/context/WorkoutContext';
import { QuotePreferencesProvider } from './src/context/QuotePreferencesContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Auth Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


const { height } = Dimensions.get('window');
const isLargeScreen = height > 800;


const Tab = createBottomTabNavigator();
export default function App() {
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  const MainTabs = () => (
    <>
      <LinearGradient
        colors={['#60a5fa', '#6900b4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 10,
        }}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(17, 24, 39, 0.829)',
            borderTopWidth: 0,
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
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === 'Home') {
              return (
                <Image
                  source={require('./assets/homeicon.png')}
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#60a5fa' : '#c7c7c7',
                  }}
                  resizeMode="contain"
                />
              );
            }

            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Workouts') iconName = 'barbell-outline';
            else if (route.name === 'Progress') iconName = 'trending-up';
            else if (route.name === 'Settings') iconName = 'settings-outline';
            else if (route.name === 'Profile') iconName = 'person-circle-outline';
            else iconName = 'ellipse';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workouts" component={WorkoutScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );


  return (
    <AuthProvider>
      <WorkoutProvider>
        <QuotePreferencesProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar style="light" />
              <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="Main" component={MainTabs} />
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="Register" component={RegisterScreen} />
              </RootStack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </QuotePreferencesProvider>
      </WorkoutProvider>
    </AuthProvider>
  );

}
