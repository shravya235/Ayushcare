import { Appointment, MOCK_APPOINTMENTS } from '@/constants/mockData';
import { AyurvedaColors, BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PatientConsultationDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme } = useTheme();
    const currentColors = Colors[theme];
    const isDark = theme === 'dark';
    const [appointment, setAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        if (id) {
            const apt = MOCK_APPOINTMENTS.find(a => a.id === id);
            if (apt) {
                setAppointment(apt);
            }
        }
    }, [id]);

    const handleJoinMeeting = () => {
        if (appointment?.meetingLink) {
            Linking.openURL(appointment.meetingLink).catch(err => {
                Alert.alert('Error', 'Could not open meeting link.');
            });
        }
    };

    if (!appointment) {
        return (
            <LinearGradient
                colors={isDark
                    ? [AyurvedaColors.backgroundDark, AyurvedaColors.backgroundDark, AyurvedaColors.backgroundDarkAlt]
                    : [AyurvedaColors.softLavender, AyurvedaColors.mutedLavender, AyurvedaColors.offWhite]
                }
                style={[styles.gradient, { justifyContent: 'center', alignItems: 'center' }]}
            >
                <Text style={{ color: currentColors.text }}>Loading...</Text>
            </LinearGradient>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return AyurvedaColors.primary;
            case 'pending': return '#D4BE7A'; // Gold
            case 'completed': return AyurvedaColors.textMuted;
            default: return AyurvedaColors.textSecondary;
        }
    };

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
                    <Text style={[styles.title, { color: currentColors.text }]}>Consultation Details</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>

                    {/* Status Banner */}
                    <View style={[styles.statusBanner, { backgroundColor: getStatusColor(appointment.status) + '15', borderColor: getStatusColor(appointment.status) + '30' }]}>
                        <Ionicons
                            name={appointment.status === 'confirmed' ? 'checkmark-circle' : appointment.status === 'pending' ? 'time' : 'archive'}
                            size={20}
                            color={getStatusColor(appointment.status)}
                            style={{ marginRight: 8 }}
                        />
                        <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                            Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Text>
                    </View>

                    {/* Doctor Info Card */}
                    <View style={[styles.card, isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                        <Text style={[styles.sectionHeader, { color: AyurvedaColors.secondary }]}>YOUR VAIDYA</Text>
                        <View style={styles.doctorRow}>
                            <View style={styles.avatarLarge}>
                                <Ionicons name="medical" size={32} color="#fff" />
                            </View>
                            <View>
                                <Text style={[styles.doctorNameLarge, { color: currentColors.text }]}>{appointment.doctorName}</Text>
                                <Text style={styles.specialization}>Ayurvedic Specialist</Text>
                            </View>
                        </View>

                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Ionicons name="calendar-outline" size={18} color={AyurvedaColors.textMuted} />
                                <Text style={styles.metaText}>{appointment.date}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="time-outline" size={18} color={AyurvedaColors.textMuted} />
                                <Text style={styles.metaText}>{appointment.time}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Reason Section */}
                    <View style={[styles.card, isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                        <Text style={[styles.sectionHeader, { color: AyurvedaColors.secondary }]}>REASON FOR VISIT</Text>
                        <Text style={[styles.bodyText, { color: currentColors.text }]}>{appointment.reason}</Text>
                    </View>

                    {/* Doctor's Advice Section (Only if available) */}
                    {appointment.doctorAdvice ? (
                        <View style={[styles.card, { backgroundColor: isDark ? 'rgba(61, 107, 79, 0.15)' : '#F0F9F4', borderColor: AyurvedaColors.primary + '40', borderWidth: 1 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
                                <Ionicons name="leaf" size={18} color={AyurvedaColors.primary} style={{ marginRight: 8 }} />
                                <Text style={[styles.sectionHeader, { color: AyurvedaColors.primary, marginBottom: 0 }]}>DOCTOR'S ADVICE</Text>
                            </View>
                            <Text style={[styles.bodyText, { color: currentColors.text, fontStyle: 'italic' }]}>
                                "{appointment.doctorAdvice}"
                            </Text>
                        </View>
                    ) : (
                        appointment.status === 'completed' && (
                            <View style={[styles.card, isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                                <Text style={[styles.sectionHeader, { color: AyurvedaColors.secondary }]}>DOCTOR'S ADVICE</Text>
                                <Text style={[styles.bodyText, { color: AyurvedaColors.textMuted }]}>No advice recorded for this session.</Text>
                            </View>
                        )
                    )}

                    {/* Join Meeting Action */}
                    {appointment.meetingLink && appointment.status !== 'completed' && (
                        <View style={styles.actionContainer}>
                            <Text style={[styles.helperText, { color: AyurvedaColors.textMuted }]}>
                                The doctor has shared a meeting link appropriately.
                            </Text>
                            <TouchableOpacity
                                style={styles.joinButton}
                                onPress={handleJoinMeeting}
                            >
                                <LinearGradient
                                    colors={['#4285F4', '#3367D6']} // Google Meet / Zoom blueish style
                                    style={styles.actionButtonGradient}
                                >
                                    <Ionicons name="videocam" size={22} color="#fff" style={{ marginRight: 10 }} />
                                    <Text style={styles.actionButtonText}>Join Video Consultation</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}

                </ScrollView>
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
    content: {
        padding: Spacing.lg,
        paddingBottom: 40,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        marginBottom: Spacing.lg,
    },
    statusText: {
        fontWeight: '700',
        fontSize: 14,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: Spacing.md,
    },
    doctorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    avatarLarge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: AyurvedaColors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    doctorNameLarge: {
        fontSize: 18,
        fontWeight: '600',
    },
    specialization: {
        fontSize: 14,
        color: AyurvedaColors.textSecondary,
    },
    metaRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.03)',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        justifyContent: 'space-around',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 14,
        fontWeight: '500',
        color: AyurvedaColors.textSecondary,
    },
    bodyText: {
        ...Typography.body1,
        lineHeight: 24,
    },
    actionContainer: {
        marginTop: Spacing.sm,
    },
    helperText: {
        textAlign: 'center',
        marginBottom: Spacing.sm,
        fontSize: 13,
    },
    joinButton: {
        borderRadius: BorderRadius.round,
        overflow: 'hidden',
        shadowColor: '#3367D6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    actionButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
