import { AyurvedaColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Assessment() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

          <Text style={[styles.title, isDark && { color: AyurvedaColors.textDark }]}>Start Assessment</Text>
          <Text style={[styles.subtitle, isDark && { color: AyurvedaColors.textDarkMuted }]}>
            Understand your dosha balance through our comprehensive assessment
          </Text>

          {/* Assessment Info Card */}
          <View style={[styles.infoCard, isDark && { backgroundColor: AyurvedaColors.primaryDark }]}>
            <Ionicons name="information-circle-outline" size={24} color={isDark ? AyurvedaColors.accent : "#5A8F69"} />
            <Text style={[styles.infoText, isDark && { color: AyurvedaColors.textDark }]}>
              This assessment will take approximately 10-15 minutes to complete.
              Answer honestly for the most accurate results.
            </Text>
          </View>

          {/* Assessment Categories */}
          <View style={styles.categoriesContainer}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Assessment Categories</Text>

            {[
              { title: 'Physical Characteristics', questions: 12 },
              { title: 'Mental & Emotional Traits', questions: 10 },
              { title: 'Lifestyle & Habits', questions: 8 },
              { title: 'Digestive System', questions: 6 },
            ].map((category, index) => (
              <View key={index} style={[styles.categoryCard, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, shadowColor: '#000' }]}>
                <View style={[styles.categoryIcon, isDark && { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                  <Ionicons name="checkmark-circle-outline" size={28} color={isDark ? AyurvedaColors.accentMuted : "#5A8F69"} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryTitle, isDark && { color: AyurvedaColors.textDark }]}>{category.title}</Text>
                  <Text style={[styles.categoryQuestions, isDark && { color: AyurvedaColors.textDarkMuted }]}>
                    {category.questions} questions
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Start Button */}
          <TouchableOpacity
            style={[styles.startButton, isDark && { backgroundColor: AyurvedaColors.primary }]}
            onPress={() => {
              router.push('/(tabs)/patient/assessment-questions' as any);
            }}
          >
            <Text style={styles.startButtonText}>Begin Assessment</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
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
  infoCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  categoryQuestions: {
    fontSize: 14,
    color: '#5F6F65',
  },
  startButton: {
    backgroundColor: '#5A8F69',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});