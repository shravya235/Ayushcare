import { AyurvedaColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Easing,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

// =============================================================================
// ANIMATION CONFIGURATION
// =============================================================================
const ANIMATION_CONFIG = {
    fadeInDuration: 500,
    staggerDelay: 100,
    buttonPressDuration: 100,
};

type Step = 'email' | 'reset';

// =============================================================================
// FORGOT PASSWORD SCREEN COMPONENT
// =============================================================================
export default function ForgotPasswordScreen() {
    // State
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const router = useRouter();

    // Animation values
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const headerTranslateY = useRef(new Animated.Value(-20)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslateY = useRef(new Animated.Value(20)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    // Easing functions
    const smoothEasing = Easing.out(Easing.cubic);

    // ==========================================================================
    // ENTRANCE ANIMATION
    // ==========================================================================
    useEffect(() => {
        const entranceAnimation = Animated.sequence([
            // Fade in screen
            Animated.parallel([
                Animated.timing(screenOpacity, {
                    toValue: 1,
                    duration: ANIMATION_CONFIG.fadeInDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
                Animated.timing(headerTranslateY, {
                    toValue: 0,
                    duration: ANIMATION_CONFIG.fadeInDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
            ]),
            // Form fields
            Animated.delay(ANIMATION_CONFIG.staggerDelay),
            Animated.parallel([
                Animated.timing(formOpacity, {
                    toValue: 1,
                    duration: ANIMATION_CONFIG.fadeInDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
                Animated.timing(formTranslateY, {
                    toValue: 0,
                    duration: ANIMATION_CONFIG.fadeInDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
            ]),
            // Button
            Animated.delay(ANIMATION_CONFIG.staggerDelay),
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: ANIMATION_CONFIG.fadeInDuration,
                easing: smoothEasing,
                useNativeDriver: true,
            }),
        ]);

        entranceAnimation.start();

        return () => entranceAnimation.stop();
    }, []);

    // ==========================================================================
    // HANDLERS
    // ==========================================================================
    const handleSendCode = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        animateButton();
        setIsLoading(true);

        // MOCK SEND CODE LOGIC
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setStep('reset');

        // Reset form position animation for the new step to create a subtle transition effect
        formOpacity.setValue(0);
        formTranslateY.setValue(20);

        Animated.parallel([
            Animated.timing(formOpacity, {
                toValue: 1,
                duration: ANIMATION_CONFIG.fadeInDuration,
                easing: smoothEasing,
                useNativeDriver: true,
            }),
            Animated.timing(formTranslateY, {
                toValue: 0,
                duration: ANIMATION_CONFIG.fadeInDuration,
                easing: smoothEasing,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmNewPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit code.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        animateButton();
        setIsLoading(true);

        // MOCK PASSWORD RESET LOGIC
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);

        Alert.alert('Success', 'Your password has been reset successfully.');
        router.replace('/login');
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.96,
                duration: ANIMATION_CONFIG.buttonPressDuration,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: ANIMATION_CONFIG.buttonPressDuration,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const isButtonDisabled = () => {
        if (step === 'email') return !email;
        if (step === 'reset') return otp.length !== 6 || !newPassword || !confirmNewPassword;
        return false;
    };

    const getButtonText = () => {
        if (step === 'email') return 'Send Code';
        return 'Reset Password';
    };

    const handleBack = () => {
        if (step === 'reset') setStep('email');
        else router.back();
    };

    // ==========================================================================
    // RENDER
    // ==========================================================================
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
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View
                        style={[
                            styles.container,
                            { opacity: screenOpacity },
                        ]}
                    >
                        {/* ===================================================== */}
                        {/* HEADER SECTION */}
                        {/* ===================================================== */}
                        <Animated.View
                            style={[
                                styles.headerSection,
                                { transform: [{ translateY: headerTranslateY }] },
                            ]}
                        >
                            {/* Logo */}
                            <View style={styles.logoContainer}>
                                <MaterialCommunityIcons
                                    name={step === 'email' ? "lock-reset" : "shield-key"}
                                    size={60}
                                    color={AyurvedaColors.herbalGreen}
                                />
                            </View>

                            {/* Title */}
                            <Text style={[styles.title, isDark && { color: AyurvedaColors.textDark }]}>
                                {step === 'email' ? 'Forgot Password?' : 'Reset Password'}
                            </Text>
                            <Text style={[styles.subtitle, isDark && { color: AyurvedaColors.textDarkMuted }]}>
                                {step === 'email'
                                    ? 'Enter your email to receive a reset code'
                                    : `Enter code sent to ${email} and set your new password`
                                }
                            </Text>
                        </Animated.View>

                        {/* ===================================================== */}
                        {/* FORM SECTION */}
                        {/* ===================================================== */}
                        <Animated.View
                            style={[
                                styles.formSection,
                                {
                                    opacity: formOpacity,
                                    transform: [{ translateY: formTranslateY }],
                                },
                            ]}
                        >
                            {step === 'email' && (
                                <View style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                    <MaterialCommunityIcons
                                        name="email-outline"
                                        size={22}
                                        color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary}
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={[styles.input, isDark && { color: AyurvedaColors.textDark }]}
                                        placeholder="Email address"
                                        placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textMuted}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>
                            )}

                            {step === 'reset' && (
                                <>
                                    {/* OTP Input */}
                                    <View style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                        <MaterialCommunityIcons
                                            name="numeric"
                                            size={22}
                                            color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary}
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={[styles.input, styles.otpInput, isDark && { color: AyurvedaColors.textDark }]}
                                            placeholder="000000"
                                            placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textMuted}
                                            value={otp}
                                            onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))}
                                            keyboardType="number-pad"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            maxLength={6}
                                        />
                                    </View>

                                    {/* New Password */}
                                    <View style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                        <MaterialCommunityIcons
                                            name="lock-outline"
                                            size={22}
                                            color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary}
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={[styles.input, isDark && { color: AyurvedaColors.textDark }]}
                                            placeholder="New Password"
                                            placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textMuted}
                                            value={newPassword}
                                            onChangeText={setNewPassword}
                                            secureTextEntry={!isPasswordVisible}
                                            autoCapitalize="none"
                                        />
                                        <Pressable
                                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                            style={styles.passwordToggle}
                                        >
                                            <MaterialCommunityIcons
                                                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                                size={22}
                                                color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary}
                                            />
                                        </Pressable>
                                    </View>

                                    {/* Confirm Password */}
                                    <View style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondary }]}>
                                        <MaterialCommunityIcons
                                            name="lock-check-outline"
                                            size={22}
                                            color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary}
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={[styles.input, isDark && { color: AyurvedaColors.textDark }]}
                                            placeholder="Confirm Password"
                                            placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.textMuted}
                                            value={confirmNewPassword}
                                            onChangeText={setConfirmNewPassword}
                                            secureTextEntry={!isConfirmPasswordVisible}
                                            autoCapitalize="none"
                                        />
                                        <Pressable
                                            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                            style={styles.passwordToggle}
                                        >
                                            <MaterialCommunityIcons
                                                name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                                size={22}
                                                color={isDark ? AyurvedaColors.textDarkMuted : AyurvedaColors.secondary}
                                            />
                                        </Pressable>
                                    </View>
                                </>
                            )}
                        </Animated.View>

                        {/* ===================================================== */}
                        {/* BUTTON SECTION */}
                        {/* ===================================================== */}
                        <Animated.View
                            style={[
                                styles.buttonSection,
                                {
                                    opacity: buttonOpacity,
                                    transform: [{ scale: buttonScale }],
                                },
                            ]}
                        >
                            <Pressable
                                onPress={() => {
                                    if (step === 'email') handleSendCode();
                                    else handleResetPassword();
                                }}
                                disabled={isLoading || isButtonDisabled()}
                                style={({ pressed }) => [
                                    styles.loginButton,
                                    isDark && { backgroundColor: AyurvedaColors.primaryDark },
                                    isButtonDisabled() && styles.loginButtonDisabled,
                                    pressed && styles.loginButtonPressed,
                                ]}
                            >
                                <LinearGradient
                                    colors={
                                        isButtonDisabled()
                                            ? [AyurvedaColors.mutedSage, AyurvedaColors.mutedSage]
                                            : [AyurvedaColors.primary, AyurvedaColors.herbalGreen]
                                    }
                                    style={styles.loginButtonGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    {isLoading ? (
                                        <MaterialCommunityIcons
                                            name="loading"
                                            size={24}
                                            color={AyurvedaColors.offWhite}
                                        />
                                    ) : (
                                        <>
                                            <Text style={[styles.loginButtonText, isDark && { color: AyurvedaColors.textDark }]}>
                                                {getButtonText()}
                                            </Text>
                                            <MaterialCommunityIcons
                                                name="arrow-right"
                                                size={20}
                                                color={AyurvedaColors.offWhite}
                                                style={styles.loginButtonIcon}
                                            />
                                        </>
                                    )}
                                </LinearGradient>
                            </Pressable>
                        </Animated.View>

                        {/* ===================================================== */}
                        {/* NAVIGATION LINK */}
                        {/* ===================================================== */}
                        <Animated.View style={[styles.loginSection, { opacity: buttonOpacity }]}>
                            <Pressable onPress={handleBack}>
                                <Text style={[styles.loginLink, isDark && { color: AyurvedaColors.primaryLight }]}>
                                    {step === 'email' ? 'Back to Login' : 'Back'}
                                </Text>
                            </Pressable>
                        </Animated.View>

                        {/* Bottom Decorative Element */}
                        <View style={styles.bottomDecoration}>
                            <MaterialCommunityIcons
                                name="flower-tulip-outline"
                                size={24}
                                color={AyurvedaColors.mutedSage}
                            />
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

// =============================================================================
// STYLES
// =============================================================================
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        justifyContent: 'center',
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
    },

    // Header Section
    headerSection: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
        shadowColor: AyurvedaColors.deepForest,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: AyurvedaColors.deepForest,
        letterSpacing: 0.5,
        marginBottom: Spacing.xs,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: AyurvedaColors.secondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: Spacing.lg,
    },

    // Form Section
    formSection: {
        marginBottom: Spacing.lg,
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(168, 197, 168, 0.4)',
        ...Shadows.light.card,
    },
    inputIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: Spacing.md,
        fontSize: 16,
        color: AyurvedaColors.textPrimary,
    },
    otpInput: {
        letterSpacing: 8,
        fontSize: 24,
        textAlign: 'center',
    },
    passwordToggle: {
        padding: Spacing.xs,
    },

    // Button Section
    buttonSection: {
        marginBottom: Spacing.lg,
        marginTop: Spacing.md,
    },
    loginButton: {
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        ...Shadows.light.elevated,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonPressed: {
        transform: [{ scale: 0.98 }],
    },
    loginButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: AyurvedaColors.offWhite,
        letterSpacing: 0.5,
    },
    loginButtonIcon: {
        marginLeft: Spacing.sm,
    },

    // Link Section
    loginSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.sm,
        marginBottom: Spacing.xl,
    },
    loginLink: {
        fontSize: 16,
        fontWeight: '600',
        color: AyurvedaColors.primary,
    },

    // Bottom Decoration
    bottomDecoration: {
        alignItems: 'center',
        marginTop: Spacing.md,
        opacity: 0.5,
    },
});
