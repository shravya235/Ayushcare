import { Appointment, MOCK_APPOINTMENTS, updateAppointment } from '@/constants/mockData';
import { AyurvedaColors, BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AppointmentDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme } = useTheme();
    const currentColors = Colors[theme];
    const isDark = theme === 'dark';

    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [advice, setAdvice] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [isSavingAdvice, setIsSavingAdvice] = useState(false);
    const [isSavingLink, setIsSavingLink] = useState(false);

    useEffect(() => {
        if (id) {
            const apt = MOCK_APPOINTMENTS.find(a => a.id === id);
            if (apt) {
                setAppointment(apt);
                setAdvice(apt.doctorAdvice || '');
                setMeetingLink(apt.meetingLink || '');
            }
        }
    }, [id]);

    const handleSaveAdvice = () => {
        if (!appointment) return;
        setIsSavingAdvice(true);
        // Simulate API call
        setTimeout(() => {
            updateAppointment(appointment.id, { doctorAdvice: advice, status: 'completed' });
            Alert.alert('Success', 'Advice saved successfully.');
            setIsSavingAdvice(false);
        }, 1000);
    };

    const handleSaveLink = () => {
        if (!appointment) return;
        setIsSavingLink(true);
        updateAppointment(appointment.id, { meetingLink: meetingLink, status: 'confirmed' });
        Alert.alert('Success', 'Meeting link saved and patient notified.');
        setIsSavingLink(false);
    };

    const openMeeting = () => {
        if (meetingLink) {
            Linking.openURL(meetingLink).catch(err => Alert.alert('Error', 'Cannot open link: ' + err.message));
        } else {
            Alert.alert('No Link', 'Please enter and save a valid meeting link first.');
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
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={currentColors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: currentColors.text }]}>Appointment Details</Text>
                </View>

                <View style={styles.content}>

                    {/* Patient Info Card */}
                    <View style={[styles.card, isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                        <Text style={[styles.sectionHeader, { color: AyurvedaColors.secondary }]}>PATIENT INFO</Text>
                        <View style={styles.row}>
                            <Ionicons name="person-circle-outline" size={40} color={AyurvedaColors.primary} />
                            <View style={styles.patientDetails}>
                                <Text style={[styles.patientName, { color: currentColors.text }]}>{appointment.patientName}</Text>
                                <Text style={styles.subText}>ID: {appointment.patientId}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <Text style={[styles.sectionHeader, { color: AyurvedaColors.secondary, marginTop: Spacing.md }]}>REASON FOR VISIT</Text>
                        <Text style={[styles.bodyText, { color: currentColors.text }]}>{appointment.reason}</Text>

                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Ionicons name="calendar-outline" size={16} color={AyurvedaColors.textMuted} />
                                <Text style={styles.metaText}>{appointment.date}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="time-outline" size={16} color={AyurvedaColors.textMuted} />
                                <Text style={styles.metaText}>{appointment.time}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Doctor Advice Section */}
                    <View style={[styles.card, isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                        <Text style={[styles.sectionHeader, { color: AyurvedaColors.secondary }]}>DOCTOR'S ADVICE</Text>
                        <Text style={styles.helperText}>Write your diagnosis, recommendations, or diet plan here.</Text>

                        <TextInput
                            style={[styles.textArea, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', color: currentColors.text, borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e0e0e0' }]}
                            multiline
                            numberOfLines={6}
                            placeholder="Enter advice..."
                            placeholderTextColor={AyurvedaColors.textMuted}
                            value={advice}
                            onChangeText={setAdvice}
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            style={[styles.actionButtonWrapper]}
                            onPress={handleSaveAdvice}
                            disabled={isSavingAdvice}
                        >
                            <LinearGradient
                                colors={[AyurvedaColors.primary, AyurvedaColors.herbalGreen]}
                                style={styles.actionButtonGradient}
                            >
                                <Text style={styles.actionButtonText}>
                                    {isSavingAdvice ? 'Saving...' : 'Save Advice'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Meeting Link Section */}
                    <View style={[styles.card, isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                        <Text style={[styles.sectionHeader, { color: AyurvedaColors.secondary }]}>TELE-CONSULTATION LINK</Text>
                        <Text style={styles.helperText}>Share a Google Meet or Zoom link for the video call.</Text>

                        <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e0e0e0' }]}>
                            <Ionicons name="link-outline" size={20} color={AyurvedaColors.textMuted} style={{ marginRight: 8 }} />
                            <TextInput
                                style={[styles.input, { color: currentColors.text }]}
                                placeholder="https://meet.google.com/..."
                                placeholderTextColor={AyurvedaColors.textMuted}
                                value={meetingLink}
                                onChangeText={setMeetingLink}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.actionButtonWrapper, { flex: 1, marginRight: Spacing.sm }]}
                                onPress={handleSaveLink}
                                disabled={isSavingLink}
                            >
                                <LinearGradient
                                    colors={[AyurvedaColors.secondary, AyurvedaColors.herbalGreen]}
                                    style={styles.actionButtonGradient}
                                >
                                    <Text style={styles.actionButtonText}>Save Link</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionButtonWrapper, { flex: 1, marginLeft: Spacing.sm }]}
                                onPress={openMeeting}
                            >
                                <LinearGradient
                                    colors={isSavingLink ? ['#ccc', '#ccc'] : ['#4285F4', '#3367D6']}
                                    style={styles.actionButtonGradient}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Ionicons name="videocam" size={18} color="#fff" style={{ marginRight: 6 }} />
                                        <Text style={styles.actionButtonText}>Open Meeting</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
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
        marginBottom: Spacing.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    patientDetails: {
        marginLeft: Spacing.md,
    },
    patientName: {
        ...Typography.h3,
        fontWeight: '600',
    },
    subText: {
        fontSize: 14,
        color: AyurvedaColors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: Spacing.sm,
    },
    bodyText: {
        ...Typography.body1,
        lineHeight: 22,
        marginBottom: Spacing.md,
    },
    metaRow: {
        flexDirection: 'row',
        marginTop: Spacing.xs,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Spacing.lg,
        backgroundColor: 'rgba(0,0,0,0.03)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: BorderRadius.round,
    },
    metaText: {
        fontSize: 12,
        color: AyurvedaColors.textSecondary,
        marginLeft: 4,
    },
    helperText: {
        fontSize: 13,
        color: AyurvedaColors.textMuted,
        marginBottom: Spacing.md,
        fontStyle: 'italic',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        fontSize: 16,
        marginBottom: Spacing.md,
        minHeight: 120,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        height: 50,
        marginBottom: Spacing.md,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    actionButtonWrapper: {
        borderRadius: BorderRadius.round,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionButtonGradient: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
