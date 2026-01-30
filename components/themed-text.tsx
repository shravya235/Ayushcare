import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { rf } from '@/utils/responsive';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Get link color from theme
  const linkColor = Colors[colorScheme].link;
  const mutedColor = Colors[colorScheme].textMuted;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? [styles.link, { color: linkColor }] : undefined,
        type === 'caption' ? [styles.caption, { color: mutedColor }] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: rf(16),
    lineHeight: rf(26),
    letterSpacing: 0.2,
  },
  defaultSemiBold: {
    fontSize: rf(16),
    lineHeight: rf(26),
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  title: {
    fontSize: rf(32),
    fontWeight: '700',
    lineHeight: rf(40),
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: rf(20),
    fontWeight: '600',
    lineHeight: rf(28),
    letterSpacing: 0.15,
  },
  link: {
    fontSize: rf(16),
    lineHeight: rf(26),
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  caption: {
    fontSize: rf(14),
    lineHeight: rf(20),
    letterSpacing: 0.25,
  },
});
