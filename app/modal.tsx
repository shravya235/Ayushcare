import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AyurvedaColors, BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { rf, wpDirect } from '@/utils/responsive';

export default function ModalScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${Colors[colorScheme].tint}15` },
        ]}>
        <MaterialCommunityIcons
          name="information"
          size={wpDirect(40)}
          color={Colors[colorScheme].tint}
        />
      </View>

      {/* Content */}
      <ThemedText type="title" style={styles.title}>
        About AYUSH CARE
      </ThemedText>

      <ThemedText style={styles.description}>
        A modern approach to ancient Ayurvedic wisdom. This app brings
        traditional healing practices to your fingertips.
      </ThemedText>

      {/* Link */}
      <Link href="/" dismissTo style={styles.link}>
        <View
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].tint },
          ]}>
          <MaterialCommunityIcons
            name="home"
            size={wpDirect(20)}
            color={AyurvedaColors.backgroundLight}
          />
          <ThemedText
            style={styles.buttonText}
            lightColor={AyurvedaColors.backgroundLight}
            darkColor={AyurvedaColors.backgroundLight}>
            Go to Home
          </ThemedText>
        </View>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    width: wpDirect(80),
    height: wpDirect(80),
    borderRadius: wpDirect(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  description: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: rf(26),
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
    fontSize: rf(16),
    fontWeight: '600',
  },
});
