import { AyurvedaColors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    return (
        <LinearGradient
            colors={[AyurvedaColors.softGreen, AyurvedaColors.offWhite]}
            style={styles.container}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={styles.content}>
                {/* Header Icon */}
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="account-circle"
                        size={60}
                        color={AyurvedaColors.herbalGreen}
                    />
                </View>

                {/* Login Title */}
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                {/* Placeholder for login form */}
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Login Form</Text>
                    <Text style={styles.placeholderSubtext}>
                        (Login UI to be implemented)
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 32,
        width: '100%',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: AyurvedaColors.deepForest,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: AyurvedaColors.deepForest,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '300',
        color: AyurvedaColors.herbalGreen,
        marginBottom: 40,
    },
    placeholder: {
        width: '100%',
        padding: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AyurvedaColors.mutedSage,
        borderStyle: 'dashed',
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: '500',
        color: AyurvedaColors.herbalGreen,
        marginBottom: 4,
    },
    placeholderSubtext: {
        fontSize: 14,
        color: AyurvedaColors.mutedSage,
    },
});
