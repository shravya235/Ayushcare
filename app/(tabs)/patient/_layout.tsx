import { AyurvedaColors } from '@/constants/theme';
import { Stack } from 'expo-router';
import React from 'react';

export default function PatientLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: AyurvedaColors.backgroundLight,
                },
                headerTintColor: AyurvedaColors.deepForest,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="assessment" options={{ title: 'Assessment' }} />
            <Stack.Screen name="assessment-questions" options={{ title: 'Questions' }} />
            <Stack.Screen name="health-log" options={{ title: 'Health Log' }} />
            <Stack.Screen name="history" options={{ title: 'History' }} />
            <Stack.Screen name="results" options={{ title: 'Results' }} />
            <Stack.Screen name="tele-consultation/index" options={{ title: 'Tele-Consultation', headerShown: false }} />
            <Stack.Screen name="tele-consultation/[id]" options={{ title: 'Consultation Details', headerShown: false }} />
            <Stack.Screen name="tele-consultation/request" options={{ title: 'Request Consultation', headerShown: false }} />
            <Stack.Screen name="tele-consultation/confirmation" options={{ title: 'Confirmation', headerShown: false }} />
        </Stack>
    );
}
