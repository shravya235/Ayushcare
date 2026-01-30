import { AyurvedaColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { hp, rf, wp, wpDirect } from '@/utils/responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
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
// TYPES
// =============================================================================
type UserRole = 'patient' | 'practitioner';

// =============================================================================
// ANIMATION CONFIGURATION
// =============================================================================
const ANIMATION_CONFIG = {
    fadeInDuration: 500,
    staggerDelay: 100,
    scaleSelectedDuration: 200,
    buttonPressDuration: 100,
};

// =============================================================================
// LOGIN SCREEN COMPONENT
// =============================================================================
export default function LoginScreen() {
    // State
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Animation values - Screen fade in
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const headerTranslateY = useRef(new Animated.Value(-20)).current;
    const roleCardsOpacity = useRef(new Animated.Value(0)).current;
    const roleCardsTranslateY = useRef(new Animated.Value(20)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslateY = useRef(new Animated.Value(20)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    // Role card scale animations
    const patientScale = useRef(new Animated.Value(1)).current;
    const practitionerScale = useRef(new Animated.Value(1)).current;

    // Button press animation
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
            // Role cards
            Animated.delay(ANIMATION_CONFIG.staggerDelay),
            Animated.parallel([
                Animated.timing(roleCardsOpacity, {
                    toValue: 1,
                    duration: ANIMATION_CONFIG.fadeInDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
                Animated.timing(roleCardsTranslateY, {
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
    // ROLE SELECTION HANDLERS
    // ==========================================================================
    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);

        // Animate selected card
        const targetScale = role === 'patient' ? patientScale : practitionerScale;
        const otherScale = role === 'patient' ? practitionerScale : patientScale;

        Animated.parallel([
            Animated.sequence([
                Animated.timing(targetScale, {
                    toValue: 0.95,
                    duration: ANIMATION_CONFIG.scaleSelectedDuration / 2,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
                Animated.timing(targetScale, {
                    toValue: 1.02,
                    duration: ANIMATION_CONFIG.scaleSelectedDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(otherScale, {
                toValue: 1,
                duration: ANIMATION_CONFIG.scaleSelectedDuration,
                easing: smoothEasing,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // ==========================================================================
    // LOGIN HANDLER
    // ==========================================================================
    const handleLogin = async () => {
        if (!selectedRole || !email || !password) {
            // Validation error
            alert('Please fill in all fields and select a role.');
            return;
        }

        // Animate button press
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

        setIsLoading(true);

        // TODO: Implement Firebase Authentication
        // ---------------------------------------------------------------------
        // Replace the mock logic below with Firebase Auth:
        //
        // import { signInWithEmailAndPassword } from 'firebase/auth';
        // import { auth } from '@/config/firebase';
        //
        // try {
        //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
        //   const user = userCredential.user;
        //   
        //   // TODO: Fetch user role from Firestore and validate against selectedRole
        //   // const userDoc = await getDoc(doc(db, 'users', user.uid));
        //   // const userData = userDoc.data();
        //   // if (userData?.role !== selectedRole) {
        //   //   throw new Error('Role mismatch');
        //   // }
        //   
        //   // Navigate based on role
        //   if (selectedRole === 'patient') {
        //     router.replace('/patient-dashboard');
        //   } else {
        //     router.replace('/practitioner-dashboard');
        //   }
        // } catch (error) {
        //   // TODO: Handle authentication errors
        //   console.error('Login error:', error);
        // }
        // ---------------------------------------------------------------------

        // MOCK LOGIN LOGIC - Remove when implementing Firebase
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);

        // Navigate based on selected role
        if (selectedRole === 'patient') {
            // TODO: Replace with actual patient dashboard route
            router.replace('/(tabs)');
        } else {
            // TODO: Replace with actual practitioner dashboard route
            router.replace('/(tabs)');
        }
    };

    // ==========================================================================
    // RENDER
    // ==========================================================================
    return (
        <LinearGradient
            colors={[AyurvedaColors.softGreen, AyurvedaColors.mutedSage, AyurvedaColors.offWhite]}
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
                            {/* Logo - Same as Splash Screen */}
                            <View style={styles.logoContainer}>
                                <MaterialCommunityIcons
                                    name="leaf"
                                    size={60}
                                    color={AyurvedaColors.herbalGreen}
                                />
                            </View>

                            {/* Title */}
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>
                                Login to continue your Ayurvedic journey
                            </Text>
                        </Animated.View>

                        {/* ===================================================== */}
                        {/* ROLE SELECTOR SECTION */}
                        {/* ===================================================== */}
                        <Animated.View
                            style={[
                                styles.roleSelectorSection,
                                {
                                    opacity: roleCardsOpacity,
                                    transform: [{ translateY: roleCardsTranslateY }],
                                },
                            ]}
                        >
                            <Text style={styles.sectionLabel}>I am a</Text>
                            <View style={styles.roleCardsContainer}>
                                {/* Patient Role Card */}
                                <Animated.View
                                    style={[
                                        styles.roleCardWrapper,
                                        { transform: [{ scale: patientScale }] },
                                    ]}
                                >
                                    <Pressable
                                        onPress={() => handleRoleSelect('patient')}
                                        style={[
                                            styles.roleCard,
                                            selectedRole === 'patient' && styles.roleCardSelected,
                                        ]}
                                    >
                                        <View style={[
                                            styles.roleIconContainer,
                                            selectedRole === 'patient' && styles.roleIconContainerSelected,
                                        ]}>
                                            <MaterialCommunityIcons
                                                name="account-heart"
                                                size={36}
                                                color={selectedRole === 'patient'
                                                    ? AyurvedaColors.offWhite
                                                    : AyurvedaColors.herbalGreen
                                                }
                                            />
                                            <MaterialCommunityIcons
                                                name="leaf"
                                                size={16}
                                                color={selectedRole === 'patient'
                                                    ? AyurvedaColors.accent
                                                    : AyurvedaColors.softGreen
                                                }
                                                style={styles.roleLeafIcon}
                                            />
                                        </View>
                                        <Text style={[
                                            styles.roleCardTitle,
                                            selectedRole === 'patient' && styles.roleCardTitleSelected,
                                        ]}>
                                            Patient
                                        </Text>
                                        <Text style={[
                                            styles.roleCardSubtitle,
                                            selectedRole === 'patient' && styles.roleCardSubtitleSelected,
                                        ]}>
                                            Seek wellness guidance
                                        </Text>
                                    </Pressable>
                                </Animated.View>

                                {/* Practitioner Role Card */}
                                <Animated.View
                                    style={[
                                        styles.roleCardWrapper,
                                        { transform: [{ scale: practitionerScale }] },
                                    ]}
                                >
                                    <Pressable
                                        onPress={() => handleRoleSelect('practitioner')}
                                        style={[
                                            styles.roleCard,
                                            selectedRole === 'practitioner' && styles.roleCardSelected,
                                        ]}
                                    >
                                        <View style={[
                                            styles.roleIconContainer,
                                            selectedRole === 'practitioner' && styles.roleIconContainerSelected,
                                        ]}>
                                            <MaterialCommunityIcons
                                                name="stethoscope"
                                                size={36}
                                                color={selectedRole === 'practitioner'
                                                    ? AyurvedaColors.offWhite
                                                    : AyurvedaColors.herbalGreen
                                                }
                                            />
                                            <MaterialCommunityIcons
                                                name="leaf"
                                                size={16}
                                                color={selectedRole === 'practitioner'
                                                    ? AyurvedaColors.accent
                                                    : AyurvedaColors.softGreen
                                                }
                                                style={styles.roleLeafIcon}
                                            />
                                        </View>
                                        <Text style={[
                                            styles.roleCardTitle,
                                            selectedRole === 'practitioner' && styles.roleCardTitleSelected,
                                        ]}>
                                            Practitioner
                                        </Text>
                                        <Text style={[
                                            styles.roleCardSubtitle,
                                            selectedRole === 'practitioner' && styles.roleCardSubtitleSelected,
                                        ]}>
                                            Provide healing care
                                        </Text>
                                    </Pressable>
                                </Animated.View>
                            </View>
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
                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    size={22}
                                    color={AyurvedaColors.secondary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email address"
                                    placeholderTextColor={AyurvedaColors.textMuted}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons
                                    name="lock-outline"
                                    size={22}
                                    color={AyurvedaColors.secondary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={AyurvedaColors.textMuted}
                                    value={password}
                                    onChangeText={setPassword}
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
                                        color={AyurvedaColors.secondary}
                                    />
                                </Pressable>
                            </View>

                            {/* Forgot Password Link */}
                            <Pressable style={styles.forgotPasswordContainer}>
                                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                            </Pressable>
                        </Animated.View>

                        {/* ===================================================== */}
                        {/* LOGIN BUTTON */}
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
                                onPress={handleLogin}
                                disabled={isLoading || !selectedRole || !email || !password}
                                style={({ pressed }) => [
                                    styles.loginButton,
                                    (!selectedRole || !email || !password) && styles.loginButtonDisabled,
                                    pressed && styles.loginButtonPressed,
                                ]}
                            >
                                <LinearGradient
                                    colors={
                                        (!selectedRole || !email || !password)
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
                                            <Text style={styles.loginButtonText}>Login</Text>
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
                        {/* REGISTER LINK */}
                        {/* ===================================================== */}
                        <Animated.View style={[styles.registerSection, { opacity: buttonOpacity }]}>
                            <Text style={styles.registerText}>Don't have an account? </Text>
                            <Pressable onPress={() => router.push('/register')}>
                                <Text style={styles.registerLink}>Create one</Text>
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
        paddingHorizontal: wp(6),
        paddingVertical: hp(4),
        justifyContent: 'center',
    },

    // Header Section
    headerSection: {
        alignItems: 'center',
        marginBottom: hp(4),
    },
    logoContainer: {
        width: wpDirect(100),
        height: wpDirect(100),
        borderRadius: wpDirect(50),
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(3),
        shadowColor: AyurvedaColors.deepForest,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: rf(32),
        fontWeight: '700',
        color: AyurvedaColors.deepForest,
        letterSpacing: 0.5,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: rf(16),
        fontWeight: '400',
        color: AyurvedaColors.secondary,
        textAlign: 'center',
        lineHeight: rf(22),
    },

    // Role Selector Section
    roleSelectorSection: {
        marginBottom: hp(4),
    },
    sectionLabel: {
        fontSize: rf(14),
        fontWeight: '600',
        color: AyurvedaColors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: Spacing.sm,
        marginLeft: Spacing.xs,
    },
    roleCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    roleCardWrapper: {
        flex: 1,
    },
    roleCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: BorderRadius.lg,
        padding: wp(5),
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        ...Shadows.light.card,
    },
    roleCardSelected: {
        backgroundColor: AyurvedaColors.primary,
        borderColor: AyurvedaColors.deepForest,
        ...Shadows.light.elevated,
    },
    roleIconContainer: {
        width: wpDirect(70),
        height: wpDirect(70),
        borderRadius: wpDirect(35),
        backgroundColor: 'rgba(74, 124, 89, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        position: 'relative',
    },
    roleIconContainerSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    roleLeafIcon: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    roleCardTitle: {
        fontSize: rf(16),
        fontWeight: '600',
        color: AyurvedaColors.deepForest,
        marginBottom: 4,
    },
    roleCardTitleSelected: {
        color: AyurvedaColors.offWhite,
    },
    roleCardSubtitle: {
        fontSize: rf(12),
        color: AyurvedaColors.textMuted,
        textAlign: 'center',
    },
    roleCardSubtitleSelected: {
        color: 'rgba(255, 255, 255, 0.8)',
    },

    // Form Section
    formSection: {
        marginBottom: hp(3),
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
        paddingVertical: Spacing.md + 2,
        fontSize: rf(16),
        color: AyurvedaColors.textPrimary,
    },
    passwordToggle: {
        padding: Spacing.xs,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: Spacing.xs,
    },
    forgotPasswordText: {
        fontSize: rf(14),
        color: AyurvedaColors.herbalGreen,
        fontWeight: '500',
    },

    // Button Section
    buttonSection: {
        marginBottom: hp(3),
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
        opacity: 0.9,
    },
    loginButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(2),
        paddingHorizontal: Spacing.xl,
    },
    loginButtonText: {
        fontSize: rf(18),
        fontWeight: '600',
        color: AyurvedaColors.offWhite,
        letterSpacing: 0.5,
    },
    loginButtonIcon: {
        marginLeft: Spacing.sm,
    },

    // Register Section
    registerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    registerText: {
        fontSize: rf(14),
        color: AyurvedaColors.textSecondary,
    },
    registerLink: {
        fontSize: rf(14),
        fontWeight: '600',
        color: AyurvedaColors.herbalGreen,
    },

    // Bottom Decoration
    bottomDecoration: {
        alignItems: 'center',
        marginTop: Spacing.md,
        opacity: 0.5,
    },
});
