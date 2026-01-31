import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AyurvedaColors, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export default function ModalScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}>
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : `${AyurvedaColors.primary}15` },
        ]}>
        <MaterialCommunityIcons
          name="information"
          size={40}
          color={isDark ? AyurvedaColors.accent : AyurvedaColors.primary}
        />
      </View>

      {/* Content */}
      <Text style={[styles.title, isDark && { color: AyurvedaColors.textDark }]}>
        About AYUSH CARE
      </Text>

      <Text style={[styles.description, isDark && { color: AyurvedaColors.textDarkMuted }]}>
        A modern approach to ancient Ayurvedic wisdom. This app brings
        traditional healing practices to your fingertips.
      </Text>

      {/* Link */}
      <Link href="/" dismissTo style={styles.link}>
        <View
          style={[
            styles.button,
            { backgroundColor: isDark ? AyurvedaColors.primary : AyurvedaColors.primary },
          ]}>
          <MaterialCommunityIcons
            name="home"
            size={20}
            color={AyurvedaColors.backgroundLight}
          />
          <Text
            style={[styles.buttonText, { color: AyurvedaColors.backgroundLight }]}>
            Go to Home
          </Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    backgroundColor: AyurvedaColors.backgroundLight,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.md,
    color: AyurvedaColors.textPrimary,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 26,
    color: AyurvedaColors.textSecondary,
  },
  link: {
    marginTop: Spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
