import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AyurvedaColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export default function NewPatientScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        dosha: 'Vata', // Default
    });

    const handleRegister = () => {
        if (!form.firstName || !form.lastName || !form.phone) {
            Alert.alert('Missing Fields', 'Please fill in at least Name and Phone Number.');
            return;
        }

        // TODO: Backend integration
        Alert.alert('Success', `Registered new patient: ${form.firstName} ${form.lastName}`, [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    const InputField = ({ label, value, onChange, placeholder, keyboardType = 'default' }: any) => (
        <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, isDark && { color: AyurvedaColors.textDarkMuted }]}>{label}</ThemedText>
            <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textMuted}
                keyboardType={keyboardType}
            />
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Stack.Screen options={{ title: 'Register New Patient' }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedView variant="card" style={[styles.formCard, isDark && styles.cardDark]}>
                    <ThemedText type="subtitle" style={[styles.cardTitle, isDark && { color: AyurvedaColors.textDark }]}>Patient Information</ThemedText>

                    <View style={styles.row}>
                        <View style={styles.halfWidth}>
                            <InputField
                                label="First Name"
                                value={form.firstName}
                                onChange={(t: string) => setForm({ ...form, firstName: t })}
                                placeholder="E.g. Aravind"
                            />
                        </View>
                        <View style={styles.halfWidth}>
                            <InputField
                                label="Last Name"
                                value={form.lastName}
                                onChange={(t: string) => setForm({ ...form, lastName: t })}
                                placeholder="E.g. Kumar"
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.halfWidth}>
                            <InputField
                                label="Age"
                                value={form.age}
                                onChange={(t: string) => setForm({ ...form, age: t })}
                                placeholder="25"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.halfWidth}>
                            <InputField
                                label="Gender"
                                value={form.gender}
                                onChange={(t: string) => setForm({ ...form, gender: t })}
                                placeholder="M / F / Other"
                            />
                        </View>
                    </View>

                    <InputField
                        label="Phone Number"
                        value={form.phone}
                        onChange={(t: string) => setForm({ ...form, phone: t })}
                        placeholder="+91 98765 43210"
                        keyboardType="phone-pad"
                    />

                    <InputField
                        label="Email Address"
                        value={form.email}
                        onChange={(t: string) => setForm({ ...form, email: t })}
                        placeholder="patient@example.com"
                        keyboardType="email-address"
                    />

                    <View style={styles.inputContainer}>
                        <ThemedText style={[styles.label, isDark && { color: AyurvedaColors.textDarkMuted }]}>Dominant Dosha (Optional)</ThemedText>
                        <View style={styles.doshaContainer}>
                            {['Vata', 'Pitta', 'Kapha'].map((d) => (
                                <TouchableOpacity
                                    key={d}
                                    style={[
                                        styles.doshaOption,
                                        form.dosha === d && styles.doshaSelected,
                                        form.dosha === d && { borderColor: d === 'Vata' ? '#A996C9' : d === 'Pitta' ? '#E6B89C' : '#8B9D83' },
                                        isDark && styles.doshaOptionDark
                                    ]}
                                    onPress={() => setForm({ ...form, dosha: d })}
                                >
                                    <View style={[
                                        styles.radioCircle,
                                        form.dosha === d && styles.radioSelected,
                                        form.dosha === d && { backgroundColor: d === 'Vata' ? '#A996C9' : d === 'Pitta' ? '#E6B89C' : '#8B9D83' }
                                    ]} />
                                    <Text style={[styles.doshaText, isDark && { color: AyurvedaColors.textDark }]}>{d}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                </ThemedView>

                <TouchableOpacity
                    style={[styles.submitButton, isDark && { backgroundColor: AyurvedaColors.primaryLight }]}
                    onPress={handleRegister}
                    activeOpacity={0.8}
                >
                    <Ionicons name="person-add" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.submitButtonText}>Register Patient</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EBF4',
    },
    scrollContent: {
        padding: Spacing.lg, // Match dashboard padding
    },
    formCard: {
        padding: 8, // Very tight padding
        borderRadius: BorderRadius.lg, // Match dashboard
        backgroundColor: '#fff',
        marginBottom: Spacing.sm,
        ...Shadows.light.card, // Add card shadow
    },
    cardDark: {
        backgroundColor: AyurvedaColors.surfaceDark,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOpacity: 0.3,
    },
    cardTitle: {
        fontSize: 20, // Reverted to larger size
        marginBottom: 0, // No margin
        color: AyurvedaColors.primaryDark,
        fontWeight: '700',
    },
    row: {
        flexDirection: 'row',
        gap: 6, // Very tight gap
    },
    halfWidth: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 6, // Minimal gap
    },
    label: {
        fontSize: 14, // Reverted to standard size
        color: AyurvedaColors.textSecondary,
        marginBottom: 2,
        fontWeight: '600',
    },
    input: {
        backgroundColor: AyurvedaColors.backgroundSage,
        borderRadius: BorderRadius.md,
        padding: 8, // Very compact input
        fontSize: 16,
        color: AyurvedaColors.textPrimary,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: AyurvedaColors.textDark,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    doshaContainer: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    doshaOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md, // Larger touch target
        borderWidth: 1,
        borderColor: AyurvedaColors.mutedSage,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
    },
    doshaOptionDark: {
        borderColor: 'rgba(255,255,255,0.2)',
    },
    doshaSelected: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderWidth: 2,
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: AyurvedaColors.textMuted,
        marginRight: 8,
    },
    radioSelected: {
        borderWidth: 0,
    },
    doshaText: {
        fontSize: 15,
        fontWeight: '600',
        color: AyurvedaColors.textPrimary,
    },
    submitButton: {
        backgroundColor: AyurvedaColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginTop: Spacing.sm,
        ...Platform.select({
            ios: {
                shadowColor: AyurvedaColors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
