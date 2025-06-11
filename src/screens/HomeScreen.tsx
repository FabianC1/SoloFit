import React, { useMemo, useState, useCallback, } from 'react';
import { useQuotePreferences } from '../context/QuotePreferencesContext';
import { quotes } from '../data/quotes';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
} from 'react-native';

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [quoteSeed, setQuoteSeed] = useState(0);
    const { quoteFilters } = useQuotePreferences();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setQuoteSeed(prev => prev + 1); // triggers quote re-pick
            setRefreshing(false);
        }, 500);
    }, []);

    const filteredQuotes = useMemo(() => {
        return quotes.filter(q =>
            quoteFilters[q.category as keyof typeof quoteFilters]
        );
    }, [quoteFilters]);

    const randomQuote = useMemo(() => {
        const list = filteredQuotes.length > 0 ? filteredQuotes : quotes;
        const index = Math.floor(Math.random() * list.length);
        return list[index];
    }, [filteredQuotes, quoteSeed]);


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Text style={styles.heading}>Welcome back, User.</Text>
                    {/* App Slogan */}
                    <Text style={styles.slogan}>“From E-Class to S-Class.”</Text>

                    {/* Quote of the Day */}
                    <View style={styles.quoteBox}>
                        <Text style={styles.quote}>"{randomQuote.text}"</Text>
                        <Text style={styles.author}>— {randomQuote.author}</Text>
                    </View>


                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Today's Workout</Text>
                        <Text style={styles.cardItem}>• 100 Pushups</Text>
                        <Text style={styles.cardItem}>• 100 Situps</Text>
                        <Text style={styles.cardItem}>• 100 Squats</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Progress</Text>
                        <Text style={styles.placeholder}>[Graph coming soon]</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827', // charcoal black
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f9fafb', // light text
        marginBottom: 16,
    },

    // App slogan
    slogan: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#60a5fa',
        marginBottom: 12,
    },

    // Quote of the day
    quoteBox: {
        marginBottom: 30,
    },
    quote: {
        fontSize: 16,
        color: '#e5e7eb',
        marginBottom: 4,
    },
    author: {
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'right',
    },

    // Workout and progress cards
    card: {
        backgroundColor: '#1f2937', // dark gray
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#facc15', // yellow accent
        marginBottom: 10,
    },
    cardItem: {
        fontSize: 16,
        color: '#e5e7eb',
        marginBottom: 4,
    },
    placeholder: {
        fontSize: 14,
        color: '#9ca3af',
    },
});
