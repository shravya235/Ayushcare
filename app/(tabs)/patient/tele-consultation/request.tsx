import { addAppointment, Doctor, MOCK_DOCTORS } from '@/constants/mockData';
import { AyurvedaColors, BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AppointmentRequestScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [reason, setReason] = useState('');

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const handleSubmit = () => {
        if (!selectedDoctor || !date || !time || !reason) {
            Alert.alert('Missing Details', 'Please fill in all fields to request a consultation.');
            return;
        }

        // Create mock appointment
        const newAppointment = {
            id: `apt_${Date.now()}`,
            patientId: 'P001', // Mock current user
            patientName: 'Aarav Patel',
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            date: date ? date.toLocaleDateString() : '',
            time: time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            reason,
            status: 'pending' as const,
        };

        addAppointment(newAppointment);

        // Navigate to confirmation
        router.push('/(tabs)/patient/tele-consultation/confirmation');
    };

    const currentColors = Colors[theme];
    const isDark = theme === 'dark';

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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={currentColors.text} />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: currentColors.text }]}>Request Tele-Consultation</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: AyurvedaColors.primary }]}>Select Practitioner</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.doctorList}>
                            {MOCK_DOCTORS.map((doctor) => (
                                <TouchableOpacity
                                    key={doctor.id}
                                    style={[
                                        styles.doctorCard,
                                        selectedDoctor?.id === doctor.id && styles.selectedDoctorCard,
                                        isDark && { backgroundColor: 'rgba(30, 41, 35, 0.8)', borderColor: 'rgba(255,255,255,0.1)' },
                                        selectedDoctor?.id === doctor.id && isDark && { backgroundColor: AyurvedaColors.primaryDark, borderColor: AyurvedaColors.accent },
                                        { borderColor: selectedDoctor?.id === doctor.id ? AyurvedaColors.primary : (isDark ? 'rgba(255,255,255,0.1)' : 'transparent') }
                                    ]}
                                    onPress={() => setSelectedDoctor(doctor)}
                                >
                                    <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                                    <View style={styles.doctorInfo}>
                                        <Text style={[styles.doctorName, isDark && { color: AyurvedaColors.textDark }]} numberOfLines={1}>{doctor.name}</Text>
                                        <Text style={[styles.doctorSpec, isDark && { color: AyurvedaColors.textDarkMuted }]} numberOfLines={1}>{doctor.specialization}</Text>
                                        <View style={styles.ratingContainer}>
                                            <Ionicons name="star" size={14} color="#FFD700" />
                                            <Text style={styles.ratingText}>{doctor.rating}</Text>
                                        </View>
                                    </View>
                                    {selectedDoctor?.id === doctor.id && (
                                        <View style={styles.checkMark}>
                                            <Ionicons name="checkmark-circle" size={24} color={AyurvedaColors.primary} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: AyurvedaColors.primary }]}>Preferred Schedule</Text>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: currentColors.text }]}>Date</Text>
                            {Platform.OS === 'web' ? (
                                <View style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                    <Ionicons name="calendar-outline" size={20} color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary} style={styles.inputIcon} />
                                    <RNDateTimePicker
                                        value={date || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange}
                                        style={{ height: 40, flex: 1, backgroundColor: 'transparent' }}
                                    />
                                </View>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={() => setShowDatePicker(true)}
                                        style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                        <Ionicons name="calendar-outline" size={20} color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary} style={styles.inputIcon} />
                                        <Text style={[styles.input, { color: date ? currentColors.text : AyurvedaColors.textSecondary, paddingTop: 0 }]}>
                                            {date ? date.toLocaleDateString() : 'Select Date'}
                                        </Text>
                                    </TouchableOpacity>
                                    {showDatePicker && (
                                        <RNDateTimePicker
                                            value={date || new Date()}
                                            mode="date"
                                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                            onChange={onDateChange}
                                        />
                                    )}
                                </>
                            )}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: currentColors.text }]}>Time</Text>
                            {Platform.OS === 'web' ? (
                                <View style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                    <Ionicons name="time-outline" size={20} color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary} style={styles.inputIcon} />
                                    <RNDateTimePicker
                                        value={time || new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={onTimeChange}
                                        style={{ height: 40, flex: 1, backgroundColor: 'transparent' }}
                                    />
                                </View>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={() => setShowTimePicker(true)}
                                        style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                        <Ionicons name="time-outline" size={20} color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary} style={styles.inputIcon} />
                                        <Text style={[styles.input, { color: time ? currentColors.text : AyurvedaColors.textSecondary, paddingTop: 0 }]}>
                                            {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
                                        </Text>
                                    </TouchableOpacity>
                                    {showTimePicker && (
                                        <RNDateTimePicker
                                            value={time || new Date()}
                                            mode="time"
                                            display="spinner"
                                            onChange={onTimeChange}
                                        />
                                    )}
                                </>
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: AyurvedaColors.primary }]}>Reason for Consultation</Text>
                        <View style={[styles.inputContainer, { height: 120, alignItems: 'flex-start', paddingVertical: Spacing.sm }, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                            <TextInput
                                style={[styles.textArea, { color: currentColors.text }]}
                                placeholder="Describe your symptoms or concerns..."
                                placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textSecondary}
                                multiline
                                numberOfLines={4}
                                value={reason}
                                onChangeText={setReason}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButtonWrapper, { opacity: (selectedDoctor && date && time && reason) ? 1 : 0.7 }]}
                        onPress={handleSubmit}
                        disabled={!selectedDoctor || !date || !time || !reason}
                    >
                        <LinearGradient
                            colors={[AyurvedaColors.primary, AyurvedaColors.herbalGreen]}
                            style={styles.submitButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.submitButtonText}>Submit Request</Text>
                            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.submitButtonIcon} />
                        </LinearGradient>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: Spacing.lg,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        marginTop: Spacing.sm,
    },
    backButton: {
        padding: Spacing.sm,
        marginRight: Spacing.sm,
    },
    title: {
        ...Typography.h2,
        fontWeight: '600',
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.h3,
        marginBottom: Spacing.md,
        fontWeight: '600',
    },
    doctorList: {
        marginHorizontal: -Spacing.xs,
    },
    doctorCard: {
        width: 160,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginRight: Spacing.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 2,
        position: 'relative',
    },
    selectedDoctorCard: {
        backgroundColor: AyurvedaColors.primary,
        borderColor: AyurvedaColors.deepForest,
        shadowColor: AyurvedaColors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    doctorImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: Spacing.sm,
    },
    doctorInfo: {
        alignItems: 'center',
    },
    doctorName: {
        ...Typography.body1,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 2,
        color: '#333',
    },
    doctorSpec: {
        fontSize: 12,
        color: AyurvedaColors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: BorderRadius.round,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8B7355',
        marginLeft: 2,
    },
    checkMark: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    inputGroup: {
        marginBottom: Spacing.md,
    },
    label: {
        ...Typography.body2,
        marginBottom: Spacing.xs,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        height: 56, // Match login input height
        borderWidth: 1,
        borderColor: 'rgba(168, 197, 168, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    inputIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        ...Typography.body1,
        paddingVertical: Spacing.md,
    },
    textArea: {
        flex: 1,
        ...Typography.body1,
        width: '100%',
    },
    submitButtonWrapper: {
        marginTop: Spacing.md,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        shadowColor: AyurvedaColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
    },
    submitButtonText: {
        color: '#fff',
        ...Typography.h3,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    submitButtonIcon: {
        marginLeft: Spacing.sm,
    },
});
