/**
 * AYUSH CARE - Premium Ayurvedic Theme
 * A cohesive, calming color system inspired by herbs, leaves, earth, and wellness.
 */

import { Platform } from 'react-native';

// =============================================================================
// AYURVEDIC COLOR PALETTE
// A layered, natural palette for a premium wellness experience
// =============================================================================

export const AyurvedaColors = {
  // Primary - Deep Herbal Green (headers, primary actions)
  primary: '#3D6B4F',
  primaryLight: '#4A7C59',
  primaryDark: '#2D5A3D',

  // Secondary - Warm Earthy Brown (subtitles, icons, accents)
  secondary: '#8B7355',
  secondaryLight: '#A6896A',
  secondaryDark: '#6B5744',

  // Backgrounds - Soft Sage & Warm Off-White
  backgroundLight: '#F8F6F1',      // Warm off-white (main background)
  backgroundLightAlt: '#F0EDE6',   // Slightly darker for cards
  backgroundSage: '#E8EDE8',       // Soft sage tint
  backgroundDark: '#1A1F1C',       // Dark mode background
  backgroundDarkAlt: '#242A26',    // Dark mode cards

  // Accent - Muted Gold/Beige (highlights and emphasis)
  accent: '#C4A962',
  accentLight: '#D4BE7A',
  accentMuted: '#B8A87A',

  // Gradients
  gradientStart: '#7CB87C',        // Soft green
  gradientMid: '#A8C5A8',          // Muted sage
  gradientEnd: '#FAF8F5',          // Cream off-white

  // Surface colors
  surfaceLight: 'rgba(255, 255, 255, 0.85)',
  surfaceLightMuted: 'rgba(248, 246, 241, 0.9)',
  surfaceDark: 'rgba(36, 42, 38, 0.9)',

  // Text colors
  textPrimary: '#2D3B30',          // Deep forest for headings
  textSecondary: '#5A6B5E',        // Muted green for body
  textMuted: '#8B9A8E',            // Light muted for captions
  textDark: '#E8EDE8',             // Light text for dark mode
  textDarkMuted: '#A8B5AB',        // Muted text for dark mode

  // Shadows
  shadowColor: '#2D5A3D',

  // Legacy aliases (for backward compatibility)
  herbalGreen: '#4A7C59',
  softGreen: '#7CB87C',
  offWhite: '#FAF8F5',
  mutedSage: '#A8C5A8',
  deepForest: '#2D5A3D',
  creamWhite: '#FFFEF9',
};

// =============================================================================
// THEME COLORS (Light & Dark Mode)
// =============================================================================

const tintColorLight = AyurvedaColors.primary;
const tintColorDark = AyurvedaColors.gradientStart;

export const Colors = {
  light: {
    text: AyurvedaColors.deepForest, // Was textPrimary
    textSecondary: AyurvedaColors.textSecondary,
    textMuted: AyurvedaColors.textMuted,
    background: AyurvedaColors.offWhite, // Was backgroundLight
    backgroundAlt: AyurvedaColors.backgroundLightAlt,
    tint: AyurvedaColors.herbalGreen, // Was tintColorLight (primary)
    icon: AyurvedaColors.secondary,
    tabIconDefault: AyurvedaColors.secondaryLight,
    tabIconSelected: AyurvedaColors.herbalGreen, // Was tintColorLight
    card: AyurvedaColors.surfaceLight,
    border: AyurvedaColors.mutedSage,
    accent: AyurvedaColors.accent,
    link: AyurvedaColors.herbalGreen, // Consistent with tint
    // Header colors for ParallaxScrollView
    headerBackground: AyurvedaColors.gradientStart,
    headerIcon: AyurvedaColors.herbalGreen,
  },
  dark: {
    text: AyurvedaColors.textDark,
    textSecondary: AyurvedaColors.textDarkMuted,
    textMuted: '#6B7A6E',
    background: AyurvedaColors.backgroundDark,
    backgroundAlt: AyurvedaColors.backgroundDarkAlt,
    tint: tintColorDark,
    icon: AyurvedaColors.mutedSage,
    tabIconDefault: AyurvedaColors.textDarkMuted,
    tabIconSelected: tintColorDark,
    card: AyurvedaColors.surfaceDark,
    border: '#3D4A40',
    accent: AyurvedaColors.accentMuted,
    link: AyurvedaColors.gradientStart,
    // Header colors for ParallaxScrollView
    headerBackground: '#2D3B30',
    headerIcon: AyurvedaColors.gradientStart,
  },
};

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// =============================================================================
// SHADOWS
// =============================================================================

export const Shadows = {
  light: {
    card: {
      shadowColor: AyurvedaColors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    elevated: {
      shadowColor: AyurvedaColors.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
  },
  dark: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 3,
    },
    elevated: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};
