import { AyurvedaColors, BorderRadius, Spacing } from '@/constants/theme';
import { hp, rf, wp, wpDirect } from '@/utils/responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// TODO: Implement full registration flow with Firebase
// - Add form fields for: name, email, password, confirm password
// - Add role selection (Patient/Practitioner)
// - Implement Firebase createUserWithEmailAndPassword
// - Store user data in Firestore with role information

export default function RegisterScreen() {
    return (
        <LinearGradient
            colors={[AyurvedaColors.softGreen, AyurvedaColors.mutedSage, AyurvedaColors.offWhite]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.container}>
                {/* Header Icon */}
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="spa"
                        size={48}
                        color={AyurvedaColors.herbalGreen}
                    />
                </View>

                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Begin your wellness journey</Text>

                {/* Placeholder */}
                <View style={styles.placeholder}>
                    <MaterialCommunityIcons
                        name="account-plus"
                        size={rf(40)}
                        color={AyurvedaColors.mutedSage}
                    />
                    <Text style={styles.placeholderText}>Registration form coming soon</Text>
                </View>

                {/* Back to Login */}
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={20}
                        color={AyurvedaColors.herbalGreen}
                    />
                    <Text style={styles.backButtonText}>Back to Login</Text>
                </Pressable>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(6),
    },
    iconContainer: {
        width: wpDirect(100),
        height: wpDirect(100),
        borderRadius: wpDirect(50),
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    title: {
        fontSize: rf(28),
        fontWeight: '700',
        color: AyurvedaColors.deepForest,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: rf(16),
        color: AyurvedaColors.secondary,
        marginBottom: hp(4),
    },
    placeholder: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: BorderRadius.lg,
        padding: hp(6),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AyurvedaColors.mutedSage,
        borderStyle: 'dashed',
        marginBottom: hp(4),
    },
    placeholderText: {
        marginTop: Spacing.md,
        fontSize: rf(16),
        color: AyurvedaColors.textSecondary,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
    },
    backButtonText: {
        marginLeft: Spacing.xs,
        fontSize: rf(16),
        fontWeight: '500',
        color: AyurvedaColors.herbalGreen,
    },
});
