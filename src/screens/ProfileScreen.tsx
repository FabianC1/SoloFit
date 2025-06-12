import React, { useRef } from 'react';
import {
    Animated,
    Alert,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';


const ProfileScreen = () => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleLogout = () => {
        Alert.alert('Logout', 'You have been logged out. (Placeholder)');
        // TODO: Replace with actual Firebase logout logic
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start(() => handleLogout());
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.headerRow}>
                <Text style={[styles.heading]}>Profile</Text>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={styles.avatar}
                    />

                    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
                        <Animated.View style={[styles.editButton, { transform: [{ scale: scaleAnim }] }]}>
                            <Feather name="edit-2" size={16} color="#60a5fa" />
                        </Animated.View>
                    </TouchableWithoutFeedback>

                </View>
            </View>


            <View style={styles.section}>
                <Text style={styles.label}>Username</Text>
                <Text style={styles.value}>Your Name Here</Text>
                {/* TODO: Pull actual username from auth */}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>you@example.com</Text>
            </View>


            <View style={styles.section}>
                <Text style={styles.label}>Subscription</Text>
                <Text style={styles.value}>Free Tier (Upgrade coming soon)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Workout Streak</Text>
                <Text style={styles.value}>5 Days in a Row</Text>
            </View>


            <View style={styles.section}>
                <Text style={styles.label}>Joined</Text>
                <Text style={styles.value}>April 12, 2025</Text>
            </View>


            <View style={styles.logoutButtonWrapper}>
                <TouchableWithoutFeedback
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Animated.View style={[styles.logoutButton, { transform: [{ scale: scaleAnim }] }]}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;

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
        marginTop: 8
    },
    section: {
        backgroundColor: '#1f2937',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#374151',
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#60a5fa',
        marginBottom: 6,
    },
    value: {
        fontSize: 15,
        color: '#e5e7eb',
    },
    logoutButtonWrapper: {
        marginTop: 20,
        alignItems: 'center',
    },
    logoutButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ef4444',
        backgroundColor: '#1f2937',
    },
    logoutText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        backgroundColor: '#374151',
        padding: 4,
        borderRadius: 40,
        top: -6, // lift the avatar slightly
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: '#60a5fa',

    },
    editButton: {
        position: 'absolute',
        bottom: -6,
        right: -6,
        backgroundColor: '#1f2937',
        borderColor: '#60a5fa',
        borderWidth: 1.5,
        borderRadius: 14,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    editText: {
        fontSize: 12,
        color: '#60a5fa',
    },

});
