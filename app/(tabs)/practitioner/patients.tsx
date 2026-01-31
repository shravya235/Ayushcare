import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AyurvedaColors, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_PATIENTS, Patient, getDoshaColor } from '../../../constants/mockData';

export default function PatientListScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // TODO(Firebase): Fetch patients from database
    const patients = MOCK_PATIENTS;

    const handlePress = (id: string) => {
        // Navigate to patient detail in the tabs/practitioner path
        router.push(`/(tabs)/practitioner/patient/${id}` as any);
    };

    const renderItem = ({ item }: { item: Patient }) => {
        const doshaColor = getDoshaColor(item.dosha);

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handlePress(item.id)}
                style={styles.cardContainer}
            >
                {/* Use standard View or override ThemedView variant styles manually if needed */}
                <ThemedView style={[styles.card, isDark && styles.cardDark]} lightColor="#ffffff" darkColor={AyurvedaColors.surfaceDark}>
                    <View style={styles.mainRow}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.topRow}>
                                <ThemedText type="defaultSemiBold" style={[styles.name, isDark && { color: AyurvedaColors.textDark }]}>{item.name}</ThemedText>
                                <ThemedText style={[styles.lastVisit, isDark && { color: AyurvedaColors.textDarkMuted }]}>{item.lastConsultation}</ThemedText>
                            </View>
                            <View style={styles.bottomRow}>
                                <ThemedText style={[styles.subInfo, isDark && { color: AyurvedaColors.textDarkMuted }]}>
                                    {item.age} yrs • {item.gender}
                                </ThemedText>
                                <View style={[styles.doshaBadge, { backgroundColor: doshaColor + '20', borderColor: doshaColor }]}>
                                    <Text style={[styles.doshaText, { color: doshaColor }]}>{item.dosha}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ThemedView>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}>
            <FlatList
                data={patients}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <ThemedText type="subtitle" style={[styles.headerTitle, isDark && { color: AyurvedaColors.textDark }]}>All Patients ({patients.length})</ThemedText>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EBF4',
    },
    listContent: {
        padding: Spacing.md,
    },
    listHeader: {
        marginBottom: 8,
    },
    headerTitle: {
        color: AyurvedaColors.primaryDark,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
    },
    cardContainer: {
        marginBottom: 8,
    },
    card: {
        padding: 8, // Very tight padding
        borderRadius: BorderRadius.md,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        // No shadow to save space or keep visual noise low
    },
    cardDark: {
        backgroundColor: AyurvedaColors.surfaceDark,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 32, // Smaller avatar
        height: 32,
        borderRadius: 16,
        backgroundColor: AyurvedaColors.backgroundSage,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    avatarText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: AyurvedaColors.primary,
        lineHeight: 18,
    },
    infoContainer: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0, // No margin
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2, // Tiny gap
    },
    name: {
        fontSize: 14,
        color: AyurvedaColors.textPrimary,
        fontWeight: '600',
        lineHeight: 20, // Strict line height
    },
    subInfo: {
        fontSize: 12,
        color: AyurvedaColors.textSecondary,
        lineHeight: 16, // Strict line height
    },
    doshaBadge: {
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
        borderWidth: 0.5,
    },
    doshaText: {
        fontSize: 10,
        fontWeight: '600',
        lineHeight: 12,
    },
    lastVisit: {
        fontSize: 10,
        color: AyurvedaColors.textMuted,
        lineHeight: 14,
    },
});
