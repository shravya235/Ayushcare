import { AyurvedaColors } from '@/constants/theme';
import { hp, rf, wpDirect } from '@/utils/responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    View
} from 'react-native';

// Animation timing constants
const ANIMATION_CONFIG = {
    backgroundFadeDuration: 400,
    logoAnimationDuration: 600,
    titleFadeDuration: 400,
    taglineFadeDuration: 400,
    logoSlideDistance: hp(3.5),
    taglineSlideDistance: hp(1.8),
    staggerDelay: 150,
    navigationDelay: 800, // delay after animations complete
};

export default function SplashScreen() {
    // Background animation
    const backgroundOpacity = useRef(new Animated.Value(0)).current;

    // Logo animations
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.85)).current;
    const logoTranslateY = useRef(new Animated.Value(ANIMATION_CONFIG.logoSlideDistance)).current;

    // Title animation
    const titleOpacity = useRef(new Animated.Value(0)).current;

    // Tagline animations
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const taglineTranslateY = useRef(new Animated.Value(ANIMATION_CONFIG.taglineSlideDistance)).current;

    // Premium easing function - smooth exponential ease out
    const smoothEasing = Easing.out(Easing.exp);
    const gentleEasing = Easing.out(Easing.cubic);

    useEffect(() => {
        // Layered animation sequence
        const animationSequence = Animated.sequence([
            // Phase 1: Background fade-in
            Animated.timing(backgroundOpacity, {
                toValue: 1,
                duration: ANIMATION_CONFIG.backgroundFadeDuration,
                easing: gentleEasing,
                useNativeDriver: true,
            }),

            // Phase 2: Logo appears with slide + scale
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: ANIMATION_CONFIG.logoAnimationDuration,
                    easing: gentleEasing,
                    useNativeDriver: true,
                }),
                Animated.timing(logoScale, {
                    toValue: 1,
                    duration: ANIMATION_CONFIG.logoAnimationDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
                Animated.timing(logoTranslateY, {
                    toValue: 0,
                    duration: ANIMATION_CONFIG.logoAnimationDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
            ]),

            // Phase 3: Title fades in (with slight stagger)
            Animated.delay(ANIMATION_CONFIG.staggerDelay),
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: ANIMATION_CONFIG.titleFadeDuration,
                easing: gentleEasing,
                useNativeDriver: true,
            }),

            // Phase 4: Tagline appears last with subtle slide
            Animated.delay(ANIMATION_CONFIG.staggerDelay),
            Animated.parallel([
                Animated.timing(taglineOpacity, {
                    toValue: 1,
                    duration: ANIMATION_CONFIG.taglineFadeDuration,
                    easing: gentleEasing,
                    useNativeDriver: true,
                }),
                Animated.timing(taglineTranslateY, {
                    toValue: 0,
                    duration: ANIMATION_CONFIG.taglineFadeDuration,
                    easing: smoothEasing,
                    useNativeDriver: true,
                }),
            ]),
        ]);

        // Start animation sequence
        animationSequence.start(() => {
            // Navigate only after animations complete
            setTimeout(() => {
                router.replace('/login');
            }, ANIMATION_CONFIG.navigationDelay);
        });

        return () => {
            animationSequence.stop();
        };
    }, [
        backgroundOpacity,
        logoOpacity,
        logoScale,
        logoTranslateY,
        titleOpacity,
        taglineOpacity,
        taglineTranslateY,
    ]);

    return (
        <Animated.View style={[styles.animatedContainer, { opacity: backgroundOpacity }]}>
            <LinearGradient
                colors={[AyurvedaColors.softGreen, AyurvedaColors.offWhite]}
                style={styles.container}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
                <View style={styles.content}>
                    {/* Animated Logo */}
                    <Animated.View
                        style={[
                            styles.iconContainer,
                            {
                                opacity: logoOpacity,
                                transform: [
                                    { scale: logoScale },
                                    { translateY: logoTranslateY },
                                ],
                            },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="leaf"
                            size={wpDirect(80)}
                            color={AyurvedaColors.herbalGreen}
                        />
                    </Animated.View>

                    {/* Animated App Name */}
                    <Animated.Text
                        style={[
                            styles.appName,
                            { opacity: titleOpacity },
                        ]}
                    >
                        AYUSH CARE
                    </Animated.Text>

                    {/* Animated Tagline */}
                    <Animated.Text
                        style={[
                            styles.tagline,
                            {
                                opacity: taglineOpacity,
                                transform: [{ translateY: taglineTranslateY }],
                            },
                        ]}
                    >
                        Digital Ayurveda Care
                    </Animated.Text>
                </View>
            </LinearGradient>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    animatedContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: wpDirect(120),
        height: wpDirect(120),
        borderRadius: wpDirect(60),
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
    appName: {
        fontSize: rf(36),
        fontWeight: '700',
        color: AyurvedaColors.deepForest,
        letterSpacing: 2,
        marginBottom: hp(1),
    },
    tagline: {
        fontSize: rf(16),
        fontWeight: '300',
        color: AyurvedaColors.herbalGreen,
        letterSpacing: 1,
    },
});
