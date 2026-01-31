import { Appointment, MOCK_APPOINTMENTS } from '@/constants/mockData';
import { AyurvedaColors, BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AppointmentReviewScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const currentColors = Colors[theme];
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    // Reload appointments when screen focuses (to capture new requests)
    useFocusEffect(
        React.useCallback(() => {
            // In a real app, fetch from backend. Here, MOCK_APPOINTMENTS is in-memory.
            // We filter for "current doctor" (mocked as d1, d2, d3... let's show all for demo)
            setAppointments([...MOCK_APPOINTMENTS]);
        }, [])
    );

    const isDark = theme === 'dark';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return AyurvedaColors.primary;
            case 'pending': return '#D4BE7A'; // Gold
            case 'completed': return AyurvedaColors.textMuted;
            default: return AyurvedaColors.textSecondary;
        }
    };

    const renderItem = ({ item }: { item: Appointment }) => (
        <TouchableOpacity
            style={[styles.card, isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }]}
            onPress={() => router.push(`/practitioner/tele-consultation/${item.id}` as any)}
        >
            <View style={styles.cardHeader}>
                <View style={styles.patientInfo}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={20} color="#fff" />
                    </View>
                    <View>
                        <Text style={[styles.patientName, { color: currentColors.text }]}>{item.patientName}</Text>
                        <Text style={styles.dateTime}>{item.date} • {item.time}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20', borderColor: getStatusColor(item.status) + '40', borderWidth: 1 }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status.toUpperCase()}
                    </Text>
                </View>
            </View>

            <View style={styles.reasonContainer}>
                <Text style={styles.reasonLabel}>Reason:</Text>
                <Text style={[styles.reasonText, { color: currentColors.textSecondary }]} numberOfLines={2}>
                    {item.reason}
                </Text>
            </View>

            <View style={styles.cardFooter}>
                <Text style={styles.doctorName}>For: {item.doctorName}</Text>
                <Ionicons name="chevron-forward" size={20} color={AyurvedaColors.textMuted} />
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={isDark
                ? [AyurvedaColors.backgroundDark, AyurvedaColors.backgroundDark, AyurvedaColors.backgroundDarkAlt]
                : [AyurvedaColors.softLavender, AyurvedaColors.mutedLavender, AyurvedaColors.offWhite]
            }
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={currentColors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: currentColors.text }]}>Consultation Requests</Text>
                </View>

                <FlatList
                    data={appointments}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={{ color: currentColors.textMuted }}>No appointments found.</Text>
                        </View>
                    }
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        padding: Spacing.lg,
        paddingBottom: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: Spacing.md,
    },
    title: {
        ...Typography.h3,
        fontWeight: '600',
    },
    listContent: {
        padding: Spacing.lg,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    patientInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AyurvedaColors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.sm,
    },
    patientName: {
        ...Typography.body1,
        fontWeight: '600',
    },
    dateTime: {
        fontSize: 12,
        color: AyurvedaColors.textMuted,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: BorderRadius.round,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
    },
    reasonContainer: {
        marginBottom: Spacing.md,
        backgroundColor: 'rgba(0,0,0,0.03)',
        padding: Spacing.sm,
        borderRadius: BorderRadius.sm,
    },
    reasonLabel: {
        fontSize: 11,
        color: AyurvedaColors.textMuted,
        marginBottom: 2,
        fontWeight: '600',
    },
    reasonText: {
        fontSize: 14,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingTop: Spacing.sm,
    },
    doctorName: {
        fontSize: 12,
        color: AyurvedaColors.textMuted,
        fontStyle: 'italic',
    },
    emptyState: {
        padding: Spacing.xl,
        alignItems: 'center',
    }
});
