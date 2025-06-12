import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface DailyProgressBarProps {
    progress: number; // value from 0 to 100
}

const DailyProgressBar = ({ progress }: DailyProgressBarProps) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Progress</Text>
            <View style={styles.barBackground}>
                <View style={[styles.fillWrapper]}>
                    <LinearGradient
                        colors={['#4b0082', '#60a5fa']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.barFill, { width: `${clampedProgress}%` }]}
                    />
                    <View style={styles.centeredTextWrapper}>
                        <Text style={styles.progressText}>
                            {Math.floor(clampedProgress)}% Complete
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    barBackground: {
        height: 24,
        backgroundColor: '#2d2d2d',
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    fillWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    barFill: {
        position: 'absolute',
        height: '100%',
        borderRadius: 12,
    },
    centeredTextWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    progressText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
});

export default DailyProgressBar;
