import { AyurvedaColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function PractitionerLayout() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: isDark ? AyurvedaColors.backgroundDark : AyurvedaColors.backgroundLight,
                },
                headerTintColor: isDark ? AyurvedaColors.textDark : AyurvedaColors.deepForest,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="patients" options={{ title: 'My Patients' }} />
            <Stack.Screen name="schedule" options={{ title: 'Schedule' }} />
            <Stack.Screen name="new-patient" options={{ title: 'New Patient' }} />
            <Stack.Screen name="patient/[id]" options={{ title: 'Patient Details' }} />
            <Stack.Screen name="patient/[id]/note" options={{ title: 'Add Note', presentation: 'modal' }} />
            <Stack.Screen name="tele-consultation/index" options={{ title: 'Tele-Consultation' }} />
            <Stack.Screen name="tele-consultation/[id]" options={{ title: 'Appointment Details' }} />
        </Stack>
    );
}
