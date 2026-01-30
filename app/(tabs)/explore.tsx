import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { AyurvedaColors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="compass"
            size={100}
            color={AyurvedaColors.backgroundLight}
            style={styles.headerIcon}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
        <ThemedText type="caption">
          Learn about Ayurvedic practices and principles
        </ThemedText>
      </ThemedView>

      <Collapsible title="What is Ayurveda?">
        <ThemedText>
          Ayurveda is a 5,000-year-old system of natural healing that originated
          in India. It emphasizes the balance of body, mind, and spirit for
          optimal health and well-being.
        </ThemedText>
        <ExternalLink href="https://en.wikipedia.org/wiki/Ayurveda">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="The Three Doshas">
        <ThemedText>
          According to Ayurveda, everyone has a unique constitution determined
          by three fundamental energies called doshas: Vata (air & space), Pitta
          (fire & water), and Kapha (earth & water).
        </ThemedText>
      </Collapsible>

      <Collapsible title="Herbal Remedies">
        <ThemedText>
          Ayurveda uses a wide variety of herbs and natural ingredients for
          healing. Common herbs include Ashwagandha, Turmeric, Tulsi, and Neem,
          each with unique therapeutic properties.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Daily Routines (Dinacharya)">
        <ThemedText>
          Ayurveda emphasizes the importance of daily routines for maintaining
          health. This includes practices like oil pulling, tongue scraping,
          self-massage, and mindful eating.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Diet & Nutrition">
        <ThemedText>
          In Ayurveda, food is medicine. The right diet for you depends on your
          dosha type and current state of balance. Emphasis is placed on fresh,
          seasonal, and locally grown foods.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    opacity: 0.9,
  },
  titleContainer: {
    marginBottom: Spacing.lg,
  },
});
