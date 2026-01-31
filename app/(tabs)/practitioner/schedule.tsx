import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { AyurvedaColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

// Mock Data for Schedule
const MOCK_APPOINTMENTS = [
    { id: '1', time: '09:00 AM', patient: 'Rahul Sharma', type: 'Consultation', status: 'Confirmed' },
    { id: '2', time: '10:30 AM', patient: 'Priya Patel', type: 'Follow-up', status: 'Pending' },
    { id: '3', time: '11:45 AM', patient: 'Anjali Gupta', type: 'Therapy', status: 'Confirmed' },
    { id: '4', time: '02:00 PM', patient: 'Vikram Singh', type: 'Consultation', status: 'Cancelled' },
    { id: '5', time: '04:15 PM', patient: 'Sneha Reddy', type: 'Follow-up', status: 'Confirmed' },
];

export default function ScheduleScreen() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarViewDate, setCalendarViewDate] = useState(new Date());

    const renderAppointment = ({ item }: { item: typeof MOCK_APPOINTMENTS[0] }) => {
        let statusColor = AyurvedaColors.secondary;
        if (item.status === 'Confirmed') statusColor = AyurvedaColors.primary;
        if (item.status === 'Cancelled') statusColor = '#E74C3C'; // Red
        if (item.status === 'Pending') statusColor = '#F39C12'; // Orange

        return (
            <ThemedView variant="card" style={[styles.appointmentCard, isDark && styles.appointmentCardDark]}>
                <View style={styles.timeContainer}>
                    <Text style={[styles.timeText, isDark && { color: AyurvedaColors.textDark }]}>{item.time}</Text>
                    <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={[styles.patientName, isDark && { color: AyurvedaColors.textDark }]}>{item.patient}</Text>
                    <Text style={[styles.appointmentType, isDark && { color: AyurvedaColors.textDarkMuted }]}>{item.type}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
                </View>
            </ThemedView>
        );
    };

    // Date generation relative to selected date (horizontal list)
    const dates = [-2, -1, 0, 1, 2].map(d => {
        const date = new Date(selectedDate);
        date.setDate(selectedDate.getDate() + d);
        return date;
    });

    const changeMonth = (increment: number) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setSelectedDate(newDate);
    };

    // Generate days for the CALENDAR MODAL view date's month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // Add padding for start of week
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        // Add actual days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const calendarGridDays = getDaysInMonth(calendarViewDate);

    const changeCalendarMonth = (increment: number) => {
        const newDate = new Date(calendarViewDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCalendarViewDate(newDate);
    };

    return (
        <View style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}>
            <Stack.Screen options={{ title: 'Schedule', headerRight: undefined }} />

            {/* Date Selector */}
            <View style={[styles.dateSelector, isDark && { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                {/* Month Navigation & Calendar Trigger */}
                <View style={styles.monthNavigation}>
                    <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navArrow}>
                        <Ionicons name="chevron-back" size={20} color={isDark ? AyurvedaColors.textDark : AyurvedaColors.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.monthTitle, isDark && { color: AyurvedaColors.textDark }]}>
                        {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Text>
                    <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navArrow}>
                        <Ionicons name="chevron-forward" size={20} color={isDark ? AyurvedaColors.textDark : AyurvedaColors.primary} />
                    </TouchableOpacity>

                    {/* Calendar Trigger moved here */}
                    <TouchableOpacity
                        onPress={() => {
                            setCalendarViewDate(selectedDate);
                            setShowCalendar(true);
                        }}
                        style={styles.calendarTrigger}
                    >
                        <Ionicons name="calendar-outline" size={20} color={isDark ? AyurvedaColors.textDark : AyurvedaColors.primary} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    horizontal
                    data={dates}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dateList}
                    renderItem={({ item }) => {
                        const isSelected = item.getDate() === selectedDate.getDate() && item.getMonth() === selectedDate.getMonth();
                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedDate(item)}
                                style={[
                                    styles.dateItem,
                                    isSelected && styles.dateItemSelected,
                                    isSelected && isDark && { backgroundColor: AyurvedaColors.primaryLight }
                                ]}
                            >
                                <Text style={[
                                    styles.dateDay,
                                    isSelected && styles.dateTextSelected,
                                    isDark && !isSelected && { color: AyurvedaColors.textDarkMuted }
                                ]}>
                                    {item.toLocaleDateString('en-US', { weekday: 'short' })}
                                </Text>
                                <Text style={[
                                    styles.dateNum,
                                    isSelected && styles.dateTextSelected,
                                    isDark && !isSelected && { color: AyurvedaColors.textDark }
                                ]}>
                                    {item.getDate()}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={item => item.toISOString()}
                />
            </View>

            {/* Appointments List */}
            <FlatList
                data={MOCK_APPOINTMENTS}
                renderItem={renderAppointment}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <Text style={[styles.sectionTitle, { color: isDark ? AyurvedaColors.textDark : AyurvedaColors.textPrimary }]}>
                        Appointments for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </Text>
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="calendar-outline" size={48} color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textMuted} />
                        <Text style={[styles.emptyText, isDark && { color: AyurvedaColors.textDarkMuted }]}>No appointments for this day.</Text>
                    </View>
                }
            />

            {/* Calendar Modal */}
            <Modal
                transparent={true}
                visible={showCalendar}
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowCalendar(false)}
                >
                    <View style={[styles.calendarModal, isDark && styles.calendarModalDark]}>
                        {/* Modal Header with Navigation */}
                        <View style={styles.modalHeaderRow}>
                            <TouchableOpacity onPress={() => changeCalendarMonth(-1)} style={styles.navArrow}>
                                <Ionicons name="chevron-back" size={24} color={isDark ? AyurvedaColors.textDark : AyurvedaColors.primary} />
                            </TouchableOpacity>
                            <Text style={[styles.calendarHeader, isDark && { color: AyurvedaColors.textDark }]}>
                                {calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </Text>
                            <TouchableOpacity onPress={() => changeCalendarMonth(1)} style={styles.navArrow}>
                                <Ionicons name="chevron-forward" size={24} color={isDark ? AyurvedaColors.textDark : AyurvedaColors.primary} />
                            </TouchableOpacity>
                        </View>

                        {/* Weekday Headers */}
                        <View style={styles.weekRow}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <Text key={i} style={[styles.weekDayText, isDark && { color: AyurvedaColors.textDarkMuted }]}>{day}</Text>
                            ))}
                        </View>

                        <View style={styles.calendarGrid}>
                            {calendarGridDays.map((date, index) => {
                                if (!date) return <View key={`empty-${index}`} style={styles.calendarDay} />;

                                const isSelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth();
                                const isToday = date.toDateString() === new Date().toDateString();

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.calendarDay,
                                            isSelected && styles.calendarDaySelected,
                                            isToday && !isSelected && styles.calendarDayToday,
                                            isSelected && isDark && { backgroundColor: AyurvedaColors.primaryLight }
                                        ]}
                                        onPress={() => {
                                            setSelectedDate(date);
                                            setShowCalendar(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.calendarDayText,
                                            isSelected && styles.dateTextSelected,
                                            isDark && !isSelected && { color: AyurvedaColors.textPrimary }
                                        ]}>
                                            {date.getDate()}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EBF4',
    },
    dateSelector: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    monthNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
        paddingHorizontal: Spacing.lg,
    },
    monthTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AyurvedaColors.textPrimary,
        marginHorizontal: Spacing.md,
        minWidth: 120, // Prevent jumping
        textAlign: 'center',
    },
    navArrow: {
        padding: 4,
    },
    dateList: {
        paddingHorizontal: Spacing.lg, // Match dashboard
        gap: Spacing.sm,
    },
    dateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12, // Larger touch target
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.lg, // Match dashboard cards
        backgroundColor: 'rgba(255,255,255,0.8)',
        minWidth: 60,
    },
    dateItemSelected: {
        backgroundColor: AyurvedaColors.primary,
        ...Shadows.light.card, // Add shadow
    },
    dateDay: {
        fontSize: 13,
        color: AyurvedaColors.textSecondary,
        marginBottom: 4,
        fontWeight: '500',
    },
    dateNum: {
        fontSize: 20, // Larger font
        fontWeight: 'bold',
        color: AyurvedaColors.textPrimary,
    },
    dateTextSelected: {
        color: '#fff',
    },
    listContent: {
        padding: Spacing.lg, // Match dashboard padding
    },
    sectionTitle: {
        marginBottom: Spacing.md,
        fontSize: 18, // Larger title
        marginTop: Spacing.sm,
    },
    appointmentCard: {
        padding: Spacing.md,
        marginBottom: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: BorderRadius.lg, // Match dashboard
        ...Shadows.light.card, // Add card shadow
    },
    appointmentCardDark: {
        backgroundColor: AyurvedaColors.surfaceDark,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOpacity: 0.3,
    },
    timeContainer: {
        alignItems: 'center',
        marginRight: Spacing.md,
        width: 70, // Slightly wider
    },
    timeText: {
        fontSize: 15, // Larger time
        fontWeight: '700',
        color: AyurvedaColors.textPrimary,
        marginBottom: 6,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    detailsContainer: {
        flex: 1,
    },
    patientName: {
        fontSize: 18, // Larger name
        marginBottom: 4,
    },
    appointmentType: {
        fontSize: 14,
        color: AyurvedaColors.textSecondary,
    },
    statusContainer: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: BorderRadius.md, // Match radius
        backgroundColor: 'rgba(0,0,0,0.03)',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xxl,
    },
    emptyText: {
        marginTop: Spacing.md,
        fontSize: 16,
        color: AyurvedaColors.textMuted,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarModal: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        ...Shadows.light.elevated,
    },
    calendarModalDark: {
        backgroundColor: AyurvedaColors.backgroundDark,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    calendarHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: AyurvedaColors.textPrimary,
        marginBottom: Spacing.lg,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    calendarDay: {
        width: 44,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BorderRadius.md,
        backgroundColor: AyurvedaColors.backgroundSage,
    },
    calendarDaySelected: {
        backgroundColor: AyurvedaColors.primary,
    },
    calendarDayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AyurvedaColors.textPrimary,
    },
    calendarDaySub: {
        fontSize: 10,
        color: AyurvedaColors.textSecondary,
    },
    closeButton: {
        marginTop: Spacing.lg,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
    },
    closeButtonText: {
        fontSize: 16,
        color: AyurvedaColors.primary,
        fontWeight: '600',
    },
    calendarTrigger: {
        position: 'absolute',
        right: Spacing.md,
        padding: 4,
    },
    modalHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: Spacing.md,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 8,
    },
    weekDayText: {
        fontSize: 12,
        fontWeight: '600',
        color: AyurvedaColors.textSecondary,
        width: 44,
        textAlign: 'center',
    },
    calendarDayToday: {
        borderWidth: 1,
        borderColor: AyurvedaColors.primary,
    },
});
