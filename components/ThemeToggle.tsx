import { AyurvedaColors, Shadows } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ThemeToggle({ absolutePosition = true }: { absolutePosition?: boolean }) {
    const { theme, toggleTheme } = useTheme();
    const insets = useSafeAreaInsets();

    // Animation values
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Rotate animation when theme changes
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(rotateAnim, {
                    toValue: theme === 'dark' ? 1 : 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [theme]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={[
            absolutePosition ? styles.containerAbsolute : styles.containerRelative,
            absolutePosition && { top: insets.top + 10 }
        ]}>
            <Pressable
                onPress={toggleTheme}
                style={({ pressed }) => [
                    styles.button,
                    theme === 'dark' ? styles.buttonDark : styles.buttonLight,
                    pressed && styles.pressed
                ]}
            >
                <Animated.View style={{ transform: [{ scale: scaleAnim }, { rotate: spin }] }}>
                    <MaterialCommunityIcons
                        name={theme === 'dark' ? 'moon-waxing-crescent' : 'white-balance-sunny'}
                        size={20}
                        color={theme === 'dark' ? AyurvedaColors.primaryLight : AyurvedaColors.accent}
                    />
                </Animated.View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAbsolute: {
        position: 'absolute',
        right: 20,
        zIndex: 999,
    },
    containerRelative: {
        // No positioning
    },
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.light.card,
    },
    buttonLight: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    buttonDark: {
        backgroundColor: 'rgba(46, 48, 47, 0.9)', // Soft grey based on theme
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.95 }],
    },
});
