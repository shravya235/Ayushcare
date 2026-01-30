import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.heading,
          {
            backgroundColor: Colors[colorScheme].backgroundAlt,
            borderColor: Colors[colorScheme].border,
          },
        ]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.7}>
        <IconSymbol
          name="chevron.right"
          size={16}
          weight="medium"
          color={Colors[colorScheme].icon}
          style={[
            styles.chevron,
            { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] },
          ]}
        />
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && (
        <ThemedView
          style={[
            styles.content,
            { borderColor: Colors[colorScheme].border },
          ]}>
          {children}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  chevron: {
    width: 20,
  },
  title: {
    flex: 1,
  },
  content: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.lg,
    paddingLeft: Spacing.md,
    borderLeftWidth: 2,
    paddingVertical: Spacing.sm,
  },
});
