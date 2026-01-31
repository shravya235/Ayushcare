import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AyurvedaColors, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_PATIENTS } from '../../../../../constants/mockData';

export default function AddNoteScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [noteText, setNoteText] = useState('');
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleSave = () => {
        if (!noteText.trim()) {
            Alert.alert('Empty Note', 'Please enter some observations before saving.');
            return;
        }

        // TODO(Firebase): Save practitioner note
        const patient = MOCK_PATIENTS.find(p => p.id === id);
        if (patient) {
            // Mock update
            patient.notes.unshift({
                id: Date.now().toString(),
                date: new Date().toLocaleDateString(),
                text: noteText
            });
            // Force update context or handled by re-render on focus? 
            // Since it's mock and local, we navigate back.
        }

        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <Stack.Screen options={{
                title: 'New Clinical Note',
                headerRight: () => (
                    <TouchableOpacity onPress={handleSave}>
                        <ThemedText style={[styles.headerSave, isDark && { color: AyurvedaColors.primaryLight }]}>Save</ThemedText>
                    </TouchableOpacity>
                )
            }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText style={[styles.dateLabel, isDark && { color: AyurvedaColors.textDarkMuted }]}>Date: {new Date().toLocaleDateString()}</ThemedText>

                <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    placeholder="Enter clinical observations, recommendations, or diet alterations..."
                    placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textMuted}
                    multiline
                    textAlignVertical="top"
                    value={noteText}
                    onChangeText={setNoteText}
                    autoFocus
                />

                <View style={styles.helperSection}>
                    <ThemedText type="defaultSemiBold" style={[styles.helperHeader, isDark && { color: AyurvedaColors.textDark }]}>Quick Templates:</ThemedText>
                    <View style={styles.chipContainer}>
                        {['Vata aggravated', 'Diet change advised', 'Follow up in 1 week', 'Sleep improved'].map((chip, i) => (
                            <TouchableOpacity key={i} style={[styles.chip, isDark && styles.chipDark]} onPress={() => setNoteText(prev => prev + (prev ? '\n' : '') + chip)}>
                                <ThemedText style={[styles.chipText, isDark && { color: AyurvedaColors.textDarkMuted }]}>{chip}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EBF4', // Soft lavender to match dashboard
    },
    scrollContent: {
        padding: Spacing.md,
    },
    headerSave: {
        color: '#fff', // Header is dark
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: Platform.OS === 'ios' ? 0 : Spacing.sm,
    },
    dateLabel: {
        color: AyurvedaColors.textSecondary,
        marginBottom: Spacing.md,
        fontSize: 14,
    },
    input: {
        flex: 1,
        minHeight: 200,
        fontSize: 16,
        color: AyurvedaColors.textPrimary,
        lineHeight: 24,
        padding: Spacing.sm,
        backgroundColor: AyurvedaColors.backgroundSage,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.lg,
    },
    inputDark: {
        backgroundColor: AyurvedaColors.surfaceDark,
        color: AyurvedaColors.textDark,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
    },
    helperSection: {
        marginTop: Spacing.md,
    },
    helperHeader: {
        marginBottom: Spacing.sm,
        color: AyurvedaColors.primary,
        fontSize: 14,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    chip: {
        paddingHorizontal: Spacing.md,
        paddingVertical: 8,
        borderRadius: BorderRadius.round,
        backgroundColor: AyurvedaColors.backgroundLightAlt,
        borderWidth: 1,
        borderColor: AyurvedaColors.mutedSage,
    },
    chipDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderColor: 'rgba(255,255,255,0.1)',
    },
    chipText: {
        fontSize: 13,
        color: AyurvedaColors.textSecondary,
    },
});
