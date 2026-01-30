import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AyurvedaColors, Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <MaterialCommunityIcons
              name="leaf-circle"
              size={80}
              color={AyurvedaColors.backgroundLight}
            />
          </View>
          <ThemedText
            style={styles.headerTitle}
            lightColor={AyurvedaColors.backgroundLight}
            darkColor={AyurvedaColors.textDark}>
            AYUSH CARE
          </ThemedText>
        </View>
      }>
      {/* Welcome Section */}
      <ThemedView style={styles.welcomeContainer}>
        <ThemedText type="title">Welcome</ThemedText>
        <ThemedText type="caption">Your journey to holistic wellness begins here</ThemedText>
      </ThemedView>

      {/* Feature Cards */}
      <ThemedView variant="card" style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="spa"
            size={24}
            color={Colors[colorScheme].tint}
          />
          <ThemedText type="subtitle">Ayurvedic Wellness</ThemedText>
        </View>
        <ThemedText>
          Discover personalized health recommendations based on ancient Ayurvedic
          principles combined with modern technology.
        </ThemedText>
      </ThemedView>

      <ThemedView variant="card" style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="medical-bag"
            size={24}
            color={Colors[colorScheme].tint}
          />
          <ThemedText type="subtitle">Natural Remedies</ThemedText>
        </View>
        <ThemedText>
          Access a comprehensive database of herbal treatments, natural remedies,
          and traditional healing practices.
        </ThemedText>
      </ThemedView>

      <ThemedView variant="card" style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="account-heart"
            size={24}
            color={Colors[colorScheme].tint}
          />
          <ThemedText type="subtitle">Personalized Care</ThemedText>
        </View>
        <ThemedText>
          Get customized wellness plans tailored to your unique constitution and
          health goals.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  headerIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 3,
  },
  welcomeContainer: {
    marginBottom: Spacing.lg,
  },
  card: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
});
