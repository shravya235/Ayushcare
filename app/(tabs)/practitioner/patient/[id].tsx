import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AyurvedaColors, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_PATIENTS, Patient, getDoshaColor } from '../../../../constants/mockData';

export default function PatientEMRScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [patient, setPatient] = useState<Patient | null>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // TODO(Firebase): Load EMR data
    useEffect(() => {
        const p = MOCK_PATIENTS.find(p => p.id === id);
        if (p) {
            setPatient(p);
        } else {
            Alert.alert('Error', 'Patient not found');
            router.back();
        }
    }, [id]);

    if (!patient) return null;

    const doshaColor = getDoshaColor(patient.dosha);

    return (
        <View style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}>
            <Stack.Screen options={{ title: 'Patient EMR' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* 1. Patient Summary Card */}
                <ThemedView variant="elevated" style={[styles.summaryCard, isDark && styles.cardDark]}>
                    <View style={styles.headerRow}>
                        <View>
                            <ThemedText type="title" style={[styles.patientName, isDark && { color: AyurvedaColors.textDark }]}>{patient.name}</ThemedText>
                            <Text style={[styles.patientId, isDark && { color: AyurvedaColors.textDarkMuted }]}>ID: #{patient.id}</Text>
                        </View>
                        <View style={[styles.doshaBadge, { backgroundColor: doshaColor }]}>
                            <Text style={styles.doshaText}>{patient.dosha}</Text>
                        </View>
                    </View>

                    <View style={[styles.detailsGrid, isDark && { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, isDark && { color: AyurvedaColors.textDarkMuted }]}>Age</Text>
                            <Text style={[styles.detailValue, isDark && { color: AyurvedaColors.textDark }]}>{patient.age}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, isDark && { color: AyurvedaColors.textDarkMuted }]}>Gender</Text>
                            <Text style={[styles.detailValue, isDark && { color: AyurvedaColors.textDark }]}>{patient.gender}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, isDark && { color: AyurvedaColors.textDarkMuted }]}>Last Visit</Text>
                            <Text style={[styles.detailValue, isDark && { color: AyurvedaColors.textDark }]}>{patient.lastConsultation}</Text>
                        </View>
                    </View>
                </ThemedView>

                {/* 4. Practitioner Notes (Prioritized) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <ThemedText type="subtitle" style={{ fontSize: 18, color: isDark ? AyurvedaColors.textDark : AyurvedaColors.textPrimary }}>Practitioner Notes</ThemedText>
                        <TouchableOpacity
                            onPress={() => router.push(`/(tabs)/practitioner/patient/${id}/note` as any)}
                            style={styles.addButton}
                        >
                            <Ionicons name="add" size={16} color="#fff" />
                            <Text style={styles.addButtonText}>Add Note</Text>
                        </TouchableOpacity>
                    </View>

                    {patient.notes && patient.notes.length > 0 ? (
                        patient.notes.map((note) => (
                            <ThemedView key={note.id} variant="card" style={[styles.noteCard, isDark && styles.cardDark]}>
                                <View style={styles.noteHeader}>
                                    <Ionicons name="pencil" size={16} color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary} />
                                    <Text style={[styles.noteDate, isDark && { color: AyurvedaColors.textDarkMuted }]}>{note.date}</Text>
                                </View>
                                <Text style={[styles.noteText, isDark && { color: AyurvedaColors.textDark }]}>{note.text}</Text>
                            </ThemedView>
                        ))
                    ) : (
                        <View style={[styles.emptyState, isDark && { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                            <Text style={[styles.emptyText, isDark && { color: AyurvedaColors.textDarkMuted }]}>No notes added yet.</Text>
                        </View>
                    )}
                </View>

                {/* 2. Assessment History */}
                <View style={styles.section}>
                    <ThemedText type="subtitle" style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Assessment History</ThemedText>
                    {patient.assessmentHistory.map((history, index) => (
                        <ThemedView key={index} variant="default" style={styles.historyItem}>
                            <View style={styles.historyDot} />
                            <View style={styles.historyContent}>
                                <Text style={[styles.historyDate, isDark && { color: AyurvedaColors.textDarkMuted }]}>{history.date}</Text>
                                <Text style={[styles.historyDosha, { color: getDoshaColor(history.dosha) }]}>{history.dosha}</Text>
                            </View>
                        </ThemedView>
                    ))}
                </View>

                {/* 3. Daily Health Logs */}
                <View style={styles.section}>
                    <ThemedText type="subtitle" style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Recent Health Logs</ThemedText>
                    {patient.healthLogs.length > 0 ? (
                        patient.healthLogs.map((log, index) => (
                            <ThemedView key={index} variant="card" style={[styles.logCard, isDark && styles.cardDark]}>
                                <Text style={[styles.logDate, isDark && { color: AyurvedaColors.primaryLight }]}>{log.date}</Text>
                                <View style={styles.logGrid}>
                                    <LogItem icon="moon" label="Sleep" value={log.sleep} isDark={isDark} />
                                    <LogItem icon="restaurant" label="Digestion" value={log.digestion} isDark={isDark} />
                                    <LogItem icon="pulse" label="Stress" value={log.stress} isDark={isDark} />
                                </View>
                            </ThemedView>
                        ))
                    ) : (
                        <Text style={[styles.emptyText, isDark && { color: AyurvedaColors.textDarkMuted }]}>No recent logs.</Text>
                    )}
                </View>

            </ScrollView>
        </View>
    );
}

const LogItem = ({ icon, label, value, isDark }: { icon: any; label: string; value: string, isDark: boolean }) => (
    <View style={styles.logItem}>
        <Ionicons name={icon} size={16} color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary} />
        <Text style={[styles.logLabel, isDark && { color: AyurvedaColors.textDarkMuted }]}>{label}</Text>
        <Text style={[styles.logValue, isDark && { color: AyurvedaColors.textDark }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EBF4', // Soft lavender to match dashboard
    },
    scrollContent: {
        padding: Spacing.md,
        paddingBottom: Spacing.xxl,
    },
    summaryCard: {
        padding: Spacing.md,
        marginBottom: Spacing.lg,
        backgroundColor: '#fff',
    },
    cardDark: {
        backgroundColor: AyurvedaColors.surfaceDark,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    patientName: {
        color: AyurvedaColors.textPrimary,
        fontSize: 22,
    },
    patientId: {
        color: AyurvedaColors.textSecondary,
        fontSize: 14,
    },
    doshaBadge: {
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.round,
    },
    doshaText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    detailsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: AyurvedaColors.backgroundSage,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    detailItem: {
        alignItems: 'center',
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: AyurvedaColors.textSecondary,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: AyurvedaColors.primaryDark,
    },
    section: {
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        marginBottom: Spacing.md,
        color: AyurvedaColors.primaryDark,
        fontSize: 18,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    addButton: {
        backgroundColor: AyurvedaColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 6,
        borderRadius: BorderRadius.sm,
        gap: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    noteCard: {
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        backgroundColor: '#fff',
        borderColor: AyurvedaColors.accentMuted,
        borderLeftWidth: 4,
    },
    noteHeader: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
        alignItems: 'center',
    },
    noteDate: {
        fontSize: 12,
        color: AyurvedaColors.textMuted,
        fontWeight: '600',
    },
    noteText: {
        color: AyurvedaColors.textPrimary,
        lineHeight: 20,
        fontSize: 14,
    },
    emptyState: {
        padding: Spacing.md,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    emptyText: {
        color: AyurvedaColors.textMuted,
        fontStyle: 'italic',
        fontSize: 14,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        padding: Spacing.sm,
    },
    historyDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: AyurvedaColors.secondary,
        marginRight: Spacing.md,
    },
    historyContent: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    historyDate: {
        color: AyurvedaColors.textSecondary,
        fontSize: 14,
    },
    historyDosha: {
        fontWeight: '600',
        fontSize: 14,
    },
    logCard: {
        padding: Spacing.md,
        marginBottom: Spacing.md,
        backgroundColor: '#fff',
    },
    logDate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: AyurvedaColors.primary,
        marginBottom: Spacing.sm,
    },
    logGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logItem: {
        alignItems: 'center',
        flex: 1,
    },
    logLabel: {
        fontSize: 11,
        marginTop: 4,
        color: AyurvedaColors.textMuted,
    },
    logValue: {
        fontSize: 13,
        fontWeight: '500',
        color: AyurvedaColors.textPrimary,
    },
});
