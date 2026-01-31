import { AyurvedaColors, BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AppointmentConfirmationScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const currentColors = Colors[theme];

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            <View style={[styles.card, { backgroundColor: currentColors.card }]}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={80} color={AyurvedaColors.primary} />
                </View>

                <Text style={[styles.title, { color: currentColors.text }]}>Request Sent!</Text>

                <Text style={[styles.message, { color: AyurvedaColors.textSecondary }]}>
                    Your consultation request has been successfully submitted. We will notify you once the practitioner confirms.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/patient/dashboard' as any)}
                >
                    <Text style={styles.buttonText}>View Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    card: {
        width: '100%',
        padding: Spacing.xl,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    iconContainer: {
        marginBottom: Spacing.lg,
    },
    title: {
        ...Typography.h2,
        fontWeight: '600',
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    message: {
        ...Typography.body1,
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 24,
    },
    button: {
        backgroundColor: AyurvedaColors.primary,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.round,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        ...Typography.body1,
        fontWeight: '600',
    },
});
