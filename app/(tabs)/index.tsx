import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AyurvedaColors, Spacing } from '@/constants/theme';
import { rf } from '@/utils/responsive';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.text}>Yet to be implemented</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  text: {
    color: AyurvedaColors.deepForest,
    textAlign: 'center',
    fontSize: rf(20),
  },
});
