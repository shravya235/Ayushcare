import { AyurvedaColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Results() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (params.results) {
      try {
        setResults(JSON.parse(params.results as string));
      } catch (e) {
        console.error('Error parsing results:', e);
      }
    } else {
      // Fallback or default values for demo
      setResults({ vata: 45, pitta: 35, kapha: 20 });
    }
  }, [params.results]);

  const doshaResults = results ? [
    { name: 'Vata', percentage: results.vata || 0, color: '#93C5FD' },
    { name: 'Pitta', percentage: results.pitta || 0, color: '#FCA5A5' },
    { name: 'Kapha', percentage: results.kapha || 0, color: '#86EFAC' },
  ] : [];

  const dominantDosha = results ? Object.entries(results).reduce((a, b) => (b[1] as number) > (a[1] as number) ? b : a)[0] : 'vata';
  const dominantDoshaDisplay = dominantDosha.charAt(0).toUpperCase() + dominantDosha.slice(1);

  const dominantDescriptions: Record<string, string> = {
    vata: 'Vata types are energetic, creative, and flexible. You tend to be quick-thinking and enthusiastic but may experience anxiety when imbalanced.',
    pitta: 'Pitta types are intelligent, focused, and ambitious. You have strong digestion and leadership qualities but may be prone to anger or overheating.',
    kapha: 'Kapha types are calm, grounded, and affectionate. You have good stamina and strong immunity but may struggle with lethargy or attachment.'
  };

  return (
    <LinearGradient
      colors={isDark 
        ? [AyurvedaColors.backgroundDark, AyurvedaColors.backgroundDark] as const
        : ['#C5B4E3', '#D9CEE8', '#E8DFF0', '#F4F1F8'] as const
      }
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/(tabs)/patient/dashboard' as any)}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? AyurvedaColors.textDark : "#2C3E50"} />
          </TouchableOpacity>

          <Text style={[styles.title, isDark && { color: AyurvedaColors.textDark }]}>Your Dosha Analysis</Text>
          <Text style={[styles.subtitle, isDark && { color: AyurvedaColors.textDarkMuted }]}>
            Based on your assessment results
          </Text>

          {/* Last Assessment Date */}
          <View style={[styles.dateCard, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt }]}>
            <Ionicons name="calendar-outline" size={20} color={isDark ? AyurvedaColors.accent : "#5A8F69"} />
            <Text style={[styles.dateText, isDark && { color: AyurvedaColors.textDark }]}>Last assessed: {new Date().toLocaleDateString()}</Text>
          </View>

          {/* Dosha Results */}
          <View style={[styles.resultsCard, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, shadowColor: '#000' }]}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Your Dosha Constitution</Text>

            {doshaResults.map((dosha) => (
              <View key={dosha.name} style={styles.doshaRow}>
                <View style={styles.doshaInfo}>
                  <Text style={[styles.doshaName, isDark && { color: AyurvedaColors.textDark }]}>{dosha.name}</Text>
                  <Text style={[styles.doshaPercentage, isDark && { color: AyurvedaColors.textDark }]}>{dosha.percentage}%</Text>
                </View>
                <View style={[styles.progressBarContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${dosha.percentage}%`, backgroundColor: dosha.color }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Dominant Dosha Card */}
          <View style={[
            styles.dominantCard,
            isDark && { backgroundColor: 'rgba(255, 215, 0, 0.1)', borderColor: '#FFD700' }
          ]}>
            <View style={styles.dominantHeader}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={[styles.dominantTitle, isDark && { color: AyurvedaColors.textDark }]}>Your Dominant Dosha</Text>
            </View>
            <Text style={[styles.dominantDosha, isDark && { color: AyurvedaColors.accentLight }]}>{dominantDoshaDisplay}</Text>
            <Text style={[styles.dominantDescription, isDark && { color: AyurvedaColors.textDarkMuted }]}>
              {dominantDescriptions[dominantDosha]}
            </Text>
          </View>

          {/* Recommendations */}
          <View style={[styles.recommendationsCard, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, shadowColor: '#000' }]}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Personalized Recommendations</Text>

            {[
              {
                icon: 'restaurant-outline',
                title: 'Diet',
                description: 'Favor warm, cooked foods and avoid cold, raw items'
              },
              {
                icon: 'fitness-outline',
                title: 'Exercise',
                description: 'Gentle yoga and walking are ideal for your constitution'
              },
              {
                icon: 'bed-outline',
                title: 'Lifestyle',
                description: 'Maintain regular routine and get adequate rest'
              },
            ].map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={[styles.recIcon, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}>
                  <Ionicons name={rec.icon as any} size={24} color={isDark ? AyurvedaColors.accent : "#5A8F69"} />
                </View>
                <View style={styles.recContent}>
                  <Text style={[styles.recTitle, isDark && { color: AyurvedaColors.textDark }]}>{rec.title}</Text>
                  <Text style={[styles.recDescription, isDark && { color: AyurvedaColors.textDarkMuted }]}>{rec.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Retake Assessment Button */}
          <TouchableOpacity
            style={[styles.retakeButton, isDark && { backgroundColor: AyurvedaColors.backgroundDark, borderColor: AyurvedaColors.primaryLight }]}
            onPress={() => router.push('/patient/assessment' as any)}
          >
            <Ionicons name="refresh-outline" size={20} color={isDark ? AyurvedaColors.primaryLight : "#5A8F69"} />
            <Text style={[styles.retakeButtonText, isDark && { color: AyurvedaColors.primaryLight }]}>Retake Assessment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F6F65',
    marginBottom: 24,
  },
  dateCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dateText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500',
  },
  resultsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  doshaRow: {
    marginBottom: 20,
  },
  doshaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  doshaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  doshaPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A8F69',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  dominantCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  dominantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dominantTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  dominantDosha: {
    fontSize: 24,
    fontWeight: '700',
    color: '#9C27B0',
    marginBottom: 8,
  },
  dominantDescription: {
    fontSize: 14,
    color: '#5F6F65',
    lineHeight: 20,
  },
  recommendationsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  recIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  recDescription: {
    fontSize: 14,
    color: '#5F6F65',
    lineHeight: 20,
  },
  retakeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5A8F69',
  },
  retakeButtonText: {
    color: '#5A8F69',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});