import { View, type ViewProps } from 'react-native';

import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'card' | 'elevated';
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  ...otherProps
}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const cardColor = Colors[colorScheme].card;
  const shadows = Shadows[colorScheme];

  const variantStyles = {
    default: { backgroundColor },
    card: {
      backgroundColor: cardColor,
      borderRadius: BorderRadius.md,
      ...shadows.card,
    },
    elevated: {
      backgroundColor: cardColor,
      borderRadius: BorderRadius.lg,
      ...shadows.elevated,
    },
  };

  return <View style={[variantStyles[variant], style]} {...otherProps} />;
}
