import { Appointment, MOCK_APPOINTMENTS } from '@/constants/mockData';
import { AyurvedaColors, BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock logged-in patient ID for demo purposes
const CURRENT_PATIENT_ID = 'P001';

export default function PatientConsultationHub() {
    const router = useRouter();
    const { theme } = useTheme();
    const currentColors = Colors[theme];
    const isDark = theme === 'dark';
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            // Filter appointments for the current patient
            // In a real app, this would be an API call with the user's auth token
            const patientAppointments = MOCK_APPOINTMENTS.filter(apt => apt.patientId === CURRENT_PATIENT_ID);
            setAppointments(patientAppointments);
        }, [])
    );

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
            onPress={() => router.push(`/patient/tele-consultation/${item.id}` as any)}
        >
            <View style={styles.cardHeader}>
                <View style={styles.doctorInfo}>
                    <View style={styles.avatar}>
                        <Ionicons name="medical" size={20} color="#fff" />
                    </View>
                    <View>
                        <Text style={[styles.doctorName, { color: currentColors.text }]}>{item.doctorName}</Text>
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

            {item.doctorAdvice && (
                <View style={styles.advicePreview}>
                    <Ionicons name="document-text-outline" size={14} color={AyurvedaColors.primary} style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 12, color: AyurvedaColors.primary, fontWeight: '600' }}>Advice Available</Text>
                </View>
            )}

            <View style={styles.cardFooter}>
                <Text style={styles.viewDetails}>View Details</Text>
                <Ionicons name="chevron-forward" size={16} color={AyurvedaColors.primary} />
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
                    <Text style={[styles.title, { color: currentColors.text }]}>My Consultations</Text>
                </View>

                {/* Quick Action to Request New Consultation */}
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.newRequestButton}
                        onPress={() => router.push('/patient/tele-consultation/request')}
                    >
                        <LinearGradient
                            colors={[AyurvedaColors.primary, AyurvedaColors.herbalGreen]}
                            style={styles.buttonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Ionicons name="add-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.buttonText}>Request New Consultation</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={appointments}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Ionicons name="calendar-outline" size={48} color={AyurvedaColors.textMuted} style={{ marginBottom: 16 }} />
                            <Text style={{ color: currentColors.textMuted, textAlign: 'center' }}>You haven't requested any consultations yet.</Text>
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
    actionContainer: {
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
    },
    newRequestButton: {
        borderRadius: BorderRadius.round,
        overflow: 'hidden',
        shadowColor: AyurvedaColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    listContent: {
        padding: Spacing.lg,
        paddingTop: Spacing.sm,
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
    doctorInfo: {
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
    doctorName: {
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
    advicePreview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        backgroundColor: '#F0F9F4',
        padding: 6,
        borderRadius: BorderRadius.sm,
        alignSelf: 'flex-start',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingTop: Spacing.sm,
    },
    viewDetails: {
        fontSize: 12,
        color: AyurvedaColors.primary,
        fontWeight: '600',
        marginRight: 2,
    },
    emptyState: {
        padding: Spacing.xl,
        alignItems: 'center',
        marginTop: Spacing.xl,
    }
});
